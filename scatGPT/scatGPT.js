let my_poop = []; //global variable for storing poop
let has_prompted = false; //global variable for if this is the first prompt

//displays the user's prompt as a text bubble then asks for a response
function receive_prompt(prompt) {
    //ignores prompts that are all whitespace
    if (prompt.trim().length === 0){
        return;
    }
    const newParagraph = document.createElement("p");
    newParagraph.textContent = prompt;
    //If it's the first time prompting, deletes the center prompt input and shows the one at the bottom
    if (!has_prompted) {
        document.getElementById("prompt_input").value = ""; 
        document.getElementById("first_prompt").remove();
        document.getElementById("disclaimer").remove();
        has_prompted = true;
        document.getElementById('second_prompt').style.display = 'block';
    }
    else{
      document.getElementById("prompt_input2").value = "";  
    }
    newParagraph.classList.add("user_message");
    const container = document.getElementById("oak");
    container.appendChild(newParagraph);
    respond(prompt);
}

//poops on the screen
function respond(prompt){
    console.log(my_poop);
    const rand_poop = give_random_poop();
    const poop_pic = document.createElement("img");
    const container = document.getElementById("oak");
    //gives you a burning you're welcome if you thank it
    if (prompt.includes("thank")){
        if(getRandomInt(0,1)==0){
            poop_pic.src = "your_welcome.gif";  
        }
        else{
            poop_pic.src = "yroue_welcome.gif";
        }
        container.appendChild(poop_pic);
        return;
    }
    //tells you it's out of poop if there are no poop images (like if iNat is down)
    if (my_poop.length == 0){
        poop_pic.src = "sorry.png";
        container.appendChild(poop_pic);
        return;
    }
    poop_pic.src = replaceSquareWithMedium(rand_poop[1]);
    poop_pic.addEventListener('click', () => {
        window.open(`https://inaturalist.org/observations/${rand_poop[0]}`);
    });
    const attribution = document.createElement("p");
    attribution.textContent = rand_poop[2];
    attribution.classList.add("image_credits");  
    container.appendChild(poop_pic);
    container.appendChild(attribution);
    
}

async function get_poop(){
    //API request that asks for appropriately licensed poop images from the poop project
    let url = "https://api.inaturalist.org/v2/observations?photos=true&photo_licensed=true&project_id=scatology&per_page=40&order=desc&order_by=random&fields=id%2Cphotos.url%2Cphotos.attribution";
    
    let response = await fetch(url);
    let data = await response.json();
    //this isn't necessary but I copy pasted it from another project and it's a tiny bit useful
    let totalResults = Number(data.total_results);
    
    //This is the list of poop images and related info
    //Format of each entry: [observation ID,photo URL,attribution]
    let poop_list = []
    
    //iterate through every observation
    for (let i = 0; i < Math.min(totalResults,Number(data.per_page)); i++) {
        let obs_id = data.results[i].id; //Save the observation ID since multiple photos can be from same observation
        //now iterate through all the photos and add them to the poop list
        for (let j = 0; j<data.results[i].photos.length; j++){
            poop_list.push([obs_id,data.results[i].photos[j].url,data.results[i].photos[j].attribution])
        }
    }
    my_poop = poop_list
}

//helper function that I got from the google search AI
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//gives a random poop
function give_random_poop(){
    let the_lucky_poop = getRandomInt(0,my_poop.length);
    return my_poop[the_lucky_poop];
}

//replaces square with medium in a string
function replaceSquareWithMedium(inWord){
    return inWord.replace("square","medium");
}