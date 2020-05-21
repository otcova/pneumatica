class Font
{
    constructor(x, y, d, oriantacio) // ori => -1 / 1
    {
        this.x = x;
        this.y = y;
        this.d = d;
        this.ori = oriantacio;
    }

    draw()
    {
        push();
        stroke(0, 150);
        fill(158);
        strokeWeight(1);
        translate(this.x * wireLength, this.y * wireLength);
        
        if (this.d == 1) rotate(HALF_PI);

        if (this.ori == -1) {
            triangle(
                0, 0,
                wireLength*0.8, wireLength/2.1,
                wireLength*0.8, -wireLength/2.1);

            stroke(0, 210);
            strokeWeight(1);
            line(0, 0, -wireLength*0.3, 0);
        }
        else {
            triangle(
                wireLength, 0,
                wireLength*0.2, wireLength/2.1,
                wireLength*0.2, -wireLength/2.1);
            
            stroke(0, 210);
            strokeWeight(1);
            line(wireLength, 0, wireLength*1.3, 0);
        }
        pop();
    }
    del()
    {
        return this.x == mx && this.y == my && this.d == md;
    }
    updateBeforePressio()
    {
        if (this.d == 0) {
            setPressio(this.x + this.ori, this.y, 0, 2);
        }
        else {
            setPressio(this.x, this.y + this.ori, 1, 2);
        }
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