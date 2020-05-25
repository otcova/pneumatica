var mouseIsReleased = false;

let mobile = false;
let guiYdelta = 0;
let guiMarge = 13;
let guiWidth = 120;
let guiHeight = 70;
let guiTextHeight = guiHeight/2;
let guiLavelHeight = 30;
let guiTotalWidth = guiMarge*2 + guiWidth;
let guiLength = guiHeight;

let guiButtonOver = false
let guiButtonPressing = false

function button(x, y, guiWidth, guiHeight, active = false)
{
    guiButtonOver = false;
    guiButtonPressing = false;
    let released = false;

    fill(150);
    noStroke();

    if (overRect(x, y, guiWidth, guiHeight)) 
    {
        guiButtonOver = true;
        stroke(50);
        if (mouseIsPressed)
        {
            guiButtonPressing = true;
            fill(100);
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
    fill(210);
    rect(x - guiMarge, 0, guiWidth *2, windowHeight)
    
    if (button(x, y, guiWidth, guiTextHeight) && penAngle[pen] != undefined){
        penAngle[pen] += 1;
        if (penAngle[pen] > 3) penAngle[pen] = 0
    }
    fill(255);
    strokeWeight(2);
    text(mobile? "girar" : "girar (q / w)", x +guiWidth/ 2, y + guiTextHeight/2);
    y += guiTextHeight + guiMarge;

    if (button(x, y, guiWidth, guiTextHeight, pen == "remove"))
        pen = "remove";
    fill(255);
    strokeWeight(2);
    text("goma", x +guiWidth/ 2, y + guiTextHeight/2);
    y += guiTextHeight + guiMarge;
    if (button(x, y, guiWidth, guiTextHeight, pen == "wire"))
        pen = "wire";
    fill(255);
    strokeWeight(2);
    text("cable", x +guiWidth/ 2, y + guiTextHeight/2);
    y += guiTextHeight + guiMarge;

    textAlign(CENTER, CENTER);

    ["font", "terra", "cilindre", "-valvules", "v reg", "v 3/2", "v 3/2 p", "- provisional"].forEach(function(nom, index) {
        if (nom[0] == '-')
        {
            noStroke();
            fill(150);
            rect(windowWidth-guiTotalWidth, y, guiTotalWidth, guiLavelHeight);
            fill(255);
            text(nom.substr(1, 20), x +guiWidth/ 2, y + guiLavelHeight/2);
            y += guiLavelHeight + guiMarge;
        }
        else
        {
            let extraH = (pen == nom)? (guiWidth - guiHeight) : 0;
            if (button(x, y, guiWidth, guiHeight+extraH, pen == nom))
                pen = nom;
            
            if (guiButtonOver || pen == nom)
            {
                createObject(nom, (x+guiWidth/ 2) / wireLength, (y + (guiHeight+extraH)/2) / wireLength, 
                            extraH == 0? 0 : penAngle[nom], 1).draw();
            }
            else
            {
                fill(255);
                strokeWeight(2);
                text(traduirNom(nom), x +guiWidth/ 2, y + guiHeight/2);
            }
            y += (guiHeight+extraH) + guiMarge;
        }
    })
    if (button(x, y, guiWidth, guiHeight))
    {
        objects = [];
        for(let x = 0; x < 15; x++) {
            for(let y = 0; y < 15; y++) {
                wires[x][y][0] = new Wire();
                wires[x][y][1] = new Wire();
            }
        }
        addObject(new Cilindre(7, 4, 0));
        addObject(new Valvula(9, 7, "pressio", 0));
        addObject(new Valvula(4, 10, "lever", 0));
        addObject(new ValvulaReg(13, 10, 0));
        addObject(new Terra(5, 12, 0));
        addObject(new Terra(10, 9, 0));
        addObject(new Font(3, 13, 0));

        AddWireLen(3, 13, 0, 10);
        AddWireLen(9, 8, 1, 5);
        setWire(5, 11, 1, true);
        setWire(10, 8, 1, true);
        setWire(9, 5, 1, true);
        AddWireLen(4, 5, 1, 8);
        AddWireLen(13, 7, 1, 6);
        AddWireLen(4, 7, 0, 9);
    }
    //if(frameCount % 30 == 0) print(wmx, wmy);
    fill(255);
    strokeWeight(2);
    text(traduirNom("test"), x +guiWidth/ 2, y + guiHeight/2);
    y += guiHeight + guiMarge;

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

function AddWireLen(x, y, d, wirelen)
{
    for (let i = 0; i < wirelen; i++)
        setWire(x + (d == 0? i : 0), y + (d == 1? i : 0), d, true);
}