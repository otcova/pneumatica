class Wire
{
    constructor() 
    {
        this.active = false;
        this.pressio = 0;
        this.grupi = -1;
    }

    refresh()
    {
        this.grupi = -1;
    }
    
    draw(x, y, d)
    {
        if (this.active)
        {
            

            if (this.havePressio) { stroke(100, 200, 100); strokeWeight(3); }
            else { stroke(0); strokeWeight(1); }
            
            if(d == 0)
                line(x * wireLength, y * wireLength, 
                    x*wireLength+wireLength-1, y*wireLength);
            else
                line(x * wireLength, y * wireLength, 
                    x*wireLength, y*wireLength + wireLength-1);

            if (mx == x && my == y && md == d) 
            {
                textAlign(CENTER, CENTER);
                textSize(20);
                stroke(255);
                strokeWeight(9);
                fill(100)
                if (d == 0)
                    text(this.pressio.toFixed(1), (x+0.5) * wireLength, y * wireLength);
                else
                    text(this.pressio.toFixed(1), x * wireLength, (y+0.5) * wireLength);

            }
        }

    }

    get havePressio() {
        return havePressio(this.pressio);
    }
}

function drawObjWire(x, y, d, ori)
{
    stroke(0, 230);
    strokeWeight(1);
    if (!getWire(x, y, d).active)
    {
        if (d == 0)
            if (ori == 1)
                line(x*wireLength+1, y*wireLength, (x+.3)*wireLength, y*wireLength);
            else
                line((x+1.)*wireLength-1, y*wireLength, (x+.7)*wireLength, y*wireLength);
        else
            if (ori == 1)
                line(x*wireLength, y*wireLength, x*wireLength, (y+.3)*wireLength);
            else
                line(x*wireLength, (y+1.)*wireLength, x*wireLength, (y+.7)*wireLength);
    }
}