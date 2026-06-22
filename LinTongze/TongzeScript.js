function testChange(optionID, optionVal){
    if(optionID=="coatOption"){
        changeCoat(optionVal);
    }
    else if(optionID=="hairFrontOption"){
        changeFrontHair(optionVal);
    }
    else if(optionID=="hairBackOption"){
        changeBackHair(optionVal);
    }
    else if(optionID=="hairSideOption"){
        changeSideHair(optionVal);
    }
    else if(optionID=="hairBraidOption"){
        changeBraidHair(optionVal);
    }
    else if(optionID=="eyebrowOption"){
        changeEyebrow(optionVal);
    }
    else if(optionID=="eyesOption"){
        changeEyes(optionVal);
    }
    else if(optionID=="framesOption"){
        changeFrames(optionVal);
    }
    else if(optionID=="lensOption"){
        changeLens(optionVal);
    }
    else if(optionID=="mouthOption"){
        changeMouth(optionVal);
    }
    else if(optionID=="shirtOption"){
        changeShirt(optionVal);
    }
    else if(optionID=="sweatOption"){
        changeSweater(optionVal);
    }
    else if(optionID=="dressOption"){
        changeDress(optionVal);
    }
    else if(optionID=="skirtOption"){
        changeSkirt(optionVal);
    }
    else if(optionID=="stockingOption"){
        changeStocking(optionVal);
    }
    else if(optionID=="sockOption"){
        changeSocks(optionVal);
    }
    else if(optionID=="shoeOption"){
        changeShoes(optionVal);
    }
    else if(optionID=="scarfOption"){
        changeScarf(optionVal);
    }
    else if(optionID=="expressionOption"){
        changeExpression(optionVal);
    }
}

function changeCoat(optionVal){
    if (optionVal == "none"){
        document.getElementById('coat').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "brown"){
        document.getElementById('coat').src = "TongzeAssets/coat1.png";
    }
    if (optionVal == "grey"){
        document.getElementById('coat').src = "TongzeAssets/coat2.png";
    }
}

function accessoryToggled(optionID, optionChecked){
    if(optionID=="bracelet1Option"){
        if(optionChecked){
           document.getElementById('bracelet1').src = "TongzeAssets/bracelet.png"; 
        }
        else{
           document.getElementById('bracelet1').src = "TongzeAssets/empty.png";  
        }
    }
    else if(optionID=="bracelet2Option"){
        if(optionChecked){
           document.getElementById('bracelet2').src = "TongzeAssets/bracelet2.png"; 
        }
        else{
           document.getElementById('bracelet2').src = "TongzeAssets/empty.png";  
        }
    }
    else if(optionID=="chokerOption"){
        if(optionChecked){
           document.getElementById('choker').src = "TongzeAssets/choker.png"; 
        }
        else{
           document.getElementById('choker').src = "TongzeAssets/empty.png";  
        }
    }
    else if(optionID=="legringOption"){
        if(optionChecked){
           document.getElementById('legring').src = "TongzeAssets/legring.png"; 
        }
        else{
           document.getElementById('legring').src = "TongzeAssets/empty.png";  
        }
    }
    else if(optionID=="watchOption"){
        if(optionChecked){
           document.getElementById('watch').src = "TongzeAssets/watch.png"; 
        }
        else{
           document.getElementById('watch').src = "TongzeAssets/empty.png";  
        }
    }
}

function changeFrontHair(optionVal){
    if (optionVal == "black"){
        document.getElementById('hairfront').src = "TongzeAssets/hairfront1.png";
    }
    if (optionVal == "white"){
        document.getElementById('hairfront').src = "TongzeAssets/hairfront2.png";
    }
}

function changeBackHair(optionVal){
    if (optionVal == "none"){
        document.getElementById('hairback').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "shortblack"){
        document.getElementById('hairback').src = "TongzeAssets/hairback3.png";
    }
    if (optionVal == "shortwhite"){
        document.getElementById('hairback').src = "TongzeAssets/hairback4.png";
    }
    if (optionVal == "medblack"){
        document.getElementById('hairback').src = "TongzeAssets/hairback1.png";
    }
    if (optionVal == "medwhite"){
        document.getElementById('hairback').src = "TongzeAssets/hairback2.png";
    }
    if (optionVal == "longblack"){
        document.getElementById('hairback').src = "TongzeAssets/hairback5.png";
    }
    if (optionVal == "longwhite"){
        document.getElementById('hairback').src = "TongzeAssets/hairback6.png";
    }
}

