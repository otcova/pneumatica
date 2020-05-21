class CilindreD
{
    constructor(x, y) // ori => -1 / 1
    {
        this.x = x;
        this.y = y;
        this.pressioA = 0;
        this.pressioB = 0;
        this.pos = 0; // 0 - 1
    }

    draw()
    {
        this.updateAfterPressio();

        push();
        
        let tx = this.x * wireLength;
        let ty = this.y * wireLength;
        translate(tx, ty);
        
        stroke(0, 200);
        strokeWeight(1);
        
        line(0, 0, 0, wireLength*2.3);
        line(wireLength * 5, 0, wireLength * 5, wireLength*2.3);

        stroke(0, 100);
        strokeWeight(1);
        
        fill(100 - this.pressioA * 50, 200, 200 - this.pressioA * 50);
        rect(0, 0, wireLength * 5 * this.pos, wireLength * 2)
        fill(100 - this.pressioB * 50, 200, 200 - this.pressioB * 50);
        rect(wireLength * 5 * this.pos, 0, wireLength * 5 * (1-this.pos), wireLength * 2)
        
        translate(wireLength * 4 * this.pos, 0);
        fill(240)
        rect(0 + 0.5, wireLength * .75, wireLength * 4, wireLength * 0.5);
        rect(0, 0, wireLength * 1, wireLength * 2);

        pop();
    }
    del() {
        return false;
    }

    updateBeforePressio() {
        setPressio(this.x, this.y + 2, 1, this.pressioA);
        setPressio(this.x + 5, this.y + 2, 1, this.pressioB);
    }
    updateAfterPressio()
    {
        if (getWire(this.x, this.y + 2, 1).active) 
            this.pressioA = getPressio(this.x, this.y + 2, 1);
        if (getWire(this.x + 5, this.y + 2, 1).active) 
            this.pressioB = getPressio(this.x + 5, this.y + 2, 1);
        
        if (abs(this.pressioA - this.pressioB) > 0.01)
        {
            this.pos += (this.pressioA - this.pressioB) / 15.;
            this.pos = min(1, max(0, this.pos));
        }
    }

    espai()
    {
        return [];
    }
}