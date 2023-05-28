var monster_colors = "081220-902449-b38e50-621132-3d2b56".split("-").map(a=>"#"+a)
class Monster{
    constructor(args){  //預設值，基本資料(包含有物件的顏色，位置，速度，大小...)
        this.r = args.r || random(5,10)    //怪物的外圓
        this.p = args.p ||  createVector(random(width),random(height))  //怪物起始的位置(以向量方式表示該座標)      
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //怪物的速度    
        this.color = args.color || random( fill_colors_2)   //怪物顏色
        this.mode = random(["happy","bad"])
        this.IsDead = false  //false代表該怪物還活著
        this.timenum=0
        this.size= random(5,10)  
    }

    draw(){    //畫怪物
        if(this.IsDead==false){  //活著時，畫的畫面
            push()
                translate(this.p.x,this.p.y)
                scale(6)
                fill(this.color)
                //noStroke() //不要有框線
                strokeWeight(1)
                rotate(280)
                beginShape()

                curveVertex(0,0)
                curveVertex(-2,1)
                curveVertex(-1,2)
                curveVertex(-2,3)
                curveVertex(-1,4)
                curveVertex(-2,5)
                curveVertex(2,3)
                curveVertex(4,3)
                curveVertex(8,5)
                curveVertex(7,4)
                curveVertex(8,3)
                curveVertex(6,2)
                curveVertex(7,1)
                curveVertex(5,0)
                curveVertex(9,-3)
                curveVertex(6,-7)
                curveVertex(5,-9)

                curveVertex(7,-12)
                curveVertex(5,-12)
                curveVertex(-1,-12)
                curveVertex(-2,-9)
                curveVertex(-1,-7)
                curveVertex(-1,7)

               

                
                
                strokeWeight(0.7)
                //stroke_colors("#FFFFFF")
                endShape(CLOSE)
                

                beginShape()
                stroke("#F75000")
                curveVertex(5,-6) 
                curveVertex(6,-7)
                curveVertex(7,-9)
                curveVertex(5,-7)
                curveVertex(-14,-9)
                
                endShape()
                //rotate(10)
                beginShape()
            
                
                endShape()
                //rotate(180)
                fill("#FFFAF0")
                noStroke() //不要有框線
                ellipse(5,0,this.r/3)
                fill("#000000")
                ellipse(5,0,this.r/6)
                fill("#A52A2A")
                ellipse(9,-3,4)
                
                //產生腳
                stroke("#FFFF4D") 
                strokeWeight(0.5)
                // line(this.r/2,0,this.r,0)
                //fill("#00CED1");
                for(var j=0;j<3;j++){
                    rotate(PI/10)   //因為要產生八隻腳，一隻腳要旋轉45度，PI代表180，PI/4代表45度
                    beginShape()
                        for (var i=0;i<(this.r/6);i++){
                            vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                        }
                    endShape()
                }
            pop()
        }else{  //死後爆炸的畫面圖
            this.timenum = this.timenum+1
            push()
                translate(this.p.x,this.p.y)
                fill(this.color)
                noStroke() //不要有框線
                ellipse(0,0,this.r)
                stroke(255)
                line(-this.r/3,0,this.r/3,0) //眼睛的線
                //產生腳
                stroke(this.color) 
                strokeWeight(4)
                // line(this.r/2,0,this.r,0)
                noFill();
                for(var j=0;j<8;j++){
                    rotate(PI/4)   //因為要產生八隻腳，一隻腳要旋轉45度，PI代表180，PI/4代表45度
                    line(this.r/2,0,this.r,0)  //八隻腳產生一個直線
                }
            pop()
        }

    }

    update(){   
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x >= width)  //<0碰到左邊，>width為碰到右邊
        {
            this.v.x = -this.v.x
        }
        if(this.p.y<=0 || this.p.y >= height)  //<0碰到左邊，>width為碰到右邊
        {
            this.v.y = -this.v.y
        }
    }
    isBallInRanger(x,y){   //判斷有沒有被滑鼠按到
        let d = dist(x,y,this.p.x,this.p.y)  //計算飛彈與此物件(怪物)中心位置之間的距離
        if(d<this.size*4){  //飛彈與怪物間的距離如果小於半徑(this.r/2)，代表碰撞到
          return true   //代表距離有在範圍內
        }else{
          return false  //代表距離沒有在範圍內
        }
      }
}