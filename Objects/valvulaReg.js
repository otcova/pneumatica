class ValvulaReg
{
    constructor(x, y, angle, iconSize)
    {
        this.x = x;
        this.y = y;
        this.angle = (3+angle)%4;
        this.pressioA = 0;
        this.pressioB = 0;
        if (iconSize == undefined) {
            this.wireA = new ObjWire(this.angle, this.x, this.y, -1, 0, 2);
            this.wireB = new ObjWire(this.angle, this.x, this.y, 1, 0, 0);
        }
        else
            this.iconSize = iconSize / 1.5;
    }

    draw()
    {
        if (this.iconSize == undefined) {
            this.wireA.draw();
            this.wireB.draw();
        }
        push();
        drawTransforms(this.x, this.y, this.angle);
        if (this.iconSize != undefined) scale(this.iconSize);
        
        stroke(0);
        fill(255);

        rect(-1, -1, 2, 2);
        noFill()
        arc(0, -1, 1.7, 1.7, QUARTER_PI, PI - QUARTER_PI, OPEN);
        arc(0, 1, 1.7, 1.7, PI + QUARTER_PI, TWO_PI - QUARTER_PI, OPEN);
        drawArrow(-1, 0, 1, 0);

        pop();
    }
    updateBeforePressio()
    {
        this.wireB.setPressio(this.pressio / 2.);
    }
    updateAfterPressio() 
    {
        this.pressio = this.wireA.pressio;
    }

    espaiDots() {
        let dots = [3*3];
        let counter = 0;
        for (let x = -1; x < 2; x++)
            for (let y = -1; y < 2; y++) {
                dots[counter] = rotateDots(this.angle, this.x, this.y, x, y);
                counter++;
            }
        return dots;
    }
    colitionDot(x, y)
    {
        [x, y] = orbitDots(this.angle, this.x, this.y, x, y);
        if (x >= this.x-1 && x <= 1 + this.x && y >= this.y-1 && y <= this.y + 1)
            return true;
        return false
    }
    colitionLine(x, y, d) {
        if (this.wireA.equal(x, y, d) || this.wireB.equal(x, y, d))
            return false;
            return this.colitionDot(x, y) || this.colitionDot(x + (d == 0? 1 : 0), y + (d == 0? 0 : 1));
    }
}