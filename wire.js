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