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
            noStroke();
            fill(100)
            text(this.pressio.toFixed(1), x*wireLength, (y + (d == 0? 0 : 0.5 )) * wireLength);
        }

    }

    get havePressio() {
        return havePressio(this.pressio);
    }
}