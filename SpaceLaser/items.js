
let targetScore = []
//let targetScore = 2
function targetPointUpdate(){
  noStroke()
  fill('white')
  textSize(27)
  targetScore = [2,20,35,40,55,70,85,100,120,130,145,180]
  // for(var i = 0; i <100 ; i++){
  //   targetScore = targetScore + 2
  // } 

  //to show score. catchCount defined in sketch.js

    
  for(var j = 0; j<11; j++){
text('Score: '+ catchCount + ' / '+ targetScore[0],100,50) 
    if(catchCount === targetScore[j]){
      targetScore[j] += 15
    }
 }
  
  
}

function updateItems(){//assign score to each item

}

function updateLives(){

  lives = [image(live,540,30,40,40),
           image(live,580,30,40,40),
           image(live,620,30,40,40)] //draw three hearts
  


}
function itemAnimation(){

}//implement this last. icing on the cake
