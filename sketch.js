
let graph_h = 10;
let graph_w =  10;

let vector_list = [[-2,6],[6,-3],[4,7]]
let vec_0, vec_1, vec_2;
let vec_output = [0,0];

let red_0 = [255,0,0,0]
let red_63 = [255,0,0,63]
let red_127 = [255,0,0,127]
let red_255 = [255,0,0,255]

let green_127 = [0,255,0,127]
let blue_127 = [0,0,255,127]

let vector_stack;

function preload() {

}

function Set_Vect_0(x,y) {
  vec_0 = [x,y,green_127]
  vector_stack = [vec_0, vec_1, vec_2]
}
function Set_Vect_1(x,y) {
  vec_1 = [x,y,blue_127]
  vector_stack = [vec_0, vec_1, vec_2]
}
function Set_Vect_2(x,y) {
  vec_2 = [x,y,red_127]
  vector_stack = [vec_0, vec_1, vec_2]
}
function Random_Vectors() {
  vec_0 = [int(random(-10,10)),int(random(-10,10)),green_127];
  vec_1 = [int(random(-10,10)),int(random(-10,10)),blue_127];
  vec_2 = [int(random(-10,10)),int(random(-10,10)),red_127];
  vector_stack = [vec_0, vec_1, vec_2];
}

function Sum_Vectors() {
  vec_output = [(vec_0[0] + vec_1[0] + vec_2[0]),(vec_0[1] + vec_1[1] + vec_2[1])]
  // console.log(vec_output)
}


function setup() {
  createCanvas(1050,350);
  // Graph(origin location x, origin location y, pixels per unit of graph, number of units graph extends to)
  g_0 = new Graph("Vector A",120, 150, 10, 10)
  g_1 = new Graph("Vector B",350, 150, 10, 10)
  g_2 = new Graph("Vector C",580, 150, 10, 10)
  g_3 = new Graph("Vector Sum",925, 150, 10/3, 30)

  Random_Vectors();


}

function draw() {
  background(0);
  Sum_Vectors();
  // console.log(vec_output)

  g_0.Draw_Graph()
  g_1.Draw_Graph()
  g_2.Draw_Graph()
  g_3.Draw_Graph()

  g_0.Graph_Check_User_Bounds()
  g_1.Graph_Check_User_Bounds()
  g_2.Graph_Check_User_Bounds()
  g_3.Graph_Check_User_Bounds()


  g_0.Draw_Graph_Limit_Text()
  g_1.Draw_Graph_Limit_Text()
  g_2.Draw_Graph_Limit_Text()
  g_3.Draw_Graph_Limit_Text()


  g_0.Draw_Graph_Name()
  g_1.Draw_Graph_Name()
  g_2.Draw_Graph_Name()
  g_3.Draw_Graph_Name()

  g_0.Draw_Graph_Vector_Text(vec_0[0],vec_0[1])
  g_1.Draw_Graph_Vector_Text(vec_1[0],vec_1[1])
  g_2.Draw_Graph_Vector_Text(vec_2[0],vec_2[1])
  g_3.Draw_Graph_Vector_Text(vec_output[0],vec_output[1])

  g_0.Draw_Vector_Space(vec_0[0],vec_0[1],red_63, 1)
  g_1.Draw_Vector_Space(vec_1[0],vec_1[1],red_63, 1)
  g_2.Draw_Vector_Space(vec_2[0],vec_2[1],red_63, 1)

  g_0.Draw_Vector(vec_0[0],vec_0[1],vec_0[2], 1)
  g_1.Draw_Vector(vec_1[0],vec_1[1],vec_1[2], 1)
  g_2.Draw_Vector(vec_2[0],vec_2[1],vec_2[2], 1)


  g_3.Draw_Vector_Stack(vector_stack)

  // for (vector of vector_list) {
  //   g_0.Draw_Vector(vector[0], vector[1], [255,255,255],1)
  //   g_1.Draw_Vector_Space(vector[0], vector[1], [255,127,127])
  //   g_1.Draw_Vector(vector[0], vector[1], [255,255,255],1)
  // }
}