function changeSideHair(optionVal){
    if (optionVal == "none"){
        document.getElementById('hairside').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "shortblack"){
        document.getElementById('hairside').src = "TongzeAssets/hairside1.png";
    }
    if (optionVal == "shortwhite"){
        document.getElementById('hairside').src = "TongzeAssets/hairside2.png";
    }
    if (optionVal == "longblack"){
        document.getElementById('hairside').src = "TongzeAssets/hairside3.png";
    }
    if (optionVal == "longwhite"){
        document.getElementById('hairside').src = "TongzeAssets/hairside4.png";
    }
}

function changeBraidHair(optionVal){
    if (optionVal == "none"){
        document.getElementById('hairbraid').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "ponyblack"){
        document.getElementById('hairbraid').src = "TongzeAssets/hairbraid1.png";
    }
    if (optionVal == "ponywhite"){
        document.getElementById('hairbraid').src = "TongzeAssets/hairbraid2.png";
    }
    if (optionVal == "braidblack"){
        document.getElementById('hairbraid').src = "TongzeAssets/hairpigtail1.png";
    }
    if (optionVal == "braidwhite"){
        document.getElementById('hairbraid').src = "TongzeAssets/hairpigtail2.png";
    }
    if (optionVal == "bunblack"){
        document.getElementById('hairbraid').src = "TongzeAssets/hairbun1.png";
    }
    if (optionVal == "bunwhite"){
        document.getElementById('hairbraid').src = "TongzeAssets/hairbun2.png";
    }
}

function changeEyebrow(optionVal){
    if (optionVal == "brow1"){
        document.getElementById('eyebrows').src = "TongzeAssets/eyebrow1.png";
    }
    if (optionVal == "brow2"){
        document.getElementById('eyebrows').src = "TongzeAssets/eyebrow2.png";
    }
    if (optionVal == "brow3"){
        document.getElementById('eyebrows').src = "TongzeAssets/eyebrow3.png";
    }
    if (optionVal == "brow4"){
        document.getElementById('eyebrows').src = "TongzeAssets/eyebrow4.png";
    }
    if (optionVal == "brow5"){
        document.getElementById('eyebrows').src = "TongzeAssets/eyebrow5.png";
    }
    if (optionVal == "brow6"){
        document.getElementById('eyebrows').src = "TongzeAssets/eyebrow6.png";
    }
    if (optionVal == "brow7"){
        document.getElementById('eyebrows').src = "TongzeAssets/eyebrow7.png";
    }
}

function changeEyes(optionVal){
    if (optionVal == "eyes1"){
        document.getElementById('eyes').src = "TongzeAssets/eyes1.png";
    }
    if (optionVal == "eyes2"){
        document.getElementById('eyes').src = "TongzeAssets/eyes2.png";
    }
    if (optionVal == "eyes3"){
        document.getElementById('eyes').src = "TongzeAssets/eyes3.png";
    }
    if (optionVal == "eyes4"){
        document.getElementById('eyes').src = "TongzeAssets/eyes4.png";
    }
    if (optionVal == "eyes5"){
        document.getElementById('eyes').src = "TongzeAssets/eyes5.png";
    }
    if (optionVal == "eyes6"){
        document.getElementById('eyes').src = "TongzeAssets/eyes6.png";
    }
    if (optionVal == "eyes7"){
        document.getElementById('eyes').src = "TongzeAssets/eyes7.png";
    }
    if (optionVal == "eyes8"){
        document.getElementById('eyes').src = "TongzeAssets/eyes8.png";
    }
    if (optionVal == "eyes9"){
        document.getElementById('eyes').src = "TongzeAssets/eyes9.png";
    }
    if (optionVal == "eyes10"){
        document.getElementById('eyes').src = "TongzeAssets/eyes10.png";
    }
    if (optionVal == "eyes11"){
        document.getElementById('eyes').src = "TongzeAssets/eyes11.png";
    }
    if (optionVal == "eyes12"){
        document.getElementById('eyes').src = "TongzeAssets/eyes12.png";
    }
}

