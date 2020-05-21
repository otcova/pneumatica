class Terra
{
    constructor(x, y, d, oriantacio, insert = true) // ori => -1 / 1
    {
        this.x = x;
        this.y = y;
        this.d = d;
        this.ori = oriantacio;
    }

    draw()
    {
        push();

        stroke(0, 190);
        fill(255);
        strokeWeight(1);
        translate(this.x * wireLength, this.y * wireLength);
        if (this.d == 1) rotate(HALF_PI);

        if (this.ori == 1) {
            triangle(
                wireLength*0.4, 0,
                wireLength, wireLength/2.1,
                wireLength, -wireLength/2.1);
            stroke(0, 210);
            strokeWeight(1);
            line(wireLength, 0, wireLength*1.3, 0);
        }
        else {
            triangle(
                wireLength*0.6, 0,
                0, wireLength/2.1,
                0, -wireLength/2.1);
            
            stroke(0, 210);
            strokeWeight(1);
            line(0, 0, -wireLength*0.3, 0);
        }

        pop();
    }

    updateBeforePressio()
    {
        if (this.d == 0) {
            setPressio(this.x + this.ori, this.y, 0, 0);
        }
        else {
            setPressio(this.x, this.y + this.ori, 1, 0);
        }
    }

    del()
    {
        return this.x == mx && this.y == my && this.d == md;
    }

    espai()
    {
        if (this.ori == -1) {
            if (this.d == 0) return [[this.x, this.y, 0], [this.x, this.y, 1], [this.x, this.y-1, 1]];
            else return [[this.x, this.y, 1], [this.x, this.y, 0], [this.x-1, this.y, 0]];
        }
        else {
            if (this.d == 0) return [[this.x, this.y, 0], [this.x+1, this.y, 1], [this.x+1, this.y-1, 1]];
            else return [[this.x, this.y, 1], [this.x, this.y+1, 0], [this.x-1, this.y+1, 0]];
        }
    }
}