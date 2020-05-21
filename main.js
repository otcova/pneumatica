let mx = 0;
let my = 0;

let mxPress = 0;
let myPress = 0;

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
    
    mx = int(mouseX / wireLength + 0.5);
    my = int(mouseY / wireLength + 0.5);
    ellipse(mx*wireLength, my*wireLength, 10, 10);

    for (let i = 0; i < 7; i++)
    {
        refreshWires();
        UpdateObj();
        refreshPressio();
    }

    drawWires();
    DrawObj();
}

function mousePressed()
{
    mxPress = mx;
    myPress = my;
}

function mouseReleased()
{
    if (abs(mx - mxPress) > abs(my - myPress))
    {
        for (let x = min(mxPress, mx); x < max(mxPress, mx); x++)
            addWire(x, myPress, 0, key != 'r' && key != 'R');
    }
    else
    {
        for (let y = min(myPress, my); y < max(myPress, my); y++)
            addWire(mxPress, y, 1, key != 'r' && key != 'R');
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
