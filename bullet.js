class Bullet{
    constructor(args){  //預設值，基本資料(包含有物件的顏色，位置，速度，大小...)
        this.r = args.r || 10    //如果飛彈有傳回直徑的大小，就以參數為直徑，否則預設為10
        this.p = args.p || shipP.copy()   //createVector(width/2,height/2) // shipP.copy()  //飛彈起始的位置(以向量方式表示該座標) ，要以中間砲台發射，所以座標為(width/2,height/2)        
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(6) //飛彈的速度    
        this.color = args.color || "red"   //飛彈顏色
    }
    draw(){  //劃出飛彈
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke()
            //ellipse(0,0,this.r)
            fill("#F08080")
    
    //arc(70,-3,-90,80,0,PI/4)
    rotate(280)
    scale(0.5)
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

    
    
            
        pop()
    }
    update(){  //計算移動後的位置
        this.p.add(this.v) 
    }
}