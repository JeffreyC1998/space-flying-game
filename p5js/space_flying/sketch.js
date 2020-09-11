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
    frameRate(60);
    pickLocation(); 
    timer = createP('timer');
    setInterval(timeIt, 1000);    

}

function draw() {
    background(0, 0, 0);
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    
    text("Click your mouse \nto start the game",300, 300);
    if (mouse == true) {     
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
        for (let i = 0; i < 15; i++) {
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
     }
}

function pickLocation() {
  let cols = floor(width / scl);
  for (let j = 0; j < 15; j++) {
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

function gameOver() {
    for (let i = 0; i < 15; i++) {
        if (dist(plane.x, plane.y, barrier[i].x, barrier[i].y) < 20)
            {
                background(0, 0, 0);
                textSize(30);
                fill(255);
                textAlign(CENTER);
                text("You survive " + counter + "s!!!",300, 300);
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
    
    this.show = function () {
        fill(255);
        rect(this.x, this.y, scl, scl);
    };
}
