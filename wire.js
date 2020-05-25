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
            colorStrokePressio(this.pressio);

            if(d == 0)
                line(x * wireLength, y * wireLength, 
                    x*wireLength+wireLength-1, y*wireLength);
            else
                line(x * wireLength, y * wireLength, 
                    x*wireLength, y*wireLength + wireLength-1);

            if (mx == x && my == y && md == d) 
            {
                textAlign(CENTER, CENTER);
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
}

class ObjWire
{
    constructor(angle, cx, cy, x, y, wangle, iconScale) // angle => 0 / 1 / 2 / 3 (numero de rotacions de 90º)
    {
        let mem;
        if (iconScale != undefined)
        {
            this.iconScale = iconScale;
            x *= iconScale;
            y *= iconScale;
        }
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
        stroke(50);
        strokeWeight(1.);
        let divuixar = true;
        let s = wireLength; // scale
        let is = 1; // icon scale
        if (this.iconScale == undefined)
            divuixar = !getWire(this.x, this.y, this.d).active;
        else
            is = this.iconScale;

        if (divuixar)
        {
            if (this.d == 0)
                if (this.ori == 1)
                    line(this.x*s+1, this.y*s, (this.x+.3*is)*s, this.y*s);
                else
                    line((this.x+1.)*s-1, this.y*s, (this.x+1.-is*.3)*s, this.y*s);
            else
                if (this.ori == 1)
                    line(this.x*s, this.y*s, this.x*s, (this.y+.3*is)*s);
                else
                    line(this.x*s, (this.y+1.)*s, this.x*s, (this.y+1.-is*.3)*s);
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