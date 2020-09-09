let plane;
let scl = 20;
let barrier = [];
let mouse;
let timer;
let d;
var counter = 0;
let check;

function setup() {
    createCanvas(600, 600);
    plane = new Plane();
    frameRate(30);
    pickLocation(); 
    timer = createP('timer');
    setInterval(timeIt, 1000);    
    d = createP('d');
    check = createP('check');
    setInterval(showDist, 100);

}

function draw() {
    background(0, 0, 0);
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    
    text("Click your mouse \nto start the game",300, 300);
    //if (mouse == true) {     
        background(0, 0, 0);
        plane.show();
        fill(96, 96, 96);
        if(keyIsDown(UP_ARROW)){
            plane.move(0,-1);
        }
            if(keyIsDown(DOWN_ARROW)){
            plane.move(0,1);
        }
            if(keyIsDown(RIGHT_ARROW)){
            plane.move(1,0);
        }
            if(keyIsDown(LEFT_ARROW)){
            plane.move(-1,0);
        }
        for (let i = 0; i < 2; i++) {
            rect(barrier[i].x, barrier[i].y, scl, scl);  

            
            barrier[i].y = barrier[i].y + 10;

            if (barrier[i].y > height) {
                let cols = floor(width / scl);
                barrier[i] = createVector(floor(random(cols)), random(-30, 0));
                barrier[i].mult(scl);   
            }  
            
        }  
        if (gameOver() == true)
            {
                noloop();
            }
    // }
}

function pickLocation() {
  let cols = floor(width / scl);
  for (let j = 0; j < 2; j++) {
    barrier[j] = createVector(floor(random(cols)), random(-30, 0));
    barrier[j].mult(scl);         
  }
     
}

function mouseClicked() {
    mouse = true;
}

function timeIt() {
    timer.html('You survice: ' + counter);
    counter++;
}

function showDist() {
    for (let i = 0; i < 2; i++) {
        d.html(0 + ': ' + dist(plane.x, plane.y, barrier[0].x, barrier[0].y) + '\n' + 1 + ': ' + dist(plane.x, plane.y, barrier[1].x, barrier[1].y));
    }
}

function gameOver() {
    for (let i = 0; i < 2; i++) {
        check.html(i);
        if (dist(plane.x, plane.y, barrier[i].x, barrier[i].y) < 1)
            {
                background(0, 0, 0);
                textSize(30);
                fill(255);
                textAlign(CENTER);
                text("You are hit by " + i + "!!!",300, 300);
                return true;
            }
    }
}

function Plane() {
    this.x = 300;
    this.y = 570;
    
    this.move = function (x, y) {
        this.x = this.x + x * scl;
        this.y = this.y + y * scl;
        
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    };
    
    this.death = function (pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            return true;
        }
        else{
            return false;  
        }

    };
    
    this.show = function () {
        fill(255);
        rect(this.x, this.y, scl, scl);
    };
}