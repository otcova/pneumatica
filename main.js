

function setup()
{
    createCanvas(windowWidth, windowHeight);

    width = int((displayWidth / wireLength) * 1.25);
    height = int((displayHeight / wireLength) * 1.25);

    for(let x = 0; x < width; x++)
    {
        wires[x] = [height];
        for(let y = 0; y < height; y++)
        {
            wires[x][y] = [new Wire(), new Wire()];
        }
    }
    if (typeof window.orientation !== 'undefined') {
        print("Mobile");
        calcForFrame = 1;
    }
}

function draw()
{
    background(255);
    push();
    translate(taulellx, taulelly);
    let tmouseX = mouseX - taulellx;
    let tmouseY = mouseY - taulelly;
    
    mx = int(tmouseX / wireLength);
    my = int(tmouseY / wireLength);
    wmx = int(tmouseX / wireLength + 0.5);
    wmy = int(tmouseY / wireLength + 0.5);
    md = (tmouseX % wireLength) < (tmouseY % wireLength)? 1 : 0;

    if ((tmouseX % wireLength) + (tmouseY % wireLength) > wireLength) {
        if (md == 0) {
            mx ++;
            md = 1
        }
        else {
            my ++;
            md = 0;
        }
    }
    for (let i = 0; i < calcForFrame; i++)
    {
        refreshWires();
        UpdateBeforeObj();
        refreshPressio();
        UpdateAfterObj();
    }

    drawTaulell();
    drawWires();
    DrawObj();

    if(mouseIsPressed) DrawPreview();
    pop();

    updateGUI();
}

function mousePressed()
{
    wmxPress = wmx;
    wmyPress = wmy;
}

function mouseReleased()
{
    buttonsReleased();

    if(mouseX    > windowWidth-guiTotalWidth || mouseButton != LEFT) return;
    
    switch(pen)
    {
    case "remove":
        if (wmx == wmxPress && wmy == wmyPress)
        {
            let len = objects.length;
            for (let i = 0; i < len; i++) {
                if (objects[i].colitionDot(wmx, wmy)){
                    objects.splice(i, 1);
                    break;
                }
            }
            break;
        }
    case "wire":
        if (abs(wmx - wmxPress) > abs(wmy - wmyPress)) {
            for (let x = min(wmxPress, wmx); x < max(wmxPress, wmx); x++)
                setWire(x, wmyPress, 0, pen == "wire");
        }
        else {
            for (let y = min(wmyPress, wmy); y < max(wmyPress, wmy); y++)
                setWire(wmxPress, y, 1, pen == "wire");
        }
        break;
    case "font":
        addObject(new Font(wmx, wmy, penAngle));
        break;
    case "terra":
        addObject(new Terra(wmx, wmy, penAngle));
        break;
    case "cilindre":
        addObject(new Cilindre(wmx, wmy, penAngle));
        break;
    case "v reg":
        addObject(new ValvulaReg(wmx, wmy, penAngle));
        break;
    case "v 3/2":
        addObject(new Valvula(wmx, wmy, "pressio", penAngle));
        break;
    case "v 3/2 p":
        addObject(new Valvula(wmx, wmy, "lever", penAngle));
        break;
    }
}

function keyPressed()
{

    if (key == 'q' || key == 'Q')
    {
        penAngle += 1;
        if (penAngle > 3) penAngle = 0;
        return;
    }        
    else if (key == 'w' || key == 'W')
    {
        penAngle -= 1;
        if (penAngle < 0) penAngle = 3;
        return;
    }

    ["remove", "wire", "font", "terra", "cilindre", "v reg", "v 3/2", "v 3/2 p"].forEach(function (nom, index)
    {
        if (key == "" + (1+index))
        {
            pen = nom;
            return;
        }
    });
}

function DrawPreview()
{
    if(mouseX > windowWidth-guiTotalWidth || mouseButton != LEFT) return;

    switch(pen)
    {
    case "remove":
    case "wire":
        if (pen == "remove") { 
            if (wmx - wmxPress == 0 && wmy - wmyPress == 0) {
                let objIndex = getObjectIn();
                return;
            }
            stroke(250, 100, 100); 
            strokeWeight(3); 
        }
        else { 
            stroke(0); 
            strokeWeight(1); 
        }

        if (abs(wmx - wmxPress) > abs(wmy - wmyPress))
            line(wmxPress * wireLength, wmyPress * wireLength, wmx * wireLength, wmyPress * wireLength);
        else
            line(wmxPress * wireLength, wmyPress * wireLength, wmxPress * wireLength, wmy * wireLength);

        break;
    case 'font':
        new Font(wmx, wmy, penAngle).draw();
        break;
    case 'terra':
        new Terra(wmx, wmy, penAngle).draw();
        break;
    case "cilindre":
        new Cilindre(wmx, wmy, penAngle).draw();
        break;
    case "v reg":
        new ValvulaReg(wmx, wmy, penAngle).draw();
        break;
    case "v 3/2":
        new Valvula(wmx, wmy, "pressio", penAngle).draw();
        break;
    case "v 3/2 p":
        new Valvula(wmx, wmy, "lever", penAngle).draw();
        break;
    }
}

function mouseDragged()
{
    if (mouseButton == RIGHT)
    {
        taulellx = max(windowWidth -(width * wireLength + guiTotalWidth), min(0, taulellx + mouseX - pmouseX));
        taulelly = max(windowHeight - height * wireLength, min(0, taulelly + mouseY - pmouseY));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    taulellx = max(windowWidth -(width * wireLength + guiTotalWidth), min(0, taulellx));
    taulelly = max(windowHeight-(height-1) * wireLength, min(0, taulelly ));
}

function mouseWheel(event) {
    guiYdelta = min(0, max(windowHeight - guiLength, guiYdelta + event.delta * .5));//min(0, max(windowHeight - guiLength, guiYdelta));
    print(guiYdelta);
}

document.oncontextmenu = function() {
    return false;
}

