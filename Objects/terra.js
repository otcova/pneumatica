class Terra
{
    constructor(x, y, angle, iconSize) // ori => -1 / 1
    {
        this.x = x;
        this.y = y;
        this.angle = angle;

        this.wire = new ObjWire(angle, x, y, 0, 0, 3, iconSize);
        
        if (iconSize != undefined) {
            this.iconSize = iconSize;
            this.y -= .1 * this.iconSize;
        }
    }

    draw()
    {
        this.wire.draw();
        
        push();
        drawTransforms(this.x, this.y, this.angle);
        if (this.iconSize != undefined) scale(this.iconSize);
        
        stroke(0, 230);
        fill(255);
        triangle(0, 0.5,
                -0.5, 0,
                0.5, 0);
        pop();
    }

    updateBeforePressio() {
        this.wire.setPressio(minimaPressio);
    }
    updateAfterPressio() {}

    espaiDots()
    {
        return [[this.x, this.y]]
    }
    colitionDot(x, y) {
        if (x == this.x && y == this.y)
            return true;
        return false;
    }
    colitionLine(x, y, d) {
        if (this.wire.equal(x, y, d))
            return false;
        return this.colitionDot(x, y) || this.colitionDot(x + (d == 0? 1 : 0), y + (d == 0? 0 : 1));
    }
}