function changeFrames(optionVal){
    if (optionVal == "none"){
        document.getElementById('frames').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "frames1"){
        document.getElementById('frames').src = "TongzeAssets/frame1.png";
    }
    if (optionVal == "frames2"){
        document.getElementById('frames').src = "TongzeAssets/frame2.png";
    }
}

function changeLens(optionVal){
    if (optionVal == "none"){
        document.getElementById('lens').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "lens1"){
        document.getElementById('lens').src = "TongzeAssets/lens1.png";
    }
    if (optionVal == "lens2"){
        document.getElementById('lens').src = "TongzeAssets/lens2.png";
    }
}

function changeMouth(optionVal){
    if (optionVal == "mouth1"){
        document.getElementById('mouth').src = "TongzeAssets/mouth1.png";
    }
    if (optionVal == "mouth4"){
        document.getElementById('mouth').src = "TongzeAssets/mouth4.png";
    }
    if (optionVal == "mouth5"){
        document.getElementById('mouth').src = "TongzeAssets/mouth5.png";
    }
    if (optionVal == "mouth6"){
        document.getElementById('mouth').src = "TongzeAssets/mouth6.png";
    }
    if (optionVal == "mouth7"){
        document.getElementById('mouth').src = "TongzeAssets/mouth7.png";
    }
    if (optionVal == "mouth9"){
        document.getElementById('mouth').src = "TongzeAssets/mouth9.png";
    }
    if (optionVal == "mouth10"){
        document.getElementById('mouth').src = "TongzeAssets/mouth10.png";
    }
    if (optionVal == "mouth11"){
        document.getElementById('mouth').src = "TongzeAssets/mouth11.png";
    }
    if (optionVal == "mouth12"){
        document.getElementById('mouth').src = "TongzeAssets/mouth12.png";
    }
    if (optionVal == "mouth13"){
        document.getElementById('mouth').src = "TongzeAssets/mouth13.png";
    }
    if (optionVal == "mouth14"){
        document.getElementById('mouth').src = "TongzeAssets/mouth14.png";
    }
    if (optionVal == "mouth17"){
        document.getElementById('mouth').src = "TongzeAssets/mouth17.png";
    }
    if (optionVal == "mouth18"){
        document.getElementById('mouth').src = "TongzeAssets/mouth18.png";
    }
    if (optionVal == "mouth21"){
        document.getElementById('mouth').src = "TongzeAssets/mouth21.png";
    }
    if (optionVal == "mouth22"){
        document.getElementById('mouth').src = "TongzeAssets/mouth22.png";
    }
    if (optionVal == "mouth23"){
        document.getElementById('mouth').src = "TongzeAssets/mouth23.png";
    }
    if (optionVal == "mouth25"){
        document.getElementById('mouth').src = "TongzeAssets/mouth25.png";
    }
    if (optionVal == "mouth27"){
        document.getElementById('mouth').src = "TongzeAssets/mouth27.png";
    }
}

function changeShirt(optionVal){
    if (optionVal == "none"){
        document.getElementById('shirt').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "tshirt"){
        document.getElementById('shirt').src = "TongzeAssets/shirt1.png";
    }
    if (optionVal == "collar1"){
        document.getElementById('shirt').src = "TongzeAssets/shirt3.png";
    }
    if (optionVal == "collar2"){
        document.getElementById('shirt').src = "TongzeAssets/shirt2.png";
    }
}

function changeSweater(optionVal){
    if (optionVal == "none"){
        document.getElementById('sweater').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "beige"){
        document.getElementById('sweater').src = "TongzeAssets/sweater1.png";
    }
    if (optionVal == "grey"){
        document.getElementById('sweater').src = "TongzeAssets/sweater2.png";
    }
}

function changeDress(optionVal){
    if (optionVal == "none"){
        document.getElementById('dress').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "dress1"){
        document.getElementById('dress').src = "TongzeAssets/dress1.png";
    }
    if (optionVal == "dress2"){
        document.getElementById('dress').src = "TongzeAssets/dress2.png";
    }
    if (optionVal == "dress3"){
        document.getElementById('dress').src = "TongzeAssets/dress3.png";
    }
    if (optionVal == "dress4"){
        document.getElementById('dress').src = "TongzeAssets/dress4.png";
    }
    if (optionVal == "dress5"){
        document.getElementById('dress').src = "TongzeAssets/dress5.png";
    }
}

