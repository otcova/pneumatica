

function setup()
{
    createCanvas(windowWidth, windowHeight);

    if (window.orientation != undefined) {
        
        mobile = true;
        guiMarge = 10;
        wireLength = 20;
        guiWidth = 70;
        guiHeight = 40;
        guiTotalWidth = guiMarge*2 + guiWidth;
        calcForFrame = 1;
        textSize(15);

        width = int((displayWidth / wireLength));
        height = int((displayHeight / wireLength) + 1);

    }
    else{
        textSize(20);

        width = max(20, int((displayWidth / wireLength) * 1.25));
        height = max(20, int((displayHeight / wireLength) * 1.25));
    }

    

    for(let x = 0; x < width; x++)
    {
        wires[x] = [height];
        for(let y = 0; y < height; y++)
        {
            wires[x][y] = [new Wire(), new Wire()];
        }
    }

    print(width, height);
}

function updateMouse()
{
    let tmouseX = mouseX - taulellx;
    let tmouseY = mouseY - taulelly;

    mx = int(tmouseX / wireLength);
    my = int(tmouseY / wireLength);
    wmx = int(tmouseX / wireLength + 0.5);
    wmy = int(tmouseY / wireLength + 0.5);
    md = (tmouseX % wireLength) < (tmouseY % wireLength)? 1 : 0;
}

function draw()
{
    background(255);
    push();
    translate(taulellx, taulelly);
    let tmouseX = mouseX - taulellx;
    let tmouseY = mouseY - taulelly;
    
    updateMouse();
    

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
    drawMousePressio();

    if(mouseIsPressed) DrawPreview();
    pop();

    updateGUI();
}

function touchStarted() {
    updateMouse();
    mousePressed();
}
function mousePressed() {
    wmxPress = wmx;
    wmyPress = wmy;
}

function mouseReleased()
{
    buttonsReleased();

    if(mouseX > windowWidth-guiTotalWidth || mouseButton != LEFT) return;
    
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
    default:
        addObject(createObject(pen));
    }
}

function keyPressed()
{
    if (penAngle[pen] != undefined)
    {
        if (key == 'q' || key == 'Q')
        {
            penAngle[pen] += 1;
            if (penAngle[pen] > 3) penAngle[pen] = 0;
            return;
        }        
        else if (key == 'w' || key == 'W')
        {
            penAngle[pen] -= 1;
            if (penAngle[pen] < 0) penAngle[pen] = 3;
            return;
        }
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

    if (pen == "remove")
    {
        if (wmx - wmxPress == 0 && wmy - wmyPress == 0) {
            let objIndex = getObjectIn();
            return;
        }
        stroke(250, 100, 100); 
        strokeWeight(3); 
        if (abs(wmx - wmxPress) > abs(wmy - wmyPress))
            line(wmxPress * wireLength, wmyPress * wireLength, wmx * wireLength, wmyPress * wireLength);
        else
            line(wmxPress * wireLength, wmyPress * wireLength, wmxPress * wireLength, wmy * wireLength);
    }
    else if (pen == "wire")
    {
        stroke(0); 
        strokeWeight(1);
        if (abs(wmx - wmxPress) > abs(wmy - wmyPress))
            line(wmxPress * wireLength, wmyPress * wireLength, wmx * wireLength, wmyPress * wireLength);
        else
            line(wmxPress * wireLength, wmyPress * wireLength, wmxPress * wireLength, wmy * wireLength);
    }
    else
        createObject(pen).draw();
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
    let input=constrain(event.delta*100, -100, 100);
    guiYdelta = min(0, max(windowHeight - guiLength, guiYdelta + input * -.5));
    return false;
}

document.oncontextmenu = function() {
    return false;
}