class Graph{
  constructor(name, origin_x,origin_y, scale, limit){
    this.name = name;
    this.x = origin_x;
    this.y = origin_y;
    this.s_x = scale;
    this.s_y = -scale;
    this.l = limit;

    this.w = this.s_x * this.l * 2
    this.h = this.s_y * this.l * 2

    this.user_hovering = false;
    this.user_click_left = false;
    this.user_click_middle = false;

  }

  Draw_Graph() {
    this.Draw_Graph_Lines([127,127,127], 1)
    this.Draw_Graph_Border([63,63,63], 3)
    this.Draw_Graph_Dots([255,255,255], 1)
  }

  Draw_Graph_Name() {
    let size = 20;
    fill(255,255,255); noStroke();
    textSize(size)
    text(this.name, this.x - (textWidth(this.name)/2), this.y + (this.h/2)-size)
  }

  Draw_Graph_Vector_Text(x,y) {
    let size = 20;
    let lines = 2;
    fill(255,255,255); noStroke();
    textSize(size)
    let string_0 = int(x)
    let string_1 = int(y)
    let max_width = max([textWidth(string_0),textWidth(string_1)])
    text(string_0, this.x - (max_width/2), this.y - (this.h/2)+(2*size))
    text(string_1, this.x - (max_width/2), this.y - (this.h/2)+(3*size))
    // text(this.name, this.x - (textWidth(this.name)/2), this.y - (this.h/2)+(4*size))

    // Left Bracket
    stroke(255); strokeWeight(2);
    line(this.x - (max_width/2) - 20, this.y - (this.h/2)+((lines+1.5)*size),this.x - (max_width/2) - 20, this.y - (this.h/2)+(0.75*size) )
    line(this.x - (max_width/2) - 20, this.y - (this.h/2)+((lines+1.5)*size),this.x - (max_width/2) - 10, this.y - (this.h/2)+((lines+1.5)*size) )
    line(this.x - (max_width/2) - 20, this.y - (this.h/2)+(0.75*size),this.x - (max_width/2) - 10, this.y - (this.h/2)+(0.75*size) )

    // Right Bracket
    line(this.x + (max_width/2) + 20, this.y - (this.h/2)+((lines+1.5)*size),this.x + (max_width/2) + 20, this.y - (this.h/2)+(0.75*size) )
    line(this.x + (max_width/2) + 20, this.y - (this.h/2)+((lines+1.5)*size),this.x + (max_width/2) + 10, this.y - (this.h/2)+((lines+1.5)*size) )
    line(this.x + (max_width/2) + 20, this.y - (this.h/2)+(0.75*size),this.x + (max_width/2) + 10, this.y - (this.h/2)+(0.75*size) )

  }

  Draw_Graph_Limit_Text() {
    let size = 10;
    fill(255,255,255); noStroke();
    textSize(size)
    text(str(this.l), this.x + (this.w/2 - textWidth(str(this.l))), this.y - 4)
    text(str(this.l), this.x + 2, this.y + (this.h/2) + size + 2)

    text(str(-this.l), this.x - (this.w/2 - 2), this.y - 4)
    text(str(-this.l), this.x + 2, this.y - (this.h/2 + 2) )
  }

  Draw_Graph_Lines(color, stroke_weight) {
    noFill();
    stroke(color[0],color[1],color[2]); strokeWeight(stroke_weight);
    line(this.x - (this.s_x * this.l), this.y, this.x + (this.s_x * this.l), this.y)
    line(this.x , this.y - (this.s_y * this.l), this.x, this.y + (this.s_y * this.l))
  }

  Draw_Graph_Dots(color, stroke_weight) {
    noFill();
    stroke(color[0],color[1],color[2]); strokeWeight(stroke_weight);

    for (let i = -this.l; i < this.l; i++) {
      if (i % 5 == 0) {
        strokeWeight(stroke_weight * 2)
      } else {
        strokeWeight(stroke_weight)
      }
      point(this.x + (i * this.s_x), this.y + 0)

    }
    for (let i = -this.l; i < this.l; i++) {
      if (i % 5 == 0) {
        strokeWeight(stroke_weight * 2)
      } else {
        strokeWeight(stroke_weight)
      }
      point(this.x + 0, this.y + (i * this.s_y))

    }
  }

