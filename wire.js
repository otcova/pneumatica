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


class ObjWire
{
    constructor(angle, cx, cy, x, y, wangle) // angle => 0 / 1 / 2 / 3 (numero de rotacions de 90º)
    {
        let mem;
        for(let i = 0; i < angle; i++) {
            mem = x;
            x = -y;
            y = mem;
            d = 1-d;
        }
        wangle = (wangle + angle) % 4;        
        this.x = x + cx + (wangle == 2? -1 : 0);
        this.y = y + cy + (wangle == 3? -1 : 0);
        this.d = wangle % 2;
        this.ori = wangle > 1? 0 : 1;
    }

    draw()
    {
        stroke(0, 230);
        strokeWeight(1);
        if (!getWire(this.x, this.y, this.d).active)
        {
            if (this.d == 0)
                if (this.ori == 1)
                    line(this.x*wireLength+1, this.y*wireLength, (this.x+.3)*wireLength, this.y*wireLength);
                else
                    line((this.x+1.)*wireLength-1, this.y*wireLength, (this.x+.7)*wireLength, this.y*wireLength);
            else
                if (this.ori == 1)
                    line(this.x*wireLength, this.y*wireLength, this.x*wireLength, (this.y+.3)*wireLength);
                else
                    line(this.x*wireLength, (this.y+1.)*wireLength, this.x*wireLength, (this.y+.7)*wireLength);
        }
    }

    setPressio(p)
    {
        setPressio(this.x, this.y, this.d, p);
    }

    equal(x, y, d) {
        return this.x == x && this.y == y && this.d == d;
    }

    get active() {
        return getWire(this.x, this.y, this.d).active;
    }
    get pressio() {
        return getPressio(this.x, this.y, this.d);
    }
}