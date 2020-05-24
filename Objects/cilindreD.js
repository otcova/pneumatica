class Cilindre
{
    constructor(x, y, angle, iconSize) // angle => 0 / 1 / 2 / 3 (numero de rotacions de 90º)
    {
        this.x = x;
        this.y = y;
        this.angle = angle;

        this.pos = 1;
        this.pressioA = 0;
        this.pressioB = 0;

        if (iconSize == undefined)
        {
            this.wireA = new ObjWire(this.angle, this.x, this.y, -3, 1, 1);
            this.wireB = new ObjWire(this.angle, this.x, this.y, 2, 1, 1);
        }
        else
        {
            this.iconSize = iconSize /2.;
            this.pos = .3;
            this.pressioA = 1.5;
            this.pressioB = 1;
        }
    }

    draw()
    {
        
        push();
        
        if (this.iconSize == undefined)
        {
            this.pos = min(1, max(0, this.pos + (this.pressioA - this.pressioB)/10));
            this.wireA.draw();
            this.wireB.draw();
        }
        
        drawTransforms(this.x, this.y, this.angle);
        
        if (this.iconSize != undefined)
            scale(this.iconSize);

        //fill(100 - this.pressioA * 50, 200, 200 - this.pressioA * 50);
        colorPressio(this.pressioA);
        stroke(0, 150);
        rect(-3, -1, 5 * this.pos, 2)
        colorPressio(this.pressioB);
        stroke(0, 150);
        //fill(100 - this.pressioB * 50, 200, 200 - this.pressioB * 50);
        rect(5 * this.pos - 3, -1, 5 * (1-this.pos), 2)

        translate(4 * this.pos, 0);
        fill(230)
        rect(-2.5, -.25, 4, 0.5);
        rect(-3, -1, 1,  2);

        pop();
    }

    updateBeforePressio() {
        this.wireA.setPressio(this.pressioA);
        this.wireB.setPressio(this.pressioB);
    }
    updateAfterPressio() {
        if (this.wireA.active) this.pressioA = this.wireA.pressio;
        if (this.wireB.active) this.pressioB = this.wireB.pressio;
    }

    espaiDots() {
        let dots = [6*3+3];
        let counter = 0;
        for (let x = -3; x < 3; x++)
            for (let y = -1; y < 2; y++) {
                dots[counter] = rotateDots(this.angle, this.x, this.y, x, y);
                counter++;
            }

        dots[counter] = rotateDots(this.angle, this.x, this.y, 3, 0);
        dots[counter+1] = rotateDots(this.angle, this.x, this.y, 4, 0);
        dots[counter+2] = rotateDots(this.angle, this.x, this.y, 5, 0);
        return dots;
    }
    colitionDot(x, y) {
        [x, y] = orbitDots(this.angle, this.x, this.y, x, y);
        x -= this.x; y -= this.y;
        if ((x >= -3 && x <= 2 && y >= -1 && y <= 1) || (y == 0 && x < 6 && x > 0))
            return true;
        return false
    }
    colitionLine(x, y, d) {
        if (this.wireA.equal(x, y, d) || this.wireB.equal(x, y, d))
            return false;
        return this.colitionDot(x, y) || this.colitionDot(x + (d == 0? 1 : 0), y + (d == 0? 0 : 1));
    }
}