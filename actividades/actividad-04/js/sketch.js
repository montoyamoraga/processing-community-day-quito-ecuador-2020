// actividad 03

// declarar variables globales

// variable para almacenar el lienzo
let lienzo = null;

// variable info para almacenar el archivo json
let info = null;

// variable para almacenar las llaves del archivo json
let llavesInfo = null

// variable para elegir la llave actual
let llaveIndice = 0;
let llaveValor = null;

// variable para almacenar el elemento actual
let elemento = null;
let elementoLlaves = null;

// variable para almacenar imagenes de gatos
let gato;

// nota:
// los archivos json son pares de llave:valor
// el valor a su vez puede ser un conjunto de pares llave:valor

// preload() es una función opcional de p5.js
// preload() espera que su ejecución termine antes de avanzar a setup()
// preload(), si existe, ocurre una vez justo antes de setup()
// sirve para cargar archivos y esperar a que sean cargados
function preload() {

  // cargar archivo json
  info = loadJSON("./data/info.json");
}

// setup() es 
function setup() {

  // crear lienzo y asignarlo a variable
  lienzo = createCanvas(800, 600);

  // hacer que este lienzo
  lienzo.parent("divCanvas");

  // obtener las llaves del archivo json
  llaves = Object.keys(info);

  // imprimir en consola las llaves
  console.log("llaves: " + llaves);

  frameRate(5);

}

function draw() {

  elemento = info[llaves[llaveIndice]];

  // recuperar llaves del elementoActual
  elementoLlaves = Object.keys(elemento);
  
  // si las llaves del elemento existen
  if (elementoLlaves.length > 0) {
    for (let i = 0; i < elementoLlaves.length; i++) {
      text(info[llaves[llaveIndice]][elementoLlaves[i]],
        random(width), random(height));
    }
  }
}

// keyPressed() es activado por p5.js cuando se presiona cualquier tecla
function keyPressed() {
  // si se presiona la tecla arriba, aumentar llaveIndice
  if (keyCode === UP_ARROW) {
    llaveIndice = llaveIndice + 1;
  }
  // si se presiona la tecla abajo, disminuir llaveIndice
  else if (keyCode === DOWN_ARROW) {
    llaveIndice = llaveIndice - 1;
  }

  // controlar los límites
  // llaveIndice tiene que estar entre 0 y llaves.length - 1
  llaveIndice = max(llaveIndice, 0);
  llaveIndice = min(llaveIndice, llaves.length - 1);

  // "n" por "nueva página"
  // escoger una pagina web aleatoria y cargarla
  if (key === "n") {
    
    // escoger un indice aleatorio
    let indice = int(random(Object.keys(info["paginasWeb"]).length));

    // recuperar la direccion web desde el archivo json
    let url = info["paginasWeb"][Object.keys(info["paginasWeb"])[indice]];

    // cargar la pagina web en objeto <iframe> en pagina web
    document.getElementById("otraPagina").src = url;
  }

  // "g" por "gato"
  if (key === "g") {
    // escoger un indice aleatorio
    let indice = int(random(Object.keys(info["gatos"]).length));

    // recuperar la direccion web desde el archivo json
    let url = info["gatos"][Object.keys(info["gatos"])[indice]];

    // cargar la imagen
    gato = loadImage(url, agregarGato);

  }

}

function agregarGato() {
  // agregar la imagen en la foto
  image(gato, random(width), random(height), 50, 50); 
}
