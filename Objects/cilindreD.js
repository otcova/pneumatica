class Cilindre
{
    constructor(x, y, angle) // angle => 0 / 1 / 2 / 3 (numero de rotacions de 90º)
    {
        this.x = x;
        this.y = y;
        this.angle = angle;

        this.pressioA = 0;
        this.pressioB = 0;
        this.pos = 1;

        this.wireA = new ObjWire(this.angle, this.x, this.y, 0, 2, 1);
        this.wireB = new ObjWire(this.angle, this.x, this.y, 5, 2, 1);
    }

    draw()
    {

        push();
        
        this.wireA.draw();
        this.wireB.draw();

        drawTransforms(this.x, this.y, this.angle);

        print(this.pressioA, this.pressioB);
        stroke(0, 150);
        fill(100 - this.pressioA * 50, 200, 200 - this.pressioA * 50);
        rect(0, 0, 5 * this.pos, 2)
        fill(100 - this.pressioB * 50, 200, 200 - this.pressioB * 50);
        rect(5 * this.pos, 0, 5 * (1-this.pos), 2)

        translate(4 * this.pos, 0);
        fill(230)
        rect(0.5, .75, 4, 0.5);
        rect(0, 0, 1,  2);

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
        for (let x = 0; x < 6; x++)
            for (let y = 0; y < 3; y++) {
                dots[counter] = rotateDots(this.angle, this.x, this.y, x, y);
                counter++;
            }

        dots[counter] = rotateDots(this.angle, this.x, this.y, 6, 1);
        dots[counter+1] = rotateDots(this.angle, this.x, this.y, 7, 1);
        dots[counter+2] = rotateDots(this.angle, this.x, this.y, 8, 1);
        return dots;
    }
    colitionDot(x, y) {
        [x, y] = orbitDots(this.angle, this.x, this.y, x, y);
        if ((x >= this.x && x <= 5 + this.x && y >= this.y && y <= this.y + 2) || y == this.y+1 && x < this.x + 9 && x > this.x)
            return true;
        return false
    }
    colitionLine(x, y, d) {
        if (this.wireA.equal(x, y, d) || this.wireB.equal(x, y, d))
            return false;
        return this.colitionDot(x, y) || this.colitionDot(x + (d == 0? 1 : 0), y + (d == 0? 0 : 1));
    }
}