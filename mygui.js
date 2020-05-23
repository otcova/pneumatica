var mouseIsReleased = false;

let guiYdelta = 0;
let guiMarge = 13;
let guiWidth = 110;
let guiHeight = 70;
let guiLavelHeight = 25;
let guiTotalWidth = guiMarge*2 + guiWidth;
let guiLength = guiHeight;

function button(x, y, guiWidth, guiHeight, active = false)
{
    let over = false;
    let pressing = false;
    let released = false;

    fill(175);
    noStroke();

    if (overRect(x, y, guiWidth, guiHeight)) 
    {
        over = true;
        stroke(50);
        if (mouseIsPressed)
        {
            pressing = true;
            fill(240);
        }
        if (mouseIsReleased)
            released = true;
    }
    else if (active)
    {
        stroke(50);
    }

    strokeWeight(1);
    rect(x, y, guiWidth, guiHeight)


    return released;
}

function buttonsUpdate()
{
    mouseIsReleased = false;
}
function buttonsReleased()
{
    mouseIsReleased = true;
}

function overRect(x, y, w, h)  
{
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y+h)
        return true;
    return false;
}

function updateGUI()
{
    let x = windowWidth -guiWidth- guiMarge;
    let y = guiMarge + guiYdelta;

    noStroke();
    fill(220);
    rect(x - guiMarge, 0, guiWidth *2, windowHeight)

    if (button(x, y, guiWidth, guiHeight)){
        penAngle += 1;
        if (penAngle > 3) penAngle = 0
    }
    fill(255);
    strokeWeight(2);
    text("girar", x +guiWidth/ 2, y + guiHeight/2);
    y += guiHeight + guiMarge;

    if (button(x, y, guiWidth, guiHeight, pen == "remove"))
        pen = "remove";
    fill(255);
    strokeWeight(2);
    text("goma", x +guiWidth/ 2, y + guiHeight/2);
    y += guiHeight + guiMarge;
    if (button(x, y, guiWidth, guiHeight, pen == "wire"))
        pen = "wire";
    fill(255);
    strokeWeight(2);
    text("cable", x +guiWidth/ 2, y + guiHeight/2);
    y += guiHeight + guiMarge;

    guiHeight = 65;
    textSize(20);
    textAlign(CENTER, CENTER);
    ["font", "terra", "cilindre", "-valvules", "v reg", "v 3/2", "v 3/2 p"].forEach(function(nom) {
        if (nom[0] == '-')
        {
            noStroke();
            fill(175);
            rect(windowWidth-guiTotalWidth, y, guiTotalWidth, guiLavelHeight);
            fill(255);
            text(nom.substr(1, 20), x +guiWidth/ 2, y + guiLavelHeight/2);
            y += guiLavelHeight + guiMarge;
        }
        else
        {
            
            if (button(x, y, guiWidth, guiHeight, pen == nom))
                pen = nom;
            fill(255);
            strokeWeight(2);
            text(traduirNom(nom), x +guiWidth/ 2, y + guiHeight/2);
            y += guiHeight + guiMarge;
        }
    })
    guiLength = y - guiYdelta;
    buttonsUpdate();
}

function traduirNom(nom)
{
    if(nom[0] == 'v' && nom[1] == ' ') nom = nom.substr(2, 20);
    switch (nom)
    {
        case "reg":
            return "reguladora";
        case "3/2 p":
            return "3/2 palanca";
    }
    return nom;
}