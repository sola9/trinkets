async function updateStatsPage(username){
    if (isUsernameValid(username)){
        document.getElementById("inputFeedback").innerHTML = "";
        try{
            userPageInfo = await getInfoFromUserPage(username); userPageInfo = await getInfoFromUserPage(username);
            document.getElementById("usernames").innerHTML = userPageInfo[0] + " • " + userPageInfo[1]; 
            daysExisted = getDaysBetweenJoinAndNow(userPageInfo[4].substring(0,10));
            document.getElementById("idstats").innerHTML = `${userPageInfo[2]} IDs • ${(userPageInfo[2]/userPageInfo[3]).toFixed(2)} ID/Obs Ratio • Avg. ${(userPageInfo[2]/daysExisted).toFixed(0)} IDs per day since ${userPageInfo[4].substring(0,10)}`;
            jsonObj = await getJSON(userPageInfo[0]);
            document.getElementById("userDesc").innerHTML = getUserDescription(jsonObj);
            const speciesList = await getSpeciesData(username);
            updateSpeciesTable(document.getElementById("taxa_table"),speciesList);
            getIDHeatmap(username);  
        }
       catch (error){
           console.log(error);
           document.getElementById("inputFeedback").innerHTML = "error";
       }    
    }
    else{
        document.getElementById("inputFeedback").innerHTML = "invalid username";
    }
}

//Gets all relevant info from the users part of the API and returns it in an array
//array order: username, name, ID count, obs count, account creation timestamp
async function getInfoFromUserPage(username){
    const url = `https://api.inaturalist.org/v1/users/${username}`;
    var userInfo = [];
    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        userInfo.push(results[0].login);
        userInfo.push(results[0].name);
        userInfo.push(results[0].identifications_count);
        userInfo.push(results[0].observations_count);
        userInfo.push(results[0].created_at);
        console.log(userInfo);
        return userInfo;
    }
    catch (error){
        console.log(error);
        return userInfo;
    }
}

function getDaysBetweenJoinAndNow(joinDate){
    //gets today's date in YYYY-MM-DD format (code from by Google AI preview)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedToday = `${yyyy}-${mm}-${dd}`;  
    
    //gets the days between join date and today's date. code also from Google AI preview)
    const date1 = new Date(joinDate);
    const date2 = new Date(formattedToday);

    // Difference in milliseconds
    const diffInMs = Math.abs(date2 - date1);

    // Convert to days
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays;
}

//gets the JSON of a user's profile page. From Google AI preview.
async function getJSON(username) {
  try {
    const response = await fetch(`https://www.inaturalist.org/people/${username}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parses JSON response into native JS object
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
    return "something went wrong";
}

//returns only user description from the profile json.
function getUserDescription(jsonData){
    const profileJson = jsonData;
    try{
        userDesc = profileJson.description;
        return userDesc;
    }
    catch (error){
        console.log(error);
        return("error fetching user description");
    }
}

//gets the top IDed species of a user (and relevant information for display)
async function getSpeciesData(username){
    const url = `https://api.inaturalist.org/v1/observations/species_counts?ident_user_id=${username}&not_user_id=${username}&verifiable=any&view=species`;
    var taxaList = []; //the list of multiple taxa
    var indTaxon = []; //an individual taxon - order: picture, scientific name, common name, #of ids
    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
       // console.log(results["0"]["count"]);
        for (let i = 0; i < 15; i++) {
            indTaxon = [];
            indTaxon.push(results[i].taxon.default_photo.square_url);
            indTaxon.push(results[i].taxon.name);
            indTaxon.push(results[i].taxon.preferred_common_name);
            indTaxon.push(results[i].count);
            taxaList.push(indTaxon);
        }
        //console.log(taxaList);
    }
    catch (error){
        console.log(error);
    }
    return taxaList;
}

//updates the species table
function updateSpeciesTable(table,speciesList){
    //first clear the table
    var rowCount = table.rows.length;
    for (var x=rowCount-1; x>0; x--) {
        table.deleteRow(x);
    }
    //now add the entries
    for (let i = 0; i < speciesList.length; i++) {
        var row = table.insertRow(i+1);
        var pic = row.insertCell(0);
        var sciName = row.insertCell(1);
        var comName = row.insertCell(2);            
        var numIds = row.insertCell(3);
        
        pic.innerHTML = `<img src=${speciesList[i][0]} width=50px height=50px>`;
        sciName.innerHTML = speciesList[i][1];
        comName.innerHTML = speciesList[i][2];
        numIds.innerHTML = speciesList[i][3];
        console.log("inserted row");
    }
    
}

async function getIDHeatmap(username){
    const url = `https://api.inaturalist.org/v1/heatmap/0/0/0.png?ident_user_id=${username}&not_user_id=${username}&verifiable=any`;
    //this part was from the google AI overview
    const response = await fetch(url);
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
  
    document.getElementById('heatmap').src = imageObjectURL;
}

//checks that the provided username is valid. Returns a boolean
function isUsernameValid(username){
    if(username == null || username==""){
        return false;
    }
    else if(username.includes(" ") || username.includes(",") || username.includes("?") || username.includes("&") || username.includes("=")){
        return false;
    }
    else return true;
}