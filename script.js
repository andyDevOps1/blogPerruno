const temas = [
  { nombre: "Consejos sobre perros", link: "consejos.html" },
  { nombre: "Cuidados especiales", link: "cuidados.html" },
  { nombre: "Tratamiento de cachorros", link: "cachorros.html" }
];

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const input = document.getElementById("buscar");
const sugerencias = document.getElementById("sugerencias");

input.addEventListener("input", () => {
  const texto = normalizar(input.value.trim());
  sugerencias.innerHTML = "";

  if (texto === "") {
    sugerencias.style.display = "none";
    return;
  }

  const resultados = temas.filter(t =>
    normalizar(t.nombre).includes(texto)
  );

  if (resultados.length > 0) {
    resultados.forEach(t => {
      const opcion = document.createElement("div");
      opcion.textContent = t.nombre;

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

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    buscarPagina();
  }
});

function buscarPagina() {
  const texto = normalizar(input.value.trim());
  const encontrado = temas.find(t => normalizar(t.nombre) === texto);

  if (encontrado) {
    window.location.href = encontrado.link;
  } else {
    alert("No se encontró una página con ese nombre 🐾");
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".barra-busqueda")) {
    sugerencias.style.display = "none";
  }
});



