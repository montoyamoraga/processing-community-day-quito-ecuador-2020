
let lienzo;

let osc;

let estaPrendido = false;

// setup() ocure una vez al inicio
function setup() {
  // crear lienzo, 800px ancho, 600 px alto, 2D
  lienzo = createCanvas(800, 600);

  // agregar respuesta asíncrona
  // cuando se presiona el ratón, se ejecuta prenderOscilador()
  lienzo.mousePressed(prenderOsciladores);

  // fondo (rojo, verde, azul), valores 0 a 255
  background(0, 255, 0);
  
  // no dibujar contorno de figuras geometricas
  noStroke();

  // crear nuevo oscilador sinusoidal
  osc = new p5.Oscillator("sine");
}

// draw() ocurre despues de setup(), en bucle
function draw() {
  // dibujar elipse en la posicion del raton, 20px altura, 30px ancho
  ellipse(mouseX, mouseY, 20, 30);

  osc.freq(map(mouseX, 0, width, 300, 450));
  osc.amp(map(mouseY, 0, height, 1.0, 0.0));
}

// mouseClicked() ocurre cuando se hace click
function mouseClicked() {

  // color aleatorio de fondo
  background(random(255), random(255), random(255));
  // color aleatorio de relleno
  fill(random(255), random(255), random(255));

}

// función ejecutada cuando se hace click en el lienzo
function prenderOsciladores() {
  if (!estaPrendido) {
    osc.start();
  }
}
