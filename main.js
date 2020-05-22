

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


    // temp GUI

    let marge = 10;
    let w = 80;
    let h = 40;
    let x = windowWidth - w - marge;
    let y = marge;
    
    noStroke();
    fill(220);
    rect(x - marge, 0, w*2, windowHeight)

    if (button(x, y, w, h))
        penOri = -penOri;
    fill(255);
    strokeWeight(2);
    text("girar", x + w / 2, y + h/2);
    y += h + marge;

    if (button(x, y, w, h, pen == "remove"))
        pen = "remove";
    fill(255);
    strokeWeight(2);
    text("goma", x + w / 2, y + h/2);
    y += h + marge;
    if (button(x, y, w, h, pen == "wire"))
        pen = "wire";
    fill(255);
    strokeWeight(2);
    text("cable", x + w / 2, y + h/2);
    y += h + marge;

    h = 80;
    textSize(20);
    textAlign(CENTER, CENTER);
    ["font", "terra", "cilindre", "v 3/2"].forEach(function(nom) {
        if (button(x, y, w, h, pen == nom))
            pen = nom;
        fill(255);
        strokeWeight(2);
        text(nom, x + w / 2, y + h/2);
        y += h + marge;
    })
    
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

    if(mouseX    > windowWidth-100 || mouseButton != LEFT) return;
    
    switch(pen)
    {
    case "remove":
        if (wmx == wmxPress && wmy == wmyPress)
        {
            let len = objects.length;
            for (let i = 0; i < len; i++) {
                if (objects[i].del()){
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
        addObject(new Font(mx, my, md, penOri));
        break;
    case "terra":
        addObject(new Terra(mx, my, md, penOri));
        break;
    case "cilindre":
        addObject(new CilindreD(wmx, wmy));
        break;
    case "v 3/2":
        addObject(new Valvula(wmx, wmy));
        break;
    }
}

function keyPressed()
{
    if (key == '1')
    {
        penOri = -penOri;
        return;
    }        

    ["remove", "wire", "font", "terra", "cilindre", "v 3/2"].forEach(function (nom, index)
    {
        if (key == "" + (2+index))
        {
            pen = nom;
            return;
        }
    });
}

function DrawPreview()
{
    if(mouseX > windowWidth-100 || mouseButton != LEFT) return;

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
        new Font(mx, my, md, penOri).draw();
        break;
    case 'terra':
        new Terra(mx, my, md, penOri).draw();
        break;
    case "cilindre":
        new CilindreD(wmx, wmy).draw();
        break;
    case "v 3/2":
        new Valvula(wmx, wmy).draw();
        break;
    }
}

function mouseDragged()
{
    if (mouseButton == RIGHT)
    {
        taulellx = max(windowWidth -(width * wireLength + 100), min(0, taulellx + mouseX - pmouseX));
        taulelly = max(windowHeight - height * wireLength, min(0, taulelly + mouseY - pmouseY));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    taulellx = max(windowWidth -(width * wireLength + 100), min(0, taulellx));
    taulelly = max(windowHeight-(height-1) * wireLength, min(0, taulelly ));
}


document.oncontextmenu = function() {
    return false;
}