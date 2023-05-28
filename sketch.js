var stroke_colors = "0a2340-00626b-149a67-ffb523-ad0051-faf9f9-cccccc".split("-").map(a=>"#"+a)
var fill_colors = "fadde1-ffc4d6-ffa6c1-ff87ab-ff5d8f-ff97b7-ffacc5-ffcad4-f4acb7".split("-").map(a=>"#"+a)
var fill_colors_2 = "f08080-f4978e-f8ad9d-fbc4ab-ffdab9".split("-").map(a=>"#"+a)
function preload(){  //最早執行的程式碼
  elephant_sound = loadSound("sound/gong.mp3")
  bullet_sound = loadSound("sound/Launching wire.wav")
  

}

var ball  //大象物件，代表單一個物件，利用這個變數來做正在處理的物件
var balls =[]  //陣列，放所有的物件資料，物件倉庫，裡面儲存所有的物件資料
var bullet  //飛彈物件
var bullets=[]
var monster   //怪物物件
var monsters=[]
var score = 0
var shipP   //設定砲台的位置



function setup() {  //設定大象物件倉庫內的資料
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台的位置為視窗的中間(使用向量座標)
  //產生幾個物件
  for(var j=0;j<10;j=j+1)
  {
    ball = new Obj({})  //產生一個新的物件，"暫時"放入到ball變數中
    balls.push(ball)  //把ball物件放入到balls物件倉庫(陣列)中
  }
  for(var j=0;j<20;j=j+1)
  {
    monster = new Monster({})  //產生一個新的物件，"暫時"放入到monster變數中
    monsters.push(monster)  //把monster物件放入到monsters物件倉庫(陣列)中
  }


}

