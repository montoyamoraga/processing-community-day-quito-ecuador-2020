// setup() ocure una vez al inicio
function setup() {
  // crear lienzo, 800px ancho, 600 px alto, 2D
  createCanvas(800, 600);

  // fondo (rojo, verde, azul), valores 0 a 255
  background(0, 255, 0);
  
  // no dibujar contorno de figuras geometricas
  noStroke();
}

// draw() ocurre despues de setup(), en bucle
function draw() {
  // dibujar elipse en la posicion del raton, 20px altura, 30px ancho
  ellipse(mouseX, mouseY, 20, 30);
}

// mouseClicked() ocurre cuando se hace click
function mouseClicked() {

  // color aleatorio de fondo
  background(random(255), random(255), random(255));
  // color aleatorio de relleno
  fill(random(255), random(255), random(255));
}
