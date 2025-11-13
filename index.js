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
