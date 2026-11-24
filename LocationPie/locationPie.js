let placesList = [];
let usernameGlobal = "";
let taxonNameGlobal = "";
let taxonIDGlobal = 0;

async function addPlace(name){
    //disable the button and text input
    togglePlaceInput(true);
    //check for invalid input (blank)
    if (name.trim().length === 0) {
        errorMessage("Place name cannot be blank");
        togglePlaceInput(false);
        return;
    }
    //then check for matching place on iNat
    iNatPlace = await searchPlace(name);
    if (iNatPlace != null){
        //don't allow duplicate places
        if (isItADuplicatePlace(iNatPlace[1])){
            errorMessage(`Place ${iNatPlace[0]} already added`);
            togglePlaceInput(false);
            return;
        }
        //I would like to prevent adding places that are within added places, but it seems there's no way to get that through the API
        addRow(iNatPlace[0],iNatPlace[1]);
        placesList.push(iNatPlace)
        document.getElementById('place').value = "";
        errorMessage("");
    }
    else {
        errorMessage(`No place ${name} found.`)
    }
    togglePlaceInput(false);
}

function addRow(name,id) {
    const div = document.createElement('div');

    div.className = 'row';
    div.id = id;

    div.innerHTML = `
        <a href="https://inaturalist.org/places/${id}">${name}</a>
        <button type="button" onclick="removeRow(this)" />Remove</button>
    `;

    document.getElementById('places_added').appendChild(div);
}

function removeRow(input) {
    //first remove the entry from the placesList
    id = input.parentNode.id
    removePlace(Number(id));
    //then remove the html elements
    document.getElementById('places_added').removeChild(input.parentNode);
}

function errorMessage(message) {
    clearMessages();
    document.getElementById('error_message').innerHTML = message;
}

function successMessage(message) {
    clearMessages();
    document.getElementById('success_message').innerHTML = message;
}

function clearMessages(){
    document.getElementById('error_message').innerHTML = "";
    document.getElementById('success_message').innerHTML = "";
}

async function searchPlace(name){
    //need to check if it's an id or a name
    if (isAllDigits(name)){
        let url = `https://api.inaturalist.org/v2/places/${name}?fields=name`
        let response = await fetch(url);
        let data = await response.json();
        if (Number(data.total_results) > 0){
            return [data.results[0].name,data.results[0].id];
        }
    }
    //if it's a name then use this this part of the api instead
    else{
        let url = `https://api.inaturalist.org/v2/places?q=${name}&fields=id%2Cname`;
        let response = await fetch(url);
        let data = await response.json();
        if (Number(data.total_results) > 0){
            return [data.results[0].name,data.results[0].id];
        }
    }
    //if nothing is found for both searches, returns null
    return null;
}

//This should test if a string is all numbers
//I got it from the google search AI
const isAllDigits = (str) => /^\d+$/.test(str);

//removes a place from the place list
function removePlace(id){
    for (let i = 0; i < placesList.length; i++) {
        if (Number(placesList[i][1]) == Number(id)){
            placesList.splice(i, 1);
            return;
        }
    }
}

//checks if place is already in placesList
function isItADuplicatePlace(id){
    for (let i = 0; i < placesList.length; i++) {
        if (Number(placesList[i][1]) == Number(id)){
            return true;
        }
    }
    return false;
}

//sets place input and button disabled = state
function togglePlaceInput(state){
    document.getElementById('addPlaceButton').disabled = state;
    document.getElementById('place').disabled = state;
}

//sets username,taxon inputs and verify button disabled = state
function toggleUsernameTaxonInput(state){
    document.getElementById('username').disabled = state;
    document.getElementById('taxon').disabled = state;
    document.getElementById('verifyButton').disabled = state;
}

//verifies that the username and taxon are valid
async function verify(username,taxon){
    toggleUsernameTaxonInput(true);
    if (await verifyUsername(username) == false){
        toggleUsernameTaxonInput(false);
        errorMessage("username/id could not be found");
        return false;
    }
    if (await verifyTaxon(taxon) == false){
        toggleUsernameTaxonInput(false);
        errorMessage("taxon name/id could not be found");
        return false;
    }
    toggleUsernameTaxonInput(false);
    successMessage(`Success! Username ${usernameGlobal} and taxon ${taxonNameGlobal} (${taxonIDGlobal}) were found.`);
    return true;
}

//helper function, verifies the username.
//Also fills in the username global variable if it's valid
async function verifyUsername(username){
   //Check if it's blank
    if (username.trim().length === 0) {
        return false;
    }
    //Check if it's an id
    if (isAllDigits(username)){
        let url = `https://api.inaturalist.org/v2/users/${username}fields=login`;
        let response = await fetch(url);
        let data = await response.json();
        if (Number(data.total_results) > 0){
            usernameGlobal = data.results[0].login
            return true;
        }
    }
    //check if it's a username
    let url = `https://api.inaturalist.org/v2/users/autocomplete?q=${username}&fields=login`;
        let response = await fetch(url);
        let data = await response.json();
        if (Number(data.total_results) > 0){
            usernameGlobal = data.results[0].login;
            return true;
        }
    //return false if the username was not found
    return false;
}

async function verifyTaxon(taxon){
    //Check if it's blank
    if (taxon.trim().length === 0) {
        return false;
    }
    //check if it's an id
    if (isAllDigits(taxon)){
        let url = `https://api.inaturalist.org/v2/taxa/${taxon}?fields=name`;
        let response = await fetch(url);
        let data = await response.json();
        if (Number(data.total_results) > 0){
            taxonNameGlobal = data.results[0].name;
            taxonIDGlobal = data.results[0].name;
            return true;
        }
    }
    //check if it's a name
        let url = `https://api.inaturalist.org/v2/taxa/autocomplete?q=${taxon}&fields=name`;
        let response = await fetch(url);
        let data = await response.json();
        if (Number(data.total_results) > 0){
            taxonNameGlobal = data.results[0].name;
            taxonIDGlobal = data.results[0].id;
            return true;
        }
    //return false if the username was not found
    return false;
}

//this function handles verifying input, getting data, and making the chart
async function buildPieChart(){
    toggleAllButtons(true);
    if (await verify(document.getElementById('username').value,document.getElementById('taxon').value) == false){
        toggleAllButtons(false);
        return;
    }
    chartData = await getChartData();
    chartLabels = getChartLabels();
    
    document.getElementById('chartTitle').textContent = `${usernameGlobal}'s observations of ${taxonNameGlobal}`;
    makePieChart(chartData,chartLabels);
    toggleAllButtons(false);
}

//this function just draws the chart
function makePieChart(chartData,chartLabels){
    const ctx = document.getElementById('pieChart');
    //have to destroy any existing chart. got this destruction code from the google search AI
    const existingChart = Chart.getChart("pieChart"); // Pass canvas ID, HTMLCanvasElement, or 2D context

    if (existingChart) {
        existingChart.destroy();
    }

    
    const DEFAULT_COLORS = [
        'rgb(54, 162, 235)',  // Blue
        'rgb(255, 99, 132)',  // Red
        'rgb(255, 159, 64)',  // Orange
        'rgb(255, 205, 86)',  // Yellow
        'rgb(75, 192, 192)',  // Green
        'rgb(153, 102, 255)', // Purple
        'rgb(201, 203, 207)'  // Grey
    ];
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Observations: ',
        data: chartData,
        borderWidth: 1,
        backgroundColor: (ctx) => {
            const lastIndex = ctx.dataset.data.length - 1; //I got the code to make other always gray from the google search AI
            if (ctx.dataIndex === lastIndex) {
              return "#CCCCCC";
            }
            return DEFAULT_COLORS[ctx.dataIndex % DEFAULT_COLORS.length];
          }
      }]
    },
  });
}

//gets the numbers to use in the chart
async function getChartData(){
    location_counts = [];
    //add one entry for every place in the list
    for (let i = 0; i < placesList.length; i++) {
        let url = `https://api.inaturalist.org/v2/observations?place_id=${placesList[i][1]}&taxon_id=${taxonIDGlobal}&user_id=${usernameGlobal}`;
        let response = await fetch(url);
        let data = await response.json();
        location_counts.push(Number(data.total_results));
    }
    //then an extra entry for the extra ones (total-sum of the ones in the list)
    let url = `https://api.inaturalist.org/v2/observations?taxon_id=${taxonIDGlobal}&user_id=${usernameGlobal}`;
    let response = await fetch(url);
    let data = await response.json();
    location_counts.push(Number(data.total_results) - sumOfNumbersInArray(location_counts));
    return location_counts;
}

//helper that sums up all the values in arr (assumes they're all numbers)
function sumOfNumbersInArray(arr){
    sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

//gets the chart labesl (just the place names)
function getChartLabels(){
    labels = [];
    for (let i = 0; i < placesList.length; i++) {
        labels.push(placesList[i][0]);
    }
    labels.push("Other");
    return labels;
}

//enables/disables all buttons on the page
function toggleAllButtons(state){
    //I got this code from the google search AI
    document.querySelectorAll('button').forEach(button => {
        button.disabled = state;
    });
}