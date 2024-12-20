// Lista inicial de categorías
let categories = [
    "Papelería General",
    "Escritura",
    "Arte y Diseño",
    "Oficina",
    "Escolar",
    "Tecnología",
    "Regalos y Envolturas",
    "Material Didáctico",
    "Manualidades",
    "Limpieza y Mantenimiento"
  ];
  
  // Cargar categorías en la interfaz
  function loadCategories() {
    const categoriesDiv = document.getElementById("categories");
    categoriesDiv.innerHTML = ""; // Limpia el contenido previo
  
    categories.forEach((category, index) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");
      categoryDiv.innerHTML = `
        <h3>${category}</h3>
        <button class="edit-button" onclick="editCategory(${index})">Editar</button>
        <button onclick="deleteCategory(${index})">Eliminar</button>
      `;
      categoriesDiv.appendChild(categoryDiv);
    });
  }
  
  // Agregar una nueva categoría
  function addCategory() {
    const newCategoryInput = document.getElementById("newCategoryInput");
    const newCategory = newCategoryInput.value.trim();
  
    if (newCategory === "") {
      alert("Por favor, ingresa un nombre para la categoría.");
      return;
    }
  
    if (categories.includes(newCategory)) {
      alert("Esta categoría ya existe.");
      return;
    }
  
    categories.push(newCategory);
    newCategoryInput.value = ""; // Limpia el campo
    loadCategories();
  }
  
  // Editar una categoría existente
  function editCategory(index) {
    const newCategoryName = prompt("Edita el nombre de la categoría:", categories[index]);
  
    if (newCategoryName === null || newCategoryName.trim() === "") {
      return; // Canceló o ingresó un nombre vacío
    }
  
    categories[index] = newCategoryName.trim();
    loadCategories();
  }
  
  // Eliminar una categoría
  function deleteCategory(index) {
    if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${categories[index]}"?`)) {
      categories.splice(index, 1);
      loadCategories();
    }
  }
  
  // Inicializar la interfaz
  document.addEventListener("DOMContentLoaded", loadCategories);
  
  // Definir la función que actualiza la fecha y la hora
function updateDateTime() {
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");

  // Obtener la fecha y hora actuales
  const now = new Date();
  const date = now.toLocaleDateString("es-ES");  // Fecha en formato español (dd/mm/yyyy)
  const time = now.toLocaleTimeString("es-ES");  // Hora en formato español (hh:mm:ss)

  // Actualizar los elementos de fecha y hora
  dateElement.textContent = "Fecha: " + date;
  timeElement.textContent = "Hora: " + time;
}

// Llamar a la función cada segundo para actualizar la hora en tiempo real
setInterval(updateDateTime, 1000);

// Llamar a la función una vez al cargar la página para mostrar la fecha y hora inicial
updateDateTime();

  