function changeSkirt(optionVal){
    if (optionVal == "none"){
        document.getElementById('bottom').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "shorts"){
        document.getElementById('bottom').src = "TongzeAssets/shorts.png";
    }
    if (optionVal == "skirt1"){
        document.getElementById('bottom').src = "TongzeAssets/skirt1.png";
    }
    if (optionVal == "skirt2"){
        document.getElementById('bottom').src = "TongzeAssets/skirt2.png";
    }
}

function changeStocking(optionVal){
    if (optionVal == "none"){
        document.getElementById('stocking').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "stock1"){
        document.getElementById('stocking').src = "TongzeAssets/stocking1.png";
    }
    if (optionVal == "stock2"){
        document.getElementById('stocking').src = "TongzeAssets/stocking2.png";
    }
    if (optionVal == "stock3"){
        document.getElementById('stocking').src = "TongzeAssets/stocking3.png";
    }
    if (optionVal == "stock4"){
        document.getElementById('stocking').src = "TongzeAssets/stocking4.png";
    }
}

function changeSocks(optionVal){
    if (optionVal == "none"){
        document.getElementById('socks').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "sock1"){
        document.getElementById('socks').src = "TongzeAssets/socks1.png";
    }
    if (optionVal == "sock2"){
        document.getElementById('socks').src = "TongzeAssets/socks2.png";
    }
    if (optionVal == "sock3"){
        document.getElementById('socks').src = "TongzeAssets/socks3.png";
    }
    if (optionVal == "sock4"){
        document.getElementById('socks').src = "TongzeAssets/socks4.png";
    }
    if (optionVal == "sock5"){
        document.getElementById('socks').src = "TongzeAssets/socks6.png";
    }
    if (optionVal == "sock6"){
        document.getElementById('socks').src = "TongzeAssets/socks7.png";
    }
    if (optionVal == "sock7"){
        document.getElementById('socks').src = "TongzeAssets/socks5.png";
    }
}

function changeShoes(optionVal){
    if (optionVal == "none"){
        document.getElementById('shoes').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "shoe1"){
        document.getElementById('shoes').src = "TongzeAssets/shoes1.png";
    }
    if (optionVal == "shoe2"){
        document.getElementById('shoes').src = "TongzeAssets/shoes2.png";
    }
    if (optionVal == "shoe3"){
        document.getElementById('shoes').src = "TongzeAssets/shoes3.png";
    }
    if (optionVal == "shoe4"){
        document.getElementById('shoes').src = "TongzeAssets/shoes4.png";
    }
    if (optionVal == "shoe5"){
        document.getElementById('shoes').src = "TongzeAssets/shoes5.png";
    }
    if (optionVal == "shoe6"){
        document.getElementById('shoes').src = "TongzeAssets/shoes6.png";
    }
    if (optionVal == "shoe7"){
        document.getElementById('shoes').src = "TongzeAssets/shoes7.png";
    }
    if (optionVal == "shoe8"){
        document.getElementById('shoes').src = "TongzeAssets/shoes8.png";
    }
    if (optionVal == "shoe9"){
        document.getElementById('shoes').src = "TongzeAssets/shoes9.png";
    }
    if (optionVal == "shoe10"){
        document.getElementById('shoes').src = "TongzeAssets/shoes10.png";
    }
    if (optionVal == "shoe11"){
        document.getElementById('shoes').src = "TongzeAssets/shoes11.png";
    }
    if (optionVal == "shoe12"){
        document.getElementById('shoes').src = "TongzeAssets/shoes12.png";
    }
    if (optionVal == "shoe13"){
        document.getElementById('shoes').src = "TongzeAssets/shoes13.png";
    }
}

function changeScarf(optionVal){
    if (optionVal == "none"){
        document.getElementById('scarf').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "scarf1"){
        document.getElementById('scarf').src = "TongzeAssets/scarf1.png";
    }
    if (optionVal == "scarf2"){
        document.getElementById('scarf').src = "TongzeAssets/scarf2.png";
    }
}