  Draw_Graph_Border(color, stroke_weight) {
    noFill();
    if (this.user_hovering) {
      stroke(127,255,127); strokeWeight(stroke_weight);
    } else {
      stroke(color[0],color[1],color[2]); strokeWeight(stroke_weight);
    }
    rect(this.x - (this.s_x * this.l), this.y - (this.s_y * this.l), this.w, this.h)
  }

  Draw_Point(x,y, color, stroke_weight) {
    noFill();
    stroke(color[0],color[1],color[2]); strokeWeight(stroke_weight);
    point(this.x + (x * this.s_x), this.y + (y * this.s_y) )
  }

  Draw_Vector(x, y, color, stroke_weight) {
    noFill();
    // console.log(x,y,color, stroke_weight)
    stroke(color[0],color[1],color[2]); strokeWeight(stroke_weight);
    line(this.x, this.y, this.x + (x * this.s_x), this.y + (y * this.s_y) )
    this.Draw_Point(x,y,color,  6)
    // this.Draw_Point(x,y,[255,255,255],  5)
  }

  Draw_Vector_Space(x, y, color) {
    fill(color); noStroke();
    rect(this.x, this.y, (x * this.s_x), (y * this.s_y) )
  }

  Draw_Vector_Stack(vector_list) {
    let origin_x = this.x;
    let origin_y = this.y;

    for (let i = 0; i < vector_list.length; i++) {
      stroke(vector_list[i][2][0], vector_list[i][2][1], vector_list[i][2][2]); strokeWeight(1);
      line(origin_x, origin_y, origin_x + (vector_list[i][0] * this.s_x), origin_y + (vector_list[i][1] * this.s_y))
      origin_x = origin_x + vector_list[i][0] * this.s_x;
      origin_y = origin_y + vector_list[i][1] * this.s_y;
      strokeWeight(7);
      point(origin_x, origin_y)
      vec_output = [vector_list[i][0], vector_list[i][1]]
    }
    stroke(255,255,255); strokeWeight(1);
    line(this.x, this.y, origin_x, origin_y)
    strokeWeight(4);
    point(origin_x, origin_y)
    fill(red_63); noStroke();
    rect(this.x, this.y, origin_x - this.x, origin_y - this.y )
  }


  Graph_Check_User_Bounds() {
    // if User mouseX and mouseY are inside the bounds of this graph, then user_hovering = true

    // console.log(mouseX, ">", this.graph_rect_x + this.translate_x,"     ",mouseX, "<", this.graph_rect_x + this.graph_rect_w + this.translate_x,"     ", mouseY, ">", this.graph_rect_y + this.translate_y,"     ", mouseY, "<", this.graph_rect_y + this.graph_rect_h + this.translate_y )
    if (mouseX > this.x - (this.s_x * this.l) && mouseX < this.x - (this.s_x * this.l) + this.w && mouseY > this.y + (this.s_y * this.l) && mouseY < this.y + (this.s_y * this.l) - this.h) {
      // console.log(mouseX, mouseY)
      this.user_hovering = true;
      if (mouseIsPressed) {
        if (LEFT === mouseButton) {
          this.user_click_left = true;
          if ("Vector A" == this.name) {
            let x =  int(-(this.x - mouseX) / this.s_x)
            let y =  int(-(this.y - mouseY) / (this.s_y ))
            Set_Vect_0(x,y)

          } else if ("Vector B" == this.name) {
            let x =  int(-(this.x - mouseX) / this.s_x)
            let y =  int(-(this.y - mouseY) / (this.s_y ))
            Set_Vect_1(x,y)
          } else if ("Vector C" == this.name) {
            let x =  int(-(this.x - mouseX) / this.s_x)
            let y =  int(-(this.y - mouseY) / (this.s_y ))
            Set_Vect_2(x,y)
          }
          this.coords = [int(-(this.translate_x - mouseX) /  this.x_pixel_scale),int(-(this.translate_y - mouseY) / this.y_pixel_scale)]
        } else if (CENTER === mouseButton) {
          this.user_click_middle = true;
        }
      } else {
        // console.log("User is hovering over graph.")
        this.user_click_middle = false;
        this.user_click_left = false;
      }
    } else {
      this.user_hovering = false;
      this.user_click_left = false;
      this.user_click_middle = false;
    }

  }

}
