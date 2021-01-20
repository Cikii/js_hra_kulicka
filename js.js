let character=document.getElementById("koule");
let hra= document.getElementById("hra");
let interval;
let b=0;
let counter=0;
let currentBlocks= [];

function moveLeft(){
    let left=
    parseInt(window.getComputedStyle(koule).getPropertyValue("left"));
    if(left>0){
    koule.style.left = left - 2 +"px";
    }
}
function moveRight(){
    let left=
    parseInt(window.getComputedStyle(koule).getPropertyValue("left"));
    if(left<380){
    koule.style.left = left + 2 +"px";
    }
}

document.addEventListener("keydown", event => {
    if (b===0){
        b++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
            }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    b=0;
});

let blocks = setInterval(function(){
    let caraL = document.getElementById("cara"+(counter-1));
    let diraL = document.getElementById("dira"+(counter-1));
 
    
    if(counter>0){
        var caraLTop = parseInt(window.getComputedStyle(caraL).getPropertyValue("top")); 
        var diraLTop = parseInt(window.getComputedStyle(diraL).getPropertyValue("top"));
     }
    if(caraLTop<400 || counter==0){
        let cara = document.createElement("div");
        let dira = document.createElement("div");
        cara.setAttribute("class", "cara");
        dira.setAttribute("class", "dira");
        cara.setAttribute("id", "cara"+counter);
        dira.setAttribute("id", "dira"+counter);
        cara.style.top = caraLTop + 100 + "px";
        dira.style.top = diraLTop + 100 + "px";

        var random = Math.floor(Math.random()*360);
        dira.style.left = random + "px";
        hra.appendChild(cara);
        hra.appendChild(dira);
        currentBlocks.push(counter);
        counter++;
    }
    let kouleTop = parseInt(window.getComputedStyle(koule).getPropertyValue("top"));
    let kouleLeft = parseInt(window.getComputedStyle(koule).getPropertyValue("left"));
    let drop=0;
    if(kouleTop <= 0){
        alert("Konec hry. Score: "+(counter-9));
        clearInterval(blocks);
        location.reload();
    }



    for(let i = 0; i< currentBlocks.lenght; i++){
        let current = currentBlocks[i];
        let icara = document.getElementById("cara"+current);
        let idira = document.getElementById("dira"+current);
        let icaraTop = parseFloat(window.getComputedStyle(icara).getPropertyValue("top"));
        let idiraLeft = parseFloat(window.getComputedStyle(idira).getPropertyValue("left"));
        


        icara.style.top = icaraTop - 0.5 + "px";
        idira.style.top = icaraTop - 0.5 + "px";
        if(icaraTop < -20){
            currentBlocks.shift();
            icara.remove();
            idira.remove();
        }
        if(icaraTop-20<kouleTop && icaraTop>kouleTop){
            drop++;
            if(idiraLeft<=kouleLeft && idiraLeft+20>=kouleLeft){
                drop=0;
            }
        }
    }
    if(drop===0){
        if(kouleTop < 480){
            koule.style.top = kouleTop + 2 + "px";
        }
    }else{
        koule.style.top = kouleTop - 0.5 + "px";
    }


    
},1);




