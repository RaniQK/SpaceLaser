let floatings;
let numFloats = 5;
let floats = [];
let x = 0.0;
let y = 0.0;
let timer = 60
let ropef
let gameState = "L0"
let levelOne
let itemOneArr = [];
let catchCount = 0;
let lives = []
let targeScore = 10 //start with 10
let gamePage
let treats = []
let badTreats = []


function preload() {
  sc = loadImage('asset/sc.png')
  live = loadImage('asset/lives.png')

  item1 = loadImage('items/11.png')
  item2 = loadImage('items/22.png')
  item3 = loadImage('items/33.png')
  item4 = loadImage('items/44.png')
  item5 = loadImage('items/55.png')
  item6 = loadImage('items/66.png')
  item7 = loadImage('items/77.png')
  item8 = loadImage('items/88.png')
  item9 = loadImage('items/99.png')

  badItem1 = loadImage('badItems/1.png')
  badItem2 = loadImage('badItems/3.png')
  badItem3 = loadImage('badItems/4.png')
  badItem4 = loadImage('badItems/6.png')
  badItem5 = loadImage('badItems/7.png')
  badItem6 = loadImage('badItems/8.png')
  badItem7 = loadImage('badItems/9.png')

  startPage = loadImage('asset/startPage.jpg') //L0 show this
  gamePage = loadImage('asset/gamePage.png') //L1 show this
  endPage = loadImage('asset/endPage.jpg') //L2 show this
}

function setup() {
  createCanvas(700, 600);

  startButton = new Clickable();
  restartButton = new Clickable();


  treats = [item1, item2, item3, item4, item5, item6, item7, item8, item9]
  badTreats = [badItem1, badItem2, badItem3, badItem4, badItem5, badItem6, badItem7]

  //floatings = new Floatings();
  levelOne = new LevelOne()
  rope = new Rope()
}

function draw() {
  background(220);
  image(gamePage, 0, 0, 700, 600)
  rope.show()
  spaceCraft()
  targetPointUpdate()

  

  if (gameState == "L0") { //first UI, welcome page
    start() //welcome Page

    startButton.draw()
    startButton.resize(90, 60);
    startButton.textSize = 25
    startButton.text = "Start"
    startButton.locate(280, 310);
    startButton.strokeWeight = 4;
    startButton.stroke = "#3b3939"; 
    
    startButton.onPress = function () {
      this.color = "#AAAAFF";
      
    }
    startButton.onHover = function () {
      this.color = "#fae17d"
    }
    startButton.onRelease = function () {
      gameState = "L1"
    }

  }

  if (gameState == "L1") {
    for (let i = 0; i < 3; i++) {
      itemOneArr.push(new LevelOne());
      itemOneArr[i].move(); //move items
      itemOneArr[i].display();
      console.log(itemOneArr[i].x);
      console.log(rope.pos_x);
      if (rope.pos_x + 59 > itemOneArr[i].x
        && rope.pos_x < itemOneArr[i].x
        && rope.pos_y + 46 > itemOneArr[i].y
        && rope.pos_y < itemOneArr[i].y
      ) { //if the bottom of the line and the item overlap 59和45因为饼干的长宽是59 45
        //console.log(itemOneArr[i].x);
        itemOneArr.splice(i, 1); //makes the flying item 'disappear'
        catchCount++;

        //console.log(catchCount)
      }
      fill(0, 102, 153);
      textSize(32);
      // text('Count: '+ catchCount + ' /',30,50) 
      // text('Count: '+ catchCount + ' /'+ targetScore,30,50) 
    }
  }

  //     if (gameState == "L2") {
  //         endPage()
  //       restartButton.draw()
  //        restartButton.resize(90, 60);
  //        restartButton.textSize = 25
  //        restartButton.text = "Again!"
  //        restartButton.locate(280, 320);
  //        restartButton.strokeWeight = 4;
  //        restartButton.stroke = "#3b3939"; 
  //        restartButton.onPress = function(){  
  //        this.color = "#AAAAFF"; 
  //        gameState == "L0"              
  // }
  //        restartButton.onHover = function () {  
  //        this.color = "#fae17d"        
  //   }
  //        startButton.onRelease = function () {
  //        gameState = "L0"
  // }
  //   } 

}


class Rope {

  constructor() {
    // suppose that center of the canvas is (400, 300)
    this.pos_x = 400;
    this.pos_y = 300;
    this.state = 0
    this.length = 0
    //1.length of rope has to do with the state per frame
    //2.angle of the rope has to do with mouse's x and y. does not change during states

  }

  show() {
    push()
    let max_length
    let new_x
    let new_y

    if (this.state == 0) {
      // line(400,300,401,301) //center of spacecraft
    } else if (this.state == 1) {
      max_length = sqrt((this.pos_x - 400) * (this.pos_x - 400) + (this.pos_y - 300) * (this.pos_y - 300))
      new_x = round(this.length * (this.pos_x - 400) / max_length + 400)
      new_y = round(this.length * (this.pos_y - 300) / max_length + 300)
      strokeWeight(3)
      stroke('red')
      line(400, 300, new_x, new_y)
      this.length += 6
      if (this.length > max_length) {
        this.state = 2
      }
    } else if (this.state == 2) {
      max_length = sqrt((this.pos_x - 400) * (this.pos_x - 400) + (this.pos_y - 300) * (this.pos_y - 300))
      new_x = round(this.length * (this.pos_x - 400) / max_length + 400)
      new_y = round(this.length * (this.pos_y - 300) / max_length + 300)
      strokeWeight(3)
      stroke('red')
      line(400, 300, new_x, new_y)

      this.length -= 6
      if (this.length < 1) // set to 1, not 0
      {
        this.state = 0
        this.length = 0
      }
    }
    pop()
  }
}

function mousePressed() {

  if (mouseButton === LEFT) {
    strokeWeight(3)
    stroke('black')


    rope.pos_x = mouseX
    rope.pos_y = mouseY
    image(item2, rope.pos_x, rope.pos_y, 50, 50)

    rope.state = 1
  }
}

function start() {
  image(startPage, 0, 0, 700, 600)
}
//----------------------------------------------
function endPage() {
  image(endPage, 0, 0, 700, 600)
}

// //----------------------------------------------
// function keyPressed() { //using p5clickables
//   push()
//     if (keyCode == 83 && gameState == 'L0') {
//         gameState = 'L1'
//       image(startPage, 0, 0, 700, 600)
//     }
//     if (keyCode == 82 && gameState == 'L2' && !isLooping()) {//r
//         gameState = 'L0'
//         resetData()
//         loop()
//     }
//     pop()
// }


function resetData() {
  //to start game again
}