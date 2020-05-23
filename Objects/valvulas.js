class Valvula
{
    constructor(x, y, type, angle) // type = "pressio" / "lever"
    {
        this.type = type;
        
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.pressioA = 0;
        this.pressioB = this.type == "lever"? 1 : 0;
        this.pos = this.type == "lever"? 1 : 0; // 0 - 1

        this.pressio = [-1, -1, -1]; // Out0, In0, In1

        this.wires = [];

        this.wires.push(new ObjWire(angle, x, y, 0, 0, 3));  //Out0
        this.wires.push(new ObjWire(angle, x, y, 0, 2, 1));  //In0 
        this.wires.push(new ObjWire(angle, x, y, 1, 2, 1));  //In1 
        if (this.type == "pressio") {
            this.wires.push(new ObjWire(angle, x, y, -2, 1, 2));
            this.wires.push(new ObjWire(angle, x, y, 3, 1, 0));
        }

        this.dotPosALever = rotateDots(angle, x, y, -2, 1);
        this.dotPosBLever = rotateDots(angle, x, y, -3, 1);
    }

    draw()
    {
        //Move
        this.pos += (this.pressioB - this.pressioA) / 4.;
        this.pos = min(1, max(0, this.pos));
        
        for (let i = 0; i < this.wires.length; i++)
            this.wires[i].draw();

        push();
        drawTransforms(this.x, this.y, this.angle);
        
        if (this.type == "pressio") 
        {
            if(havePressio(this.pressioA)) { stroke(100, 200, 100); drawSetWeight(3); }
            else { stroke(0, 230); drawSetWeight(1); }
            line(-2, 1, 0, 1);
            
            if(havePressio(this.pressioB)) { stroke(100, 200, 100); drawSetWeight(3); }
            else { stroke(0, 230); drawSetWeight(1); }
            line(3, 1, 0, 1);
        }
        else if (this.type == "lever") 
        {
            fill(255);
            stroke(0, 200);

            if (((wmx == this.dotPosALever[0] && wmy == this.dotPosALever[1]) || 
                (wmx == this.dotPosBLever[0] && wmy == this.dotPosBLever[1])) && mouseIsReleased)
                this.pressioA = 2 - this.pressioA;

            //interuptor
            beginShape();
            vertex(this.pressioA < 1? -2.5 : -2.75, 0.7);
            vertex(0, 0.7);
            vertex(0, 1.3);
            vertex(this.pressioA < 1? -2.7 : -2.6, 1.3);
            endShape();
            if(this.pressioA < 1) {
                line(-2.5, 0.7, -2.8, 1.55);
                ellipse(-2.45, 0.55, 0.35, 0.35);
            }
            else {
                line(-2.8, 0.7, -2.5, 1.55);
                ellipse(-2.85, 0.58, 0.35, 0.35);
            }

            drawMotlla(2, this.pos, 3.4,  0.5,  1.5);
        }

        drawSetWeight(1);
        stroke(0, 200);
        fill(255);
        translate(this.pos*-2, 0);
        rect(-0.2, 0, 3.4, 2);

        ////

        drawTope(0, 2);
        drawTope(3, 2);
        line(1.5, 0, 1.5, 2);
        
        drawArrow(1, 2, 0, 0);
        drawArrow(2, 2, 2, 0);

        pop();
    }

    updateBeforePressio() 
    {
        if (this.pressio[0] != -1)
        {
            if (this.pos > 0.5) {
                if (this.pressio[1] != -1) {
                    let p = (this.pressio[0] + this.pressio[1]) / 2.;
                    
                    this.wires[0].setPressio(p);
                    this.wires[1].setPressio(p);
                }
            }
            else if (this.pressio[2] != -1) {
                let p = (this.pressio[0] + this.pressio[2]) / 2.;
                this.wires[0].setPressio(p);
                this.wires[2].setPressio(p);
            }
        }
    }
    updateAfterPressio()
    {
        if (this.type == "pressio") {
            this.pressioA = this.wires[3].pressio;
            this.pressioB = this.wires[4].pressio;
        }
        for (let i = 0; i < 3; i++) {
            if (!this.wires[i].active) this.pressio[i] = -1;
            else this.pressio[i] = this.wires[i].pressio;
        }
    }

    espaiDots() {
        let dots = [6*3];
        let counter = 0;
        for (let x = -2; x < 4; x++)
            for (let y = 0; y < 3; y++) {
                dots[counter] = rotateDots(this.angle, this.x, this.y, x, y);
                counter++;
            }
        return dots;
    }
    colitionDot(x, y) {
        [x, y] = orbitDots(this.angle, this.x, this.y, x, y);
        if (x > -3+this.x && x < 4+this.x && y >= 0+this.y && y < 3+this.y)
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