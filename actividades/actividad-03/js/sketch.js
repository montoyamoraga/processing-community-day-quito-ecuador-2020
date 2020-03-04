// esta actividad está basada en la escrita por Andreas Refsgaard
// para el libro Machine Learning for artists, disponible en ml4a.github.io
// y también en https://editor.p5js.org/AndreasRef/sketches/r1_w73FhQ

// declarar variables globales

// variable para almacenar la captura de video
let video;

// variable para almacenar un buffer de gráficas 
let buffer;

// variable para almacenar el modelo detector de poses
let poseNet; 

// variable para almacenar las poses detectadas
let poses = [];

// variable para almacenar posición (x, y) actual de la nariz
let narizX;
let narizY;

// variable para almacenar posición (x, y) anterior de la nariz
let narizAntesX;
let narizAntesY;

// p5.js ejecuta setup() al principio de los tiempos
function setup() {

  // crear lienzo 640 px ancho, 480 px alto
  createCanvas(640, 480);

  // abrir cámara del computador y asignar a variable video
  // esta función crea un nuevo elemento html de tipo <video>
  // y lo pone a continuación de nuestro lienzo
  // nuestro lienzo es un elemento HTML de tipo <canvas>
  video = createCapture(VIDEO);

  // hacer que el tamaño del video sea el mismo que el del lienzo
  // width y height son variables de p5.js
  // width significa ancho, height significa altura
  video.size(width, height);

  // pixelDensity(1) desactiva el ajuste automático
  // de densidad de pixeles, que detecta pantallas de alta resolución 
  pixelDensity(1);

  // createGraphics() crea un buffer para dibujar gráficas
  // que solamente existe en la memoria, no en la pantalla
  // el resultado lo asignamos a la variable buffer
  buffer = createGraphics(width, height);

  // crear una instancia de ml5.poseNet
  // poseNet apunta a nuestra variable video
  // y
  poseNet = ml5.poseNet(video, modeloListo);

  // agregamos un escuchador de eventos "pose"
  // cuando ocurre "pose", guardamos los datos en la variable "poses"
  poseNet.on("pose", (resultados) => {
    poses = resultados;
  });

  // esconder el elemento <video> creado por la función createCapture()
  // solamente queda el elemento <canvas> creado por p5.js en la pantalla
  video.hide();
}

// p5.js ejecuta draw() después de setup(), en bucle
function draw() {

  // poner la imagen actual del video en el lienzo
  image(video, 0, 0, width, height);

  // poner la imagen actual del buffer en el lienzo
  image(buffer, 0, 0, width, height);

  // llamar a función para dibujar con la nariz
  dibujarConNariz();
  // llamar a función para dibujar los puntos del esqueleto
  dibujarEsqueleto();
}

// esta función se ejecuta cuando el modelo ml5.poseNet es cargado
function modeloListo() {
  // selecciona el elemento de clase estado en HTML
  // y reemplaza su texto con "modelo listo!"
  select('#estado').html('modelo listo!');
}

// función de p5.js que es ejecutada cuando se presiona una tecla
function keyPressed() {
  // borrar el contenido en buffer
  buffer.clear();
}

// función que dibuja líneas entre posiciones de nariz
// estas líneas se dibujan en el buffer
function dibujarConNariz() {

  // iterar sobre todas las poses detectadas
  for (let i = 0; i < min(poses.length, 1); i++) {
    // por cada pose detectada, iterar sobre todos los puntos
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // un punto es un objeto que describe una parte del cuerpo
      let punto = poses[i].pose.keypoints[j];
      // si la probabilidad de la pose es mayor a 0.2, dibujar la linea
      if (punto.score > 0.2) {
        // keypoints[0] es la nariz
        if (j == 0) {
          narizX = punto.position.x;
          narizY = punto.position.y;

          buffer.stroke(230, 80, 0);
          buffer.strokeWeight(5);

          buffer.line(narizX, narizY, narizAntesX, narizAntesY);

          narizAntesX = narizX;
          narizAntesY = narizY; 
        }
      }
    }
  }
}

// función que dibuja elipses sobre cada punto del esqueleto
// estas líneas se dibujan en el lienzo
function dibujarEsqueleto() {
  // iterar sobre todas las poses detectadas
  for (let i = 0; i < min(poses.length, 1); i++) {
    // por cada pose detectada, iterar sobre todos los puntos
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // un punto es un objeto que describe una parte del cuerpo
      let punto = poses[i].pose.keypoints[j];
      
      // si la probabilidad de la pose es mayor a 0.2, dibujar la elipse
      if (punto.score > 0.2) {
        
        // para todo punto distinto de la nariz
        if (j != 0) {

          let puntoX = punto.position.x;
          let puntoY = punto.position.y;

          // opciones de dibujo, sin contorno, relleno color rojo
          fill(255, 0, 0);
          noStroke();
          // dibujar elipse con diametro 5
          ellipse(puntoX, puntoY, 5, 5);
        }
      }
    }
  }
}
