class Font
{
    constructor(x, y, angle, iconSize) // ori => -1 / 1
    {
        this.x = x;
        this.y = y;
        this.angle = angle;
        
        if (iconSize == undefined) this.wire = new ObjWire(angle, x, y, 0, 0, 0);
        else {
            this.iconSize = iconSize;
            this.x += .8 * this.iconSize;
        }
    }

    draw()
    {
        if (this.iconSize == undefined) this.wire.draw();
        
        push();
        drawTransforms(this.x, this.y, this.angle);
        if (this.iconSize != undefined) scale(this.iconSize);

        stroke(0, 230);
        fill(255);
        triangle(-0.26, 0,
                -1.1, 0.5,
                -1.1, -0.5);
        
        ellipse(-0.1, 0, 0.33, 0.33);
        pop();
    }

    updateBeforePressio() {
        this.wire.setPressio(2);
    }
    updateAfterPressio() {}

    espaiDots()
    {
        return [rotateDots(this.angle, this.x, this.y, 0, 0), rotateDots(this.angle, this.x, this.y, -1, 0)]
    }
    colitionDot(x, y) {
        [x, y] = orbitDots(this.angle, this.x, this.y, x, y);
        if ((x == this.x && y == this.y) || (x == this.x-1 && y == this.y))
            return true;
        return false;
    }
    colitionLine(x, y, d) {
        if (this.wire.equal(x, y, d))
            return false;
        return this.colitionDot(x, y) || this.colitionDot(x + (d == 0? 1 : 0), y + (d == 0? 0 : 1));
    }
}