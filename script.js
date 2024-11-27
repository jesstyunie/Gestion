document.addEventListener('DOMContentLoaded', () => {
    // Verifica si estamos en la página del login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            // Credenciales de ejemplo
            const validUsername = "admin";
            const validPassword = "1234";

            if (username === validUsername && password === validPassword) {
                // Redirige a la página principal
                window.location.href = "paginaprincipal.html";
            } else {
                errorMessage.textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }
    function navigateTo(url) {
        window.location.href = url;
    }
    

    // Verifica si estamos en la página del inventario
    const tablaProductos = document.getElementById('tablaProductos');
    if (tablaProductos) {
        const API_URL = 'http://localhost:3003/inventario';
        obtenerProductos();

        // Función para obtener y mostrar la fecha y hora actuales
function updateDateTime() {
    const now = new Date();
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    // Asegúrate de que los elementos existen antes de actualizar
    if (dateElement && timeElement) {
        dateElement.textContent = `Fecha: ${now.toLocaleDateString()}`;
        timeElement.textContent = `Hora: ${now.toLocaleTimeString()}`;
    }
}

// Actualizar la fecha y hora cada segundo
setInterval(updateDateTime, 1000);

        // Obtener productos
        async function obtenerProductos() {
            try {
                const response = await fetch(API_URL);
                const productos = await response.json();
                mostrarProductos(productos);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        }

        // Mostrar productos en la tabla
        function mostrarProductos(productos) {
            // Limpia la tabla antes de mostrar los productos
            tablaProductos.innerHTML = '';

            if (productos.length === 0) {
                tablaProductos.innerHTML = '<tr><td colspan="5">No hay productos registrados.</td></tr>';
                return;
            }

            productos.forEach(producto => {
                const fila = `
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td>${producto.precio}</td>
                        <td>
                            <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>
                            <button class="editar-btn" data-id="${producto.id}">Editar</button>
                        </td>
                    </tr>
                `;
                tablaProductos.innerHTML += fila;
            });

            // Asocia los eventos de eliminar y editar a los botones
            const eliminarBtns = document.querySelectorAll('.eliminar-btn');
            eliminarBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const id = event.target.getAttribute('data-id');
                    eliminarProducto(id);
                });
            });

            const editarBtns = document.querySelectorAll('.editar-btn');
            editarBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const id = event.target.getAttribute('data-id');
                    cargarProducto(id);
                });
            });
        }

        // Agregar producto
        async function agregarProducto() {
            const nombre = document.getElementById('nombre').value;
            const cantidad = parseInt(document.getElementById('cantidad').value);
            const precio = parseFloat(document.getElementById('precio').value);

            try {
                await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, cantidad, precio }),
                });
                obtenerProductos();
            } catch (error) {
                console.error("Error al agregar producto:", error);
            }
        }

        // Eliminar producto
        async function eliminarProducto(id) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                obtenerProductos();
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        }

        // Cargar producto para editar
        async function cargarProducto(id) {
            try {
                const response = await fetch(API_URL);
                const productos = await response.json();
                const producto = productos.find(p => p.id === parseInt(id));

                // Rellenar el formulario con los datos del producto
                document.getElementById('nombre').value = producto.nombre;
                document.getElementById('cantidad').value = producto.cantidad;
                document.getElementById('precio').value = producto.precio;

                // Cambiar el nombre del botón a "Actualizar"
                const guardarBtn = document.getElementById('guardarBtn');
                guardarBtn.textContent = 'Actualizar';
                guardarBtn.setAttribute('data-id', id); // Establecer el ID para la actualización

                // Cambiar la acción del formulario al actualizar
                const formulario = document.getElementById('formularioProductos');
                formulario.onsubmit = (event) => {
                    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
                    actualizarProducto(id); // Llamar a actualizarProducto
                };
            } catch (error) {
                console.error("Error al cargar producto:", error);
            }
        }

        // Actualizar producto
        async function actualizarProducto(id) {
            const nombre = document.getElementById('nombre').value;
            const cantidad = parseInt(document.getElementById('cantidad').value);
            const precio = parseFloat(document.getElementById('precio').value);

            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, cantidad, precio }),
                });

                if (response.ok) {
                    // Producto actualizado correctamente
                    obtenerProductos(); // Recarga la lista de productos
                    console.log('Producto actualizado correctamente');
                } else {
                    console.error('Error al actualizar el producto');
                }
            } catch (error) {
                console.error("Error al actualizar producto:", error);
            }
        }

        // Agregar evento al formulario para agregar producto
        const formulario = document.getElementById('formularioProductos');
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();

            // Verificar si el botón es para actualizar o agregar
            const guardarBtn = document.getElementById('guardarBtn');
            const idProducto = guardarBtn.getAttribute('data-id');

            if (guardarBtn.textContent === 'Actualizar') {
                actualizarProducto(idProducto); // Actualizar el producto
            } else {
                agregarProducto(); // Agregar un nuevo producto
            }
        });

        // Inicializar funciones
        updateDateTime();
        obtenerProductos();
    }
});
