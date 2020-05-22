
let pen = "wire"; // wire, remove, font, terra
let penOri = 1;

let width = 50;
let height = 30;
let wireLength = 35;

let wires = [width];
var wireGrups = [];

var objects = []

let wmx = 0;
let wmy = 0;
let mx = 0;
let my = 0;
let md = 0;

let wmxPress = 0;
let wmyPress = 0;

let taulellx = 0;
let taulelly = 0;

let calcForFrame = 3;

function getWire(x, y, d)
{
    if (x < 0 || x >= width || y < 0 || y >= height) return new Wire();
    if (wires[x][y][d].active) return wires[x][y][d];
    wires[x][y][d] = new Wire();
    return wires[x][y][d];
}

function setPressio(x, y, d, p)
{
    wire = getWire(x, y, d);
    if (wire.active)
        wire.pressio = (p + wire.pressio)/2.;
}

function getPressio(x, y, d)
{
    let wire = getWire(x, y, d);
    if (wire.active)
        return wire.pressio;
    return 0;
}

function havePressio(p) // the condition that says what is 'presio'
{
    return p > 0.999;
}

function setWire(x, y, d, a) // change wire.activate
{
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    if (a) {
        if (getObjectIn(x, y, d) != -1) return;
        wires[x][y][d].active = a;
    }
    else 
        wires[x][y][d] = new Wire();
}

function refreshWires() // reset wires
{
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++)
        {
            wires[x][y][0].refresh();
            wires[x][y][1].refresh();
        }
    }
}

function recSortWire(grupi, wire, x, y, d)
{
    wire.grupi = grupi;
    wireGrups[grupi].push([x, y, d]);

    let contactWire;

    if (d == 0)
        contactWire = [
            [x, y, 1],
            [x, y-1, 1],
            [x-1, y, 0],
            [x+1, y, 1],
            [x+1, y-1, 1],
            [x+1, y, 0]
        ];
    else
        contactWire = [
            [x, y, 0],
            [x-1, y, 0],
            [x, y-1, 1],
            [x, y+1, 0],
            [x-1, y+1, 0],
            [x, y+1, 1]
        ];

    for (let i = 0; i < 6; i++)
    {
        let wirec = getWire(contactWire[i][0], contactWire[i][1], contactWire[i][2]);
        if(wirec.active && wirec.grupi == -1)
            recSortWire(grupi, wirec, contactWire[i][0], contactWire[i][1], contactWire[i][2]);
    }
}

function sortWires()
{
    wireGrups = [];

    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            for (d = 0; d < 2; d++) {
                let wire = getWire(x, y, d);
                if (wire.active)
                {
                    if (wire.grupi == -1)
                    {
                        wireGrups.push([]);
                        recSortWire(wireGrups.length-1, wire, x, y, d);
                    }
                }
            }
        }
    }
}

function refreshPressio()
{
    sortWires();
    
    for (let grupi = 0; grupi < wireGrups.length; grupi++)
    {
        let vpressioFinal = 0;
        for (let wirei = 0; wirei < wireGrups[grupi].length; wirei++)
        {
            vpressioFinal += wires[wireGrups[grupi][wirei][0]][wireGrups[grupi][wirei][1]][wireGrups[grupi][wirei][2]].pressio;
        }
        vpressioFinal /= wireGrups[grupi].length;
        for (let wirei = 0; wirei < wireGrups[grupi].length; wirei++)
        {
            wires[wireGrups[grupi][wirei][0]][wireGrups[grupi][wirei][1]][wireGrups[grupi][wirei][2]].pressio = vpressioFinal;
        }
    }
}

function drawTaulell()
{
    let taulellWidth = width * wireLength;
    let taulellHeight = height * wireLength;
    strokeWeight(1);
    stroke(200, 240, 240);
    for(y = 0; y < height; y++)
        line(0, y*wireLength, taulellWidth, y*wireLength);

    for(x = 0; x < width; x++) {
        strokeWeight(1);
        stroke(200, 240, 240);
        line(x*wireLength, 0, x*wireLength, taulellHeight);
    }
}

function drawWires()
{
    for(x = 0; x < width; x++) {
        for(y = 0; y < height; y++) {
            getWire(x, y, 0).draw(x, y, 0);
            getWire(x, y, 1).draw(x, y, 1);
        }
    }
}


// - fn for Objects -


function DrawObj()
{
    objects.forEach(function(obj) {
        obj.draw();
    })
}

function UpdateBeforeObj()  // Before for set pressio
{
    objects.forEach(function(obj) {
        obj.updateBeforePressio();
    })
}

function UpdateAfterObj()  // After for get pressio
{
    objects.forEach(function(obj) {
        obj.updateAfterPressio();
    })
}

function getObjectIn(x, y, d)
{
    let n = 0;
    let len = objects.length;
    for (let i = 0; i < len; i++) {
        llista = objects[i].espai();
        for (n = 0; n < llista.length; n++)
            if (llista[n][0] == x && llista[n][1] == y && llista[n][2] == d)
                return i;
    }

    return -1;
}

function addObject(obj)
{
    llista = obj.espai();
    for (n = 0; n < llista.length; n++)
        if (getWire(llista[n][0], llista[n][1], llista[n][2]).active)
            return;
    objects.push(obj);
}