function draw() {  //每秒會執行60次次
  background("#87CEEB");
  fill("#9ACD32")
  ellipse(500,1200,1300)
  ellipse(1000,1050,1000)
  fill("#FFF5EE")
  stroke("#FFF5EE")
  ellipse(180,80,50)//雲
  ellipse(220,90,50)
  ellipse(200,60,50)
  ellipse(240,60,50)
  ellipse(260,80,50)

  ellipse(400,100,50)
  ellipse(440,110,50)
  ellipse(420,80,50)
  ellipse(460,80,50)
  ellipse(480,100,50)

  ellipse(620,80,50)
  ellipse(660,90,50)
  ellipse(640,60,50)
  ellipse(680,60,50)
  ellipse(700,80,50)

  ellipse(840,100,50)
  ellipse(880,110,50)
  ellipse(860,80,50)
  ellipse(900,80,50)
  ellipse(920,100,50)

  ellipse(1060,80,50)
  ellipse(1100,90,50)
  ellipse(1080,60,50)
  ellipse(1120,60,50)
  ellipse(1140,80,50)
  stroke(2) //stroke("#4D3900") 
  fill("#E32636")
  rect(450,480,70)
  fill("#704214")
  
  triangle(430,480,540,480,490,440)
  
  
  
  
  if(keyIsPressed){  //鍵盤是否被按下，如果有鍵盤被按下，keyPressed的值為true
    if(key=="ArrowLeft" || key=="a"){  //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key=="d"){  //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key=="w"){  //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key=="s"){  //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }    
  }
  for(let ball of balls){  //針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()
    //+++++++++++++++由此判斷，每隻大象有沒有接觸每一個飛彈++++++++++++++++++++++
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y))  //判斷ball與bullet有沒有碰觸
      {
        score = score - 1     //分數扣一
        elephant_sound.play()
        balls.splice(balls.indexOf(ball),1)         //讓大象從大象倉庫內移除
        bullets.splice(bullets.indexOf(bullet),1)   //讓飛彈從飛彈倉庫內移除
      }
    }
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  }


  for(let bullet of bullets){  //針對飛彈倉庫內的資料，一筆一筆的顯示出來
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters){  //針對怪物倉庫內的資料，一筆一筆的顯示出來
    if(monster.IsDead && monster.timenum>=6){
      monsters.splice(monsters.indexOf(monster),1) //讓怪物從怪物資料倉庫內移除
    }
    monster.draw()
    monster.update()
    //+++++++++++++++由此判斷，每隻怪物有沒有接觸每一個飛彈++++++++++++++++++++++
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y))  //判斷monster與bullet有沒有碰觸
      {
        score = score + 1     //分數加一
        // elephant_sound.play()
        // monsters.splice(monsters.indexOf(monster),1)   //讓怪物從怪物資料倉庫內移除
        monster.IsDead = true //已經被打到了，準備執行爆炸後的畫面
        bullets.splice(bullets.indexOf(bullet),1)   //讓飛彈從飛彈倉庫內移除
      }
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  }
  //beginShape()
  //fill("#FFFAF0")
  fill("#FFF5EE")
  stroke("#4D3900") 
  strokeWeight(5)
  rect(15,0,120,80)

  rect(15,0,120,20)
  //endShape()
  //textSize(10)
  //text(分數,10,25)
  textSize(50)
  text(score,63,65)
 
  //+++++劃出中間三角形的砲台++++++++++++++
  push()
    let dx = mouseX-width/2  //滑鼠座標到中心點座標的x軸距離
    let dy = mouseY-height/2 //滑鼠座標到中心點座標的y軸距離
    let angle = atan2(dy,dx)   //利用反tan算出角度


    // translate(width/2,height/2)  //砲台的位置  
    translate(shipP.x,shipP.y) //砲台的位置 ，使用shipP的向量值
    rotate(angle)    //讓三角形翻轉一個angle角度       
    noStroke()

    //fill("#FFB366")
    //arc(0,-40,-90,80,0,PI)

    fill("#F08080")
    
    //arc(70,-3,-90,80,0,PI/4)
    ellipse(0,0,80)  //劃出中間的圓

    fill("#FFB366")
    arc(0,0,95,80,0,PI)

    fill("##FFB366")
    strokeWeight(2)
    rect(8,20,5,5)
    rect(15,25,5,5)
    rect(25,25,5,5)
    rect(-25,25,5,5)
    rect(-20,30,5,5)
    rect(-10,19,5,5)
    rect(-8,27,5,5)

    fill("#696969")
    
    arc(0,0,90,20,0,PI)
    fill("#36BF36")

    rect(20,-10,-60,10)
    rect(40,-10,-60,10)

    fill("#696969")
    arc(0,0,90,20,0,PI)

    fill("#FFFF00")
    rect(30,-35,-70,15)
    rect(30,-35,10,15)

    fill("#FFB366")
    rect(30,-40,-70,10)
    rect(30,-40,10,10)
    
    //arc(50,0,-25,25,25,PI)
    //arc(50,0,25,-25,25,PI)
    
   
    //fill("#FFFAFA")
    //triangle(50,0,-25,-25,-25,25)  //劃出三角形
    //ellipse(40,0,40)
    //fill("#90EE90")
    //ellipse(80,0,40)
    //rect(20,0,120,20)
    //arc(0,50,70,80,0,PI)
    //fill("#8B0000")
    //arc(50,-30,40,70,0,PI)
    
    //curveVertex(50,0)
    //curveVertex(50,)
    
    curveVertex(0,0);
    curveVertex(4,0);


  pop()
  //+++++++++++++++++++++++++++++++

}

function mousePressed(){
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //按下滑鼠產生一個物件程式碼
  // ball = new Obj({
  //   // p:{x: mouseX, y:mouseY }
  //   p:createVector(mouseX,mouseY)
  // })  //產生一個新的物件，"暫時"放入到ball變數中
  // balls.push(ball)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //按下滑鼠後，刪除該大象物件
  // for(let ball of balls){
  //   if(ball.isBallInRanger(mouseX,mouseY)){
  //     //把倉庫的這個物件刪除
  //     score = score + 1
  //     balls.splice(balls.indexOf(ball),1)   //把倉庫內編號第幾個刪除，只刪除1個(indexOf()找出ball的編號)
  //   }
  // }

  //新增(產生)一筆飛彈資料(還沒有顯示)
  bullet  = new Bullet({})
  bullets.push(bullet)  //把這一筆資料放入飛彈倉庫
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){
    //新增(產生)一筆飛彈資料(還沒有顯示)
    bullet  = new Bullet({})
    bullets.push(bullet)  //把這一筆資料放入飛彈倉庫
    bullet_sound.play()
  }  

}