function changeExpression(optionVal){
    if (optionVal == "none"){
        document.getElementById('expression').src = "TongzeAssets/empty.png";
    }
    if (optionVal == "ex1"){
        document.getElementById('expression').src = "TongzeAssets/expression1.png";
    }
    if (optionVal == "ex2"){
        document.getElementById('expression').src = "TongzeAssets/expression2.png";
    }
    if (optionVal == "ex3"){
        document.getElementById('expression').src = "TongzeAssets/expression3.png";
    }
}

function randomizeEverything(){
    randomizeHair();
    randomizeFace();
    randomizeOutfit();
}

function randomizeHair(){
    variant = Math.floor(Math.random() * (5 - 1 + 1) +1);
    if (variant==1){
        changeFrontHair("black");
        changeBackHair("medblack");
        changeSideHair("none");
        changeBraidHair("none");
        
        document.getElementById("hairFrontOption").value = "black";
        document.getElementById("hairBackOption").value = "medblack";
        document.getElementById("hairSideOption").value = "none";
        document.getElementById("hairBraidOption").value = "none";
    }
    if (variant==2){
        changeFrontHair("black");
        changeBackHair("longblack");
        changeSideHair("shortblack");
        changeBraidHair("none");
        
        document.getElementById("hairFrontOption").value = "black";
        document.getElementById("hairBackOption").value = "longblack";
        document.getElementById("hairSideOption").value = "shortblack";
        document.getElementById("hairBraidOption").value = "none";
    }
    if (variant==3){
        changeFrontHair("white");
        changeBackHair("longwhite");
        changeSideHair("longwhite");
        changeBraidHair("none");
        
        document.getElementById("hairFrontOption").value = "white";
        document.getElementById("hairBackOption").value = "longwhite";
        document.getElementById("hairSideOption").value = "longwhite";
        document.getElementById("hairBraidOption").value = "none";
    }
    if (variant==4){
        changeFrontHair("white");
        changeBackHair("shortwhite");
        changeSideHair("shortwhite");
        changeBraidHair("braidwhite");
        
        document.getElementById("hairFrontOption").value = "white";
        document.getElementById("hairBackOption").value = "shortwhite";
        document.getElementById("hairSideOption").value = "shortwhite";
        document.getElementById("hairBraidOption").value = "braidwhite";
    }
    if (variant==5){
        changeFrontHair("black");
        changeBackHair("shortblack");
        changeSideHair("shortblack");
        changeBraidHair("ponyblack");
        
        document.getElementById("hairFrontOption").value = "black";
        document.getElementById("hairBackOption").value = "shortblack";
        document.getElementById("hairSideOption").value = "shortblack";
        document.getElementById("hairBraidOption").value = "ponyblack";
    }
}

function randomizeFace(){
    variant = Math.floor(Math.random() * (5 - 1 + 1) +1);
    if (variant==1){
        changeEyebrow("brow7");
        changeEyes("eyes1");
        changeMouth("mouth1");
        changeExpression("none");
        
        document.getElementById("eyebrowOption").value = "brow7";
        document.getElementById("eyesOption").value = "eyes1";
        document.getElementById("mouthOption").value = "mouth1";
        document.getElementById("expressionOption").value = "none";
    }
    if (variant==2){
        changeEyebrow("brow1");
        changeEyes("eyes10");
        changeMouth("mouth27");
        changeExpression("none");
        
        document.getElementById("eyebrowOption").value = "brow1";
        document.getElementById("eyesOption").value = "eyes10";
        document.getElementById("mouthOption").value = "mouth27";
        document.getElementById("expressionOption").value = "none";
    }
    if (variant==3){
        changeEyebrow("brow2");
        changeEyes("eyes6");
        changeMouth("mouth11");
        changeExpression("ex2");
        
        document.getElementById("eyebrowOption").value = "brow2";
        document.getElementById("eyesOption").value = "eyes6";
        document.getElementById("mouthOption").value = "mouth11";
        document.getElementById("expressionOption").value = "ex2";
    }
    if (variant==4){
        changeEyebrow("brow4");
        changeEyes("eyes8");
        changeMouth("mouth9");
        changeExpression("none");
        
        document.getElementById("eyebrowOption").value = "brow4";
        document.getElementById("eyesOption").value = "eyes8";
        document.getElementById("mouthOption").value = "mouth9";
        document.getElementById("expressionOption").value = "none";
    }
    if (variant==5){
        changeEyebrow("brow1");
        changeEyes("eyes8");
        changeMouth("mouth12");
        changeExpression("none");
        
        document.getElementById("eyebrowOption").value = "brow1";
        document.getElementById("eyesOption").value = "eyes8";
        document.getElementById("mouthOption").value = "mouth12";
        document.getElementById("expressionOption").value = "none";
    }
}

