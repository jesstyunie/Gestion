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

    // Función de navegación
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
                    <tr data-id="${producto.id}">
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

// Funciones para venta
// Función para registrar una venta
// Función para registrar la venta
// Función para registrar la venta
// Función para registrar la venta
// Función para registrar la venta
async function registrarVenta(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    const productoSelect = document.getElementById('producto');  // Definir aquí para asegurarse de que esté disponible

    const productoId = productoSelect.value;
    const cantidadVendida = parseInt(document.getElementById('cantidad').value);

    // Verificar que los valores sean válidos
    console.log('Producto seleccionado:', productoId);
    console.log('Cantidad vendida:', cantidadVendida);

    if (!productoId || !cantidadVendida || cantidadVendida <= 0) {
        alert('Por favor, selecciona un producto y una cantidad válida.');
        return;
    }

    try {
        // Calcular el total de la venta antes de enviar la solicitud
        const total = await calcularTotal(productoId, cantidadVendida);
        console.log('Total calculado:', total);

        if (total <= 0) {
            alert('El total de la venta es incorrecto.');
            return;
        }

        // Crear el objeto de datos para la venta
        const ventaData = {
            id_producto: productoId,
            cantidad_vendida: cantidadVendida,
            fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),  // Convierte la fecha a formato 'YYYY-MM-DD HH:MM:SS'
            total: total                      // El total calculado
        };

        // Verifica que los datos se envían correctamente
        console.log('Datos enviados:', ventaData);

        // Enviar la venta al backend
        const response = await fetch('http://localhost:3003/ventas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ventaData)
        });

        if (response.ok) {
            alert('Venta registrada correctamente');
            // Actualizar el stock después de registrar la venta
            await actualizarStock(productoId, cantidadVendida);
        } else {
            const error = await response.text(); // Ver para obtener texto de error si ocurre
            console.error('Error en la respuesta del servidor:', error);
            alert('Error al registrar la venta');
        }
    } catch (error) {
        console.error("Error al registrar la venta:", error);
    }
}



// Función para calcular el total de la venta
async function calcularTotal(idProducto, cantidadVendida) {
    const API_URL = 'http://localhost:3003/inventario'; // Ruta del inventario

    try {
        const response = await fetch(`${API_URL}/${idProducto}`);
        const producto = await response.json();
        console.log('Producto recibido:', producto);  // Verifica que el producto tenga precio
        console.log('Precio del producto:', producto.precio); // Verificar el precio recibido

        // Verificar si el precio está disponible y es válido
        const precioProducto = parseFloat(producto.precio);  // Asegurarse de que el precio es un número
        if (producto && !isNaN(precioProducto) && typeof precioProducto === 'number' && cantidadVendida > 0) {
            const total = precioProducto * cantidadVendida;
            console.log('Total calculado:', total);
            return total;
        } else {
            console.error('Producto no válido o precio no disponible');
            return 0;  // Si el precio no es válido o la cantidad no es positiva, retornar 0
        }
    } catch (error) {
        console.error("Error al calcular el total:", error);
        return 0;  // Retornar 0 si hay error al obtener el producto
    }
}


// Función para actualizar el stock del producto
async function actualizarStock(idProducto, cantidadVendida) {
    const API_INVENTARIO_URL = 'http://localhost:3003/inventario'; // Ruta para el inventario

    try {
        // Obtener el producto actual
        const response = await fetch(`${API_INVENTARIO_URL}/${idProducto}`);
        const producto = await response.json();
        console.log('Producto actual:', producto);  // Ver el producto recibido

        if (producto && producto.cantidad >= cantidadVendida) {
            const nuevoStock = producto.cantidad - cantidadVendida;
            console.log('Nuevo stock:', nuevoStock);

            // Actualizar el stock en la base de datos
            const responseActualizarStock = await fetch(`${API_INVENTARIO_URL}/${idProducto}/stock`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cantidad: nuevoStock }),
            });

            if (responseActualizarStock.ok) {
                console.log('Stock actualizado correctamente');
                // Actualizar la tabla de productos
                actualizarFilaProducto(idProducto, nuevoStock); // Actualizar solo la fila correspondiente
            } else {
                console.error('Error al actualizar el stock');
            }
        } else {
            alert('No hay suficiente stock para realizar esta venta');
        }
    } catch (error) {
        console.error("Error al actualizar stock:", error);
    }
}

function actualizarFilaProducto(idProducto, nuevoStock) {
    // Encuentra la fila correspondiente en la tabla
    const fila = document.querySelector(`#tablaProductos tr[data-id="${idProducto}"]`);
    
    if (fila) {
        // Actualiza la celda de la cantidad con el nuevo stock
        const celdaCantidad = fila.querySelector('td:nth-child(3)'); // Suponiendo que la cantidad está en la tercera columna
        if (celdaCantidad) {
            celdaCantidad.textContent = nuevoStock; // Actualiza la cantidad
        }
    }
}


// Función para cargar los productos en el select
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3003/inventario';  // Reemplaza con tu URL de API para obtener productos
    const productoSelect = document.getElementById('producto');
    const registroVentaForm = document.getElementById('registroVentaForm');

    // Función para obtener productos desde la API y llenar el select
    async function cargarProductos() {
        try {
            const response = await fetch(API_URL);
            const productos = await response.json();
            console.log('Productos cargados:', productos);

            // Llenar el select con los productos
            if (productos && productos.length > 0) {
                productos.forEach(producto => {
                    const option = document.createElement('option');
                    option.value = producto.id;  // Usar el ID del producto
                    option.textContent = `${producto.nombre} - (Stock: ${producto.cantidad})`;
                    productoSelect.appendChild(option);
                });
            } else {
                // Si no hay productos, mostrar un mensaje
                const option = document.createElement('option');
                option.textContent = 'No hay productos disponibles';
                productoSelect.appendChild(option);
            }
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }

    // Función para registrar la venta
    registroVentaForm.addEventListener('submit', registrarVenta);

    // Cargar los productos cuando se carga la página
    cargarProductos();
});
