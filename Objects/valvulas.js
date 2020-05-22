class Valvula
{
    constructor(x, y) // ori => -1 / 1
    {
        this.x = x;
        this.y = y;
        this.pressioA = 0;
        this.pressioB = 0;
        this.pos = 0; // 0 - 1

        this.pressioIn0 = 0;
        this.pressioIn1 = 0;
    }

    draw()
    {
        //Move
        this.pos += (this.pressioB - this.pressioA) / 2.;
        this.pos = min(1, max(0, this.pos));
        
        drawObjWire(this.x, this.y-1, 1, -1);
        drawObjWire(this.x, this.y+2, 1, 1);
        drawObjWire(this.x+1, this.y+2, 1, 1);

        drawObjWire(this.x-3, this.y+1, 0, -1);
        drawObjWire(this.x+3, this.y+1, 0, 1);
        
        push();
        strokeWeight(1);
        translate(this.x*wireLength, this.y*wireLength);
        
        if(havePressio(this.pressioA)) { stroke(100, 200, 100); strokeWeight(3); }
        else { stroke(0, 230); strokeWeight(1); }
        line(wireLength*-2, wireLength, 0, wireLength);
        if(havePressio(this.pressioB)) { stroke(100, 200, 100); strokeWeight(3); }
        else { stroke(0, 230); strokeWeight(1); }
        line(wireLength*3, wireLength, 0, wireLength);
        
        strokeWeight(1);
        stroke(0, 200);
        fill(255);
        translate(this.pos*-2*wireLength, 0);
        rect(-0.2*wireLength, 0, 3.4*wireLength, 2*wireLength);

        ////

        this.drawTope(0, 2*wireLength);
        this.drawTope(3*wireLength, 2*wireLength);
        //line(0, 0, wireLength, 2*wireLength);
        line(1.5*wireLength, 0, 1.5*wireLength, 2*wireLength);
        
        this.drawArrow(wireLength, 2*wireLength, 0, 0);
        this.drawArrow(2*wireLength, 2*wireLength, 2*wireLength, 0);

        pop();
    }

    drawTope(x, y)
    {
        let top = y - wireLength * 0.3;
        line(x, y, x, top);
        line(x - wireLength * 0.2, top, x + wireLength * 0.2, top);
    }
    drawArrow(ax, ay, bx, by)
    {
        push();
        
        stroke(0);
        line(ax, ay, bx, by);
        noStroke(0);
        fill(100);
        translate(bx, by);
        rotate(atan2(by - ay, bx - ax));
        scale(wireLength*0.15);
        triangle(0, 0, -2, 1, -2, -1);
        
        pop();
    }

    del() {
        if (wmx >= this.x && wmx <= 3 + this.x && wmy >= this.y && wmy <= this.y + 2)
            return true;
        return false
    }

    updateBeforePressio() 
    {
        if (this.pos > 0.5)
            setPressio(this.x, this.y - 1, 1, this.pressioIn0);
        else
            setPressio(this.x, this.y - 1, 1, this.pressioIn1);
    }
    updateAfterPressio()
    {
        this.pressioA = getPressio(this.x-3, this.y + 1, 0);
        this.pressioB = getPressio(this.x + 3, this.y + 1, 0);

        this.pressioIn0 = getPressio(this.x, this.y + 2, 1);
        this.pressioIn1 = getPressio(this.x + 1, this.y + 2, 1);
    }

    espai()
    {
        return [[this.x-2, this.y+1, 0], [this.x-1, this.y+1, 0], [this.x, this.y+1, 0],  [this.x+1, this.y+1, 0],  [this.x+2, this.y+1, 0]];
    }
}