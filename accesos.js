// script.js
const userTableBody = document.querySelector("#userTable tbody");
const addUserBtn = document.getElementById("addUserBtn");

// Datos iniciales de ejemplo
const users = [
    { id: 1, role: "Administrador" },
    { id: 2, role: "Trabajador" }
];

// Función para renderizar usuarios en la tabla
function renderUsers() {
    userTableBody.innerHTML = ""; // Limpia la tabla
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="deleteUser(${index})">Eliminar</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Función para añadir un usuario
addUserBtn.addEventListener("click", () => {
    const id = users.length + 1;
    const role = prompt("Introduce el rol (Administrador/Trabajador):");
    if (role) {
        users.push({ id, role });
        renderUsers();
    }
});

// Función para eliminar un usuario
function deleteUser(index) {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
        users.splice(index, 1);
        renderUsers();
    }
}

// Inicializa la tabla con los datos iniciales
renderUsers();
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