function randomizeOutfit(){
    variant = Math.floor(Math.random() * (5 - 1 + 1) +1);
    if (variant==1){
        changeCoat("none");
        changeSweater("grey");
        changeShirt("collar2");
        changeDress("none");
        
        changeSkirt("skirt2");
        changeStocking("stock3");
        
        changeSocks("sock1");
        changeShoes("shoe4");
        
        document.getElementById("coatOption").value = "none";
        document.getElementById("sweatOption").value = "grey";
        document.getElementById("shirtOption").value = "collar2";
        document.getElementById("dressOption").value = "none";
        
        document.getElementById("skirtOption").value = "skirt2";
        document.getElementById("stockingOption").value = "stock3";
        
        document.getElementById("sockOption").value = "sock1";
        document.getElementById("shoeOption").value = "shoe4";
    }
    if (variant==2){
        changeCoat("none");
        changeSweater("none");
        changeShirt("none");
        changeDress("dress1");
        
        changeSkirt("none");
        changeStocking("stock3");
        
        changeSocks("sock6");
        changeShoes("shoe3");
        
        document.getElementById("coatOption").value = "none";
        document.getElementById("sweatOption").value = "none";
        document.getElementById("shirtOption").value = "none";
        document.getElementById("dressOption").value = "dress1";
        
        document.getElementById("skirtOption").value = "none";
        document.getElementById("stockingOption").value = "stock3";
        
        document.getElementById("sockOption").value = "sock6";
        document.getElementById("shoeOption").value = "shoe3";
    }
    if (variant==3){
        changeCoat("brown");
        changeSweater("none");
        changeShirt("tshirt");
        changeDress("none");
        
        changeSkirt("skirt1");
        changeStocking("stock3");
        
        changeSocks("sock1");
        changeShoes("shoe2");
        
        document.getElementById("coatOption").value = "brown";
        document.getElementById("sweatOption").value = "none";
        document.getElementById("shirtOption").value = "tshirt";
        document.getElementById("dressOption").value = "none";
        
        document.getElementById("skirtOption").value = "skirt1";
        document.getElementById("stockingOption").value = "stock3";
        
        document.getElementById("sockOption").value = "sock1";
        document.getElementById("shoeOption").value = "shoe2";
    }
    if (variant==4){
        changeCoat("none");
        changeSweater("none");
        changeShirt("none");
        changeDress("dress4");
        
        changeSkirt("none");
        changeStocking("stock3");
        
        changeSocks("none");
        changeShoes("shoe6");
        
        document.getElementById("coatOption").value = "none";
        document.getElementById("sweatOption").value = "none";
        document.getElementById("shirtOption").value = "none";
        document.getElementById("dressOption").value = "dress4";
        
        document.getElementById("skirtOption").value = "none";
        document.getElementById("stockingOption").value = "stock3";
        
        document.getElementById("sockOption").value = "none";
        document.getElementById("shoeOption").value = "shoe6";
    }
    if (variant==5){
        changeCoat("none");
        changeSweater("none");
        changeShirt("shirt1");
        changeDress("none");
        
        changeSkirt("shorts");
        changeStocking("none");
        
        changeSocks("sock7");
        changeShoes("shoe2");
        
        document.getElementById("coatOption").value = "none";
        document.getElementById("sweatOption").value = "none";
        document.getElementById("shirtOption").value = "tshirt";
        document.getElementById("dressOption").value = "none";
        
        document.getElementById("skirtOption").value = "shorts";
        document.getElementById("stockingOption").value = "none";
        
        document.getElementById("sockOption").value = "sock7";
        document.getElementById("shoeOption").value = "shoe2";
    }
}

function changeBgColor(newColor){
    document.getElementById("colorThis").style.backgroundColor = newColor;
}