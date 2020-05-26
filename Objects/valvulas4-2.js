class Valvula4
{
    constructor(x, y, type, angle, iconSize) // type = "pressio" / "lever"
    {
        this.type = type;
        
        this.x = x;
        this.y = y;
        this.angle = angle;
        //this.pressio[3] = 0;
        //this.pressio[4] = this.type == "lever"? 1 : 0;
        this.pos = type == "lever"? 1 : 0; // 0 - 1
        print(x, y, type, angle, iconSize);
        this.pressio = [-1, -1, -1, -1, type == "lever"? 0 : -1, type == "lever"? 1 : -1]; // Out0, In0, In1

        
        if (iconSize != undefined)
        {
            this.iconSize = iconSize / 2.2;
        }

        this.wires = [];
        this.wires.push(new ObjWire(angle, x, y, 0, -1, 3, this.iconSize));  //Out0
        this.wires.push(new ObjWire(angle, x, y, 1, -1, 3, this.iconSize));  //Out1
        this.wires.push(new ObjWire(angle, x, y, 0, 1, 1, this.iconSize));  //In0 
        this.wires.push(new ObjWire(angle, x, y, 1, 1, 1, this.iconSize));  //In1 
        if (this.type == "pressio") {
            this.wires.push(new ObjWire(angle, x, y, -2, 0, 2, this.iconSize));
            this.wires.push(new ObjWire(angle, x, y, 3, 0, 0, this.iconSize));
        }
        
        this.dotPosALever = rotateDots(angle, x, y, -2, 0);
        this.dotPosBLever = rotateDots(angle, x, y, -3, 0);
    }

    draw()
    {
        push();

        if (this.iconSize == undefined)
        {
            //Move
            if (this.pressio[4] + this.pressio[5] > -1)
            {
                this.pos += (this.pressio[5] - this.pressio[4]) / 7.;
                this.pos = min(1, max(0, this.pos));
            }

        }
        for (let i = 0; i < this.wires.length; i++)
            this.wires[i].draw();

        drawTransforms(this.x, this.y, this.angle);
        if (this.iconSize != undefined) scale(this.iconSize);

        if (this.type == "pressio") 
        {
            if (this.pressio[4] == -1) {
                stroke(50, 255);
                drawSetWeight(this.iconSize == undefined? 1. : 2.);
            }
            else {
                colorStrokePressio(this.pressio[4])
                drawSetWeight(2);
            }
            line(-2, 0, 0, 0);
            
            if (this.pressio[5] == -1) {
                stroke(50, 255);
                drawSetWeight(this.iconSize == undefined? 1. : 2.);
            }
            else {
                colorStrokePressio(this.pressio[5])
                drawSetWeight(2);
            }
            line(3, 0, 0, 0);
        }
        else if (this.type == "lever") 
        {
            fill(255);
            stroke(0, 200);

            if (((wmx == this.dotPosALever[0] && wmy == this.dotPosALever[1]) || 
                (wmx == this.dotPosBLever[0] && wmy == this.dotPosBLever[1])))
                {
                    mouseIsPressed = false;
                    if (mouseIsReleased) {
                        this.pressio[4] = 3 - this.pressio[4];
                        mouseIsReleased = false;
                    }
                }
            //interuptor
            beginShape();
            vertex(this.pressio[4] < 1? -2.5 : -2.75, -.3);
            vertex(0, -.3);
            vertex(0, .3);
            vertex(this.pressio[4] < 1? -2.7 : -2.6, .3);
            endShape();
            if(this.pressio[4] < 1) {
                line(-2.5, -0.3, -2.8, .55);
                ellipse(-2.45, -0.45, 0.35, .35);
            }
            else {
                line(-2.8, -0.3, -2.5, .55);
                ellipse(-2.85, -0.42, 0.35, 0.35);
            }

            drawMotlla(2, this.pos, 3.8,  -.5,  .5);
        }

        drawSetWeight(1);
        stroke(0, 200);
        fill(255);
        translate(this.pos*-2, 0);
        rect(-0.3, -1, 3.8, 2);

        ////

        //drawTope(0, 1);
        //drawTope(3, 1);
        line(1.5, -1, 1.5, 1);
        
        drawArrow(0, -1, 1, 1);
        drawArrow(1, -1, 0, 1);

        drawArrow(2, 1, 2, -1);
        drawArrow(3, -1, 3, 1);

        pop();
    }

    updateBeforePressio() 
    {
        if (this.pressio[0] != -1)
        {
            if (this.pos > 0.5) {
                if (this.pressio[2] != -1 && this.pressio[0] < this.pressio[2]) {
                    let p = (this.pressio[0] + this.pressio[2]) / 2.;
                    this.wires[0].setPressio(p);
                    this.wires[2].setPressio(p);
                }
            }
            else if (this.pressio[3] != -1 && this.pressio[0] > this.pressio[3]) {
                let p = (this.pressio[0] + this.pressio[3]) / 2.;
                this.wires[0].setPressio(p);
                this.wires[3].setPressio(p);
            }
        }
        if (this.pressio[1] != -1)
        {
            if (this.pos > 0.5) {
                if (this.pressio[3] != -1 && this.pressio[1] > this.pressio[3]) {
                    let p = (this.pressio[1] + this.pressio[3]) / 2.;
                    this.wires[1].setPressio(p);
                    this.wires[3].setPressio(p);
                }
            }
            else if (this.pressio[2] != -1 && this.pressio[1] > this.pressio[2]) {
                let p = (this.pressio[1] + this.pressio[2]) / 2.;
                this.wires[1].setPressio(p);
                this.wires[2].setPressio(p);
            }
        }
    }
    updateAfterPressio()
    {
        for (let i = 0; i < this.wires.length; i++) {
            if (!this.wires[i].active) this.pressio[i] = -1;
            else this.pressio[i] = this.wires[i].pressio;
        }
    }

    espaiDots() {
        let dots = [6*3];
        let counter = 0;
        for (let x = -2; x < 4; x++)
            for (let y = -1; y < 2; y++) {
                dots[counter] = rotateDots(this.angle, this.x, this.y, x, y);
                counter++;
            }
        return dots;
    }
    colitionDot(x, y) {
        [x, y] = orbitDots(this.angle, this.x, this.y, x, y);
        if (x > -3+this.x && x < 4+this.x && y >= -1+this.y && y < 2+this.y)
            return true;
        return false
    }
    colitionLine(x, y, d) {
        for (let i = 0; i < this.wires.length; i++) {
            if (this.wires[i].equal(x, y, d)){
                return false;
            }
        }
        return this.colitionDot(x, y) || this.colitionDot(x + (d == 0? 1 : 0), y + (d == 0? 0 : 1));
    }
}