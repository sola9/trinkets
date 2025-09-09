async function getRarestSpecies(username,howManyResultsToDisplay) {
    document.getElementById("oak").innerHTML = "loading...";
    //clear the table
    var table = document.getElementById("results_table");
    var rowCount = table.rows.length;
    for (var x=rowCount-1; x>0; x--) {
        table.deleteRow(x);
    }
    
    console.log(username);
    if(isUsernameValid(username)){
        var iconicTaxaString = getIconicTaxaString();
        var allResults = await getAllSpecies(username, iconicTaxaString);
        var resultsSorted = allResults.sort((a, b) => a[0] - b[0])
        console.log(resultsSorted);

        for (let i = 0; i < howManyResultsToDisplay; i++) {
            var row = table.insertRow(i+1);
            var taxaIcon = row.insertCell(0);
            var sciName = row.insertCell(1);
            var comName = row.insertCell(2);
            var numObs = row.insertCell(3);
            //apply styles
            numObs.className = "paddedEntry";
            comName.className = "paddedEntry";

            //break from the loop if out of results
            try{
              taxaIcon.innerHTML = getEmoji(resultsSorted[i][4],resultsSorted[i][5]);  
            }
            catch{
                break;
            }

            var sciNameHTML = '<a href="https://www.inaturalist.org/taxa/'.concat(resultsSorted[i][1]).concat('">').concat(resultsSorted[i][2]).concat('</a>');
            sciName.innerHTML = sciNameHTML;
            if (resultsSorted[i][3] === undefined){
                comName.innerHTML = "";
            }
            else {
               comName.innerHTML = resultsSorted[i][3]; 
            }
            numObs.innerHTML = resultsSorted[i][0];
        }
        document.getElementById("oak").innerHTML = "";
        //this replaces all with discord emoji
        twemoji.parse(document.body, {
            className: 'twemoji',
            folder: 'svg',
            ext: '.svg',
            onlyEmojiClass: 'emoji-fallback'
        });
    }
    else{ //if username isn't valid, doesn't do the api calls and just says this:
        document.getElementById("oak").innerHTML = "Invalid username!";
    } 
}

async function getAllOnPage(username, pageNumber, iconicTaxa) {
    const taxa = [];
    const url = `https://api.inaturalist.org/v1/observations/species_counts?user_id=${username}&iconic_taxa=${iconicTaxa}&page=${pageNumber}`;

      
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const per_page = data['per_page'];
        const total_results = data['total_results'];
        const results = data['results'];
        const remaining = total_results - ((pageNumber - 1) * per_page);
        const limit = Math.min(per_page, remaining);
        
        for (let i = 0; i < limit; i++) {
            const taxon = [
                results[i]['taxon']['observations_count'],
                results[i]['taxon']['id'],
                results[i]['taxon']['name'],
                results[i]['taxon']['preferred_common_name'],
                "/".concat(results[i]['taxon']['ancestry']).concat("/"),
                results[i]['taxon']['iconic_taxon_name']
            ];
            taxa.push(taxon);
        }

        return taxa;
    } catch (error) {
        console.error('Error in getAllOnPage:', error);
        return []; // return empty array to keep things running
    }
}

//this gets the list of all the species information
async function getAllSpecies(username, iconicTaxa) {
    const speciesList = [];
    const total_pages = await howManyPages(username, iconicTaxa);
    console.log(total_pages);
    for (let i = 1; i <= total_pages; i++) {
        let pageValues = await getAllOnPage(username,i, iconicTaxa);
        addAllEntriesFromOneArrayToAnotherArray(pageValues,speciesList);
    }
    return speciesList;
}



//this gets how many pages there are
function howManyPages(username, iconicTaxa) {
    const url = `https://api.inaturalist.org/v1/observations/species_counts?user_id=${username}&iconic_taxa=${iconicTaxa}`;
    return fetch(url)
        .then(response => response.json()) // convert response to JSON
        .then(data => {
        // now 'data' is a JavaScript object
        const total_results = data['total_results'];
        const per_page = data['per_page'];
        return Math.ceil(total_results/per_page);
        
    })
        .catch(error => {
            console.error('Error fetching data:', error);
            return -1; //returns -1 if there is an error
        });
}

//this adds all entries in array a to array b. Used in compiling one big array of the taxa
async function addAllEntriesFromOneArrayToAnotherArray(a,b){
    for (let i = 0; i < a.length; i++) {
        b.push(a[i]);
    }
}

//this gets the iconic taxa string
function getIconicTaxaString(){
   //get the iconic taxa checkboxes
    var birds = document.getElementById("birdBox").checked;
    var amphibians = document.getElementById("amphiBox").checked;
    var reptiles = document.getElementById("reptBox").checked;
    var mammals = document.getElementById("mammBox").checked;
    var fish = document.getElementById("fishBox").checked;
    var mollusks = document.getElementById("mollBox").checked;
    var arachnids = document.getElementById("aracBox").checked;
    var plants = document.getElementById("plantBox").checked;
    var fungi = document.getElementById("fungiBox").checked;
    var protozoans = document.getElementById("protoBox").checked;
    var insects = document.getElementById("insectBox").checked;
    var unknowns = document.getElementById("unkBox").checked;
    //if all are checked, return all
    if(birds && amphibians && reptiles && mammals && fish && mollusks && arachnids && plants && fungi && protozoans && insects && unknowns){
        return "Aves,Amphibia,Reptilia,Mammalia,Actinopterygii,Mollusca,Fungi,unknown,Protozoa,Plantae,Insecta,Arachnida";
    }
    //if none are checked, return all
    else if(!birds && !amphibians && !reptiles && !mammals && !fish && !mollusks && !arachnids && !plants && !fungi && !protozoans && !insects && !unknowns){
        return "Aves,Amphibia,Reptilia,Mammalia,Actinopterygii,Mollusca,Fungi,unknown,Protozoa,Plantae,Insecta,Arachnida";
    }
    //otherwise, return the string that will be used in the iconic taxa of the api call
    else{
        checkboxStates = Array(birds,amphibians,reptiles,mammals,fish,mollusks,arachnids,plants,fungi,protozoans,insects,unknowns);
        checkboxNames = Array("Aves","Amphibia","Reptilia","Mammalia","Actinopterygii","Mollusca","Arachnida","Plantae","Fungi","Protozoa","Insecta","unknown");
        selectedTaxa = Array();
        //iterate through checkbox states, add the selected taxa to new array
        for (let i = 0; i < 12; i++) {
            if(checkboxStates[i]==true){
                selectedTaxa.push(checkboxNames[i]);
            }
        }
        return selectedTaxa.toString();
    }
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

function getEmoji(ancestry,iconic_taxa){
    //Families
    if (ancestry.includes("/47903/")){//Cactus
        return "🌵";
    }
    else if (ancestry.includes("/47328/")){//Liliaceae
        return "🌷";
    }
    else if (ancestry.includes("/47148/")){//Rosaceae
        return "🌹";
    }
    else if (ancestry.includes("/47604/")){//Asteraceae
        return "🌻";
    }
    else if (ancestry.includes("/48699/")){//Apiaceae
        return "🥕";
    }
    else if (ancestry.includes("/47204/")){//Brassicaceae
        return "🥦";
    }
    else if (ancestry.includes("/47122/")){//Legumes
        return "🫛";
    }
    else if (ancestry.includes("/47336/")){//Ants
        return "🐜";
    }
    //Superfamilies
    else if (ancestry.includes("/372843/")){//Pinnipeds
        return "🦭";
    }
    //Parvorders
    else if (ancestry.includes("/424321/")){//Baleen whales
        return "🐋";
    }
    else if (ancestry.includes("/424322/")){//Toothed whales
        return "🐬";
    }
    //Suborders
    else if (ancestry.includes("/85553/")){//snakes
        return "🐍";
    }
    //Orders
    else if (ancestry.includes("/47208/")){//beetles
        return "🪲";
    }
    else if (ancestry.includes("/47157/")){//lepidoptera
        return "🦋";
    }
    else if (ancestry.includes("/47201/")){//hymenoptera
        return "🐝";
    }
    else if (ancestry.includes("/47822/")){//diptera
        return "🪰";
    }
    else if (ancestry.includes("/81769/")){//blattodea
        return "🪳";
    }
     else if (ancestry.includes("/47651/")){//orthoptera
        return "🦗";
    }
    else if (ancestry.includes("/48894/")){//scorpions
        return "🦂";
    }
    else if (ancestry.includes("/39532/")){//turtles
        return "🐢";
    }
    else if (ancestry.includes("/26039/")){//crocodilians
        return "🐊";
    }
    else if (ancestry.includes("/48866/")){//Arecales
        return "🌴";
    }
    else if (ancestry.includes("/47162/")){//Poales🌾
        return "🌾";
    }
    else if (ancestry.includes("/47218/")){//Asparagales
        return "🪻";
    }
    else if (ancestry.includes("/51120/")){//Nymphaeles
        return "🪷";
    }
    else if (ancestry.includes("/48796/")){//Malvales
        return "🌺";
    }
    else if (ancestry.includes("/43367/")){//Primates
        return "🐒";
    }
    else if (ancestry.includes("/67564/")){//Penguins
        return "🐧";
    }
    else if (ancestry.includes("/6888/")){//Anseriformes
        return "🦆";
    }
    else if (ancestry.includes("/71261/")){//Accipitriformes
        return "🦅";
    }
    else if (ancestry.includes("/19350/")){//Owls
        return "🦉";
    }
    else if (ancestry.includes("/40268/")){//Bats
        return "🦇";
    }
    else if (ancestry.includes("/41573/")){//Carnivorans
        return "🐅";
    }
    else if (ancestry.includes("/43094/")){//Lagomorphs
        return "🐇";
    }
    else if (ancestry.includes("/43698/")){//Rodents
        return "🐀";
    }
    else if (ancestry.includes("/152870/")){//Even-toed ungulates
        return "🦬";
    }
    else if (ancestry.includes("/43327/")){//Odd-toed ungulates
        return "🐎";
    }
    else if (ancestry.includes("/533971/")){//Eulipotyphla
        return "🦔";
    }
    else if (ancestry.includes("/573/")){//Galliformes
        return "🐓";
    }
    //Infraclasses
    else if (ancestry.includes("/848319/")){//Marsupials
        return "🦘";
    }
    //Classes
    else if (ancestry.includes("/47459/")){//cephalopods
        return "🦑";
    }
    else if (ancestry.includes("/47273/")){//elasmobranchs
        return "🦈";
    }
    else if (ancestry.includes("/136329/")){//pinopsida
        return "🌲";
    }
    else if (ancestry.includes("/47533/")){//anthozoa
        return "🪸";
    }
    else if (ancestry.includes("/47124/")){//dicots
        return "🍃";
    }
    else if (ancestry.includes("/47163/")){//monocots
        return "🎍";
    }
    else if (ancestry.includes("/47114/")){//gastropods
        return "🐌";
    }
    else if (ancestry.includes("/121943/")){//ferns
        return "🪴";
    }
    //Subphyla
    else if (ancestry.includes("/85493/")){//crustaceans
        return "🦀";
    }
    //Phyla
    else if (ancestry.includes("/47534/")){//cnidarians
        return "🪼";
    }
    else if (ancestry.includes("/47491/")){//annelida
        return "🪱";
    }
    else if (ancestry.includes("/48824/")){//sponges
        return "🧽";
    }
    else if (ancestry.includes("/47549/")){//echinoderms
        return "⭐";
    }
    //Kingdoms
    else if (ancestry.includes("/67333/")){//bacteria
        return "🦠";
    }
    else if (ancestry.includes("/131236/")){//viruses
        return "🤢";
    }
    //iconic taxa
    else if (iconic_taxa == "Plantae"){
        return "🌱";
    }
    else if (iconic_taxa == "Aves"){
        return "🐦";
    }
    else if (iconic_taxa == "Amphibia"){
        return "🐸";
    }
    else if (iconic_taxa == "Reptilia"){
        return "🦎";
    }
    else if (iconic_taxa == "Mammalia"){
        return "🐂";
    }
    else if (iconic_taxa == "Actinopterygii"){
        return "🐟";
    }
    else if (iconic_taxa == "Mollusca"){
        return "🐚";
    }
    else if (iconic_taxa == "Arachnida"){
        return "🕷️";
    }
    else if (iconic_taxa == "Insecta"){
        return "🐛";
    }
    else if (iconic_taxa == "Fungi"){
        return "🍄";
    }
    else return "❓";
}