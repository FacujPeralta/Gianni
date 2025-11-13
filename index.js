// Cuando el usuario haga clic en el botón "Fotos"
document.getElementById("btn-fotos").addEventListener("click", function() {
  document.getElementById("fotos").scrollIntoView({ behavior: "smooth" });
});

// Cuando el usuario haga clic en el botón "Contacto"
document.getElementById("btn-contacto").addEventListener("click", function() {
  document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
});
