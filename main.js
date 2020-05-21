

function setup()
{
    createCanvas(windowWidth, windowHeight);

    for(let x = 0; x < width; x++) 
    {
        wires[x] = [height];
        for(let y = 0; y < height; y++)
        {
            wires[x][y] = [new Wire(), new Wire()];
        }
    }

    objects.push(new Font(10, 5, 0, -1));
    objects.push(new Terra(10, 10, 0, 1))
}

function draw()
{
    background(255);
    
    mx = int(mouseX / wireLength);
    my = int(mouseY / wireLength);
    wmx = int(mouseX / wireLength + 0.5);
    wmy = int(mouseY / wireLength + 0.5);
    md = (mouseX % wireLength) < (mouseY % wireLength)? 0 : 1;
    if ((mouseX % wireLength) + (mouseY % wireLength) > wireLength) {
        if (md == 0) my ++;
        else mx ++;
        md = 1 - md;
    }

    for (let i = 0; i < 7; i++)
    {
        refreshWires();
        UpdateBeforeObj();
        refreshPressio();
        
    }

    drawWires();
    DrawObj();
    if(mouseIsPressed) DrawPreview();

    if (button(windowWidth-110, 10, 100, 100))
        print("SIO");
    buttonsUpdate();
}

function mousePressed()
{
    wmxPress = wmx;
    wmyPress = wmy;
}

function mouseReleased()
{
    buttonsReleased();

    switch(pen)
    {
    case "wire":
    case "remove":
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
        addObject(new Font(mx, my, md == 1 || md == 2? 0 : 1, penOri));
        break;
    case "terra":
        addObject(new Terra(mx, my, md == 1 || md == 2? 0 : 1, penOri));
        break;
    }
}

function keyPressed()
{
    switch(key)
    {
    case 'w':
    case 'W':
        pen = "wire";
        break;
    case 'd':
    case 'D':
        pen = "remove";
        break;
    case 'f':
    case 'F':
        pen = "font";
        break;
    case 'r':
    case 'R':
        penOri = -penOri;
        break;
    case 't':
    case 'T':
        pen = "terra";
        break;
    }
}

function DrawPreview()
{
    switch(pen)
    {
    case "remove":
    case "wire":
        if (pen == "remove") { 
            if (wmx - wmxPress == 0 && my - wmyPress == 0)
            {
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
        new Font(mx, my, md == 1 || md == 2? 0 : 1, penOri).draw();
        break;
    case 'terra':
        new Terra(mx, my, md == 1 || md == 2? 0 : 1, penOri).draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
