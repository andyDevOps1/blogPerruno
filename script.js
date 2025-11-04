// Lista de temas y sus enlaces
const temas = [
  { nombre: "Consejos sobre perros", link: "consejos.html" },
  { nombre: "Cuidados especiales", link: "cuidados.html" },
  { nombre: "Tratamiento de cachorros", link: "cachorros.html" }
];

// Normaliza (minúsculas y sin acentos)
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const input = document.getElementById("buscar");
const sugerencias = document.getElementById("sugerencias");

// Muestra sugerencias parecidas mientras escribes
input.addEventListener("input", () => {
  const texto = normalizar(input.value.trim());
  sugerencias.innerHTML = "";

  if (texto === "") {
    sugerencias.style.display = "none";
    return;
  }

  // Coincidencias parciales
  const resultados = temas.filter(t =>
    normalizar(t.nombre).includes(texto)
  );

  if (resultados.length > 0) {
    resultados.forEach(t => {
      const opcion = document.createElement("div");
      opcion.textContent = t.nombre;

      // Solo rellena el campo, NO redirige
      opcion.addEventListener("click", () => {
        input.value = t.nombre;
        sugerencias.style.display = "none";
      });

      sugerencias.appendChild(opcion);
    });
    sugerencias.style.display = "block";
  } else {
    sugerencias.style.display = "none";
  }
});

// 🔹 Pulsar Enter busca la página
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    buscarPagina();
  }
});

// 🔹 Pulsar el botón "Buscar"
function buscarPagina() {
  const texto = normalizar(input.value.trim());
  const encontrado = temas.find(t => normalizar(t.nombre) === texto);

  if (encontrado) {
    window.location.href = encontrado.link;
  } else {
    alert("No se encontró una página con ese nombre 🐾");
  }
}

// 🔹 Ocultar sugerencias al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".barra-busqueda")) {
    sugerencias.style.display = "none";
  }
});


