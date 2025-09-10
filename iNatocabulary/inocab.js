async function setImage2() {
    try {
        //get value of the useRecent dropdown
        let dropdownState = document.getElementById("useRecentSelector").value;
        let useRecent = (dropdownState == "true");
        
        let word = document.getElementById("inputWord").value;
        if(word==""){ //if word is not set, get a random word from the word api
            word = await getRandomWord();
        }
        //checks if word contains bad stuff
        if(word.includes(",") || word.includes("?") || word.includes("&") || word.includes("=")){
           document.getElementById("error_message").innerText = "Invalid characters in your word!"; 
        }
        else{
            document.getElementById("error_message").innerText = "";
            let url = `https://api.inaturalist.org/v1/observations/?photos=true&q=${word}`;

            let response = await fetch(url);
            let data = await response.json();

            let totalResults = Number(data.total_results);
            let perPage = Number(data.per_page);

            let obsNum = -1;
            
            //if there's no results for the word, do this
            if(totalResults<=0){
               document.getElementById("error_message").innerText = "No results for your word!";  
            }
            else{
                //if useRecent is true, use only the first page of results
                if(useRecent==true){
                    obsNum = getRandomArbitrary(0,lesserOf(29,totalResults-1));
                    console.log("total results "+totalResults);
                    console.log("selected obs " + obsNum);
                }
                //if useRecent is not true, get any from any page
                else{
                    let totalPages = Math.round(totalResults/perPage);
                    if (totalPages <= 1){
                        obsNum = getRandomArbitrary(0,lesserOf(29,totalResults-1));
                    }
                    let pageToUse = getRandomArbitrary(1,totalPages);
                    //does a new api call to get other pages
                    url =  `https://api.inaturalist.org/v1/observations/?photos=true&q=${word}&page=${pageToUse}`;
                    response = await fetch(url);
                    data = await response.json();
                    obsNum = getRandomArbitrary(0,29);
                }
                

                // the photo url, description, other info...
                let imgUrl = replaceSquareWithMedium(data.results[obsNum].photos[0].url);
                let obsDescription = data.results[obsNum].description;
                let attributionInfo = data.results[obsNum].photos[0].attribution;
                let taxaName = data.results[obsNum].taxon.name;
                let commonName = data.results[obsNum].taxon.preferred_common_name;
                let placeName = data.results[obsNum].place_guess;
                let obsLink = data.results[obsNum].uri;
                
                //make the link
                var temp_link = document.createElement("a");
                temp_link.href = obsLink;
                temp_link.target = '_blank';
                temp_link.innerHTML = "🔗";

                // Set the things on the page
                document.getElementById("theWord").innerText = titleCase(word);
                document.getElementById("the_photo").src = imgUrl;
                document.getElementById("obsDescription").innerText = obsDescription;
                document.getElementById("attributionInfo").innerText = " "+attributionInfo;
                document.getElementById("attributionInfo").prepend(temp_link);
                document.getElementById("taxaName").innerText = formatTaxonNames(taxaName,commonName);
                document.getElementById("placeName").innerText = placeName;    
            } 
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("error_message").innerText = "Something went wrong!";
    }
}

//returns a random word
async function getRandomWord(){
    //tries to get it from the api
    //let word_api_url = `https://random-word-api.herokuapp.com/word`; //this is the first api I tried... seems to have a lot of downtime
    let word_api_url = `https://random-word-api.vercel.app/api?words=1`;
    try{
        while(true){
            word = "Evil";
            let word_response = await fetch(word_api_url);
            let word_data = await word_response.json();
            word = word_data[0];
            //now check that there are actual results for the word
            let testurl = `https://api.inaturalist.org/v1/observations/?photos=true&q=${word}`;
            let testresponse = await fetch(testurl);
            let testdata = await testresponse.json();
            let testtotalResults = Number(testdata.total_results);
            if(testtotalResults>0){
                return word;
            }
        }
    }
    catch(error){
        console.log(error);
        //if it fails (like if the random word api is down) get a random word from this small selection
        failRandomWords = ["Evil","Iridescent","Castle","Luminous","Abyss","Brilliant","Creepy","Serendipity","Levitate","Childhood"];
        console.log(error);
        return failRandomWords[getRandomArbitrary(0,9)];
    }
}


//gets a random number in the range
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//replaces square with medium in a string
function replaceSquareWithMedium(inWord){
    return inWord.replace("square","large");
}

//gives the lower value
function lesserOf(x,y){
    if (x<=y){
        return x;
    }
    else return y;
}

//puts the word into title case
function titleCase(wordIn){
    wordTitle = wordIn[0].toUpperCase() + wordIn.substring(1).toLowerCase();
    return wordTitle;
}

function formatTaxonNames(scientific, common){
    if(common === undefined){
        return scientific;
    }
    else return scientific + " • " + common;
}