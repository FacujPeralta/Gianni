// Cuando el usuario haga clic en el botón "Fotos"
document.getElementById("btn-fotos").addEventListener("click", function() {
  document.getElementById("fotos").scrollIntoView({ behavior: "smooth" });
});

// Cuando el usuario haga clic en el botón "Contacto"
document.getElementById("btn-contacto").addEventListener("click", function() {
  document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
});
const botonAgregar = document.getElementById('btn-agregar-foto');
const inputFoto = document.getElementById('input-foto');
const contenedorFotos = document.getElementById('contenedor-fotos');



//se agg foto de google al azar
  const boton = document.getElementById('agregarFotoBtn');
        const galeria = document.getElementById('galeria');

        boton.addEventListener("click", () => {
            const nuevaImg = document.createElement("img");
            nuevaImg.src = "https://picsum.photos/300/200?random=" + Math.random();
            nuevaImg.alt = "Foto agregada";

            galeria.appendChild(nuevaImg);
        });
 // 📦 Recuperar fotos guardadas al cargar la página
document.addEventListener('DOMContentLoaded', mostrarFotosGuardadas);

// 📸 Abrir selector de archivos al hacer click en el botón
botonAgregar.addEventListener('click', () => inputFoto.click());

// 🖼️ Cuando se selecciona una imagen
inputFoto.addEventListener('change', (e) => {
  const archivo = e.target.files[0];
  if (archivo && archivo.type.startsWith('image/')) {
    const lector = new FileReader();
    lector.onload = function (event) {
      const dataURL = event.target.result;
      agregarFoto(dataURL);
      guardarFoto(dataURL);
    };
    lector.readAsDataURL(archivo);
  }
});

 // ➕ Agregar una foto visualmente en la galería
function agregarFoto(src) {
  const nuevaImagen = document.createElement('img');
  nuevaImagen.src = src;
  nuevaImagen.alt = 'Foto subida';
  nuevaImagen.title = 'Tocá para eliminar';
  
  // 🗑️ Si hacés click, se elimina
  nuevaImagen.addEventListener('click', () => eliminarFoto(src, nuevaImagen));

  contenedorFotos.appendChild(nuevaImagen);
}

// 💾 Guardar una nueva foto en localStorage
function guardarFoto(src) {
  const fotosGuardadas = JSON.parse(localStorage.getItem('fotos')) || [];
  fotosGuardadas.push(src);
  localStorage.setItem('fotos', JSON.stringify(fotosGuardadas));
}

// 📂 Mostrar todas las fotos guardadas
function mostrarFotosGuardadas() {
  const fotosGuardadas = JSON.parse(localStorage.getItem('fotos')) || [];
  fotosGuardadas.forEach((src) => agregarFoto(src));
}

// 🗑️ Eliminar una foto del localStorage y del DOM
function eliminarFoto(src, elemento) {
  const fotosGuardadas = JSON.parse(localStorage.getItem('fotos')) || [];
  const nuevasFotos = fotosGuardadas.filter((foto) => foto !== src);
  localStorage.setItem('fotos', JSON.stringify(nuevasFotos));

  elemento.remove(); // borra la imagen de la galería
}

const modal = document.getElementById("modal");
const modalImg = document.getElementById("img-grande");
const cerrar = document.querySelector(".cerrar");

const imagenes = document.querySelectorAll(".img-click");
let indexActual = 0;

// abrir imagen
imagenes.forEach((img, index) => {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        indexActual = index;
    }
});

// cerrar
cerrar.onclick = () => modal.style.display = "none";

// flechas
document.querySelector(".derecha").onclick = () => {
    indexActual++;
    if (indexActual >= imagenes.length) indexActual = 0;
    modalImg.src = imagenes[indexActual].src;
};

document.querySelector(".izquierda").onclick = () => {
    indexActual--;
    if (indexActual < 0) indexActual = imagenes.length - 1;
    modalImg.src = imagenes[indexActual].src;
};

// cerrar tocando fondo
modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

