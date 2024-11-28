const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3003;

const PDFDocument = require('pdfkit');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // Asegúrate de usar este también si recibes datos en JSON

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
let db;
(async () => {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456', // Cambia esto si tu usuario tiene contraseña
            database: 'papeleriaG',
        });
        console.log('Conectado a MySQL');
    } catch (err) {
        console.error('Error conectando a MySQL:', err);
    }
})();

// Endpoints
app.get('/inventario', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM inventario');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener datos');
    }
});

app.post('/inventario', async (req, res) => {
    const { nombre, cantidad, precio } = req.body;
    try {
        const query = 'INSERT INTO inventario (nombre, cantidad, precio) VALUES (?, ?, ?)';
        await db.execute(query, [nombre, cantidad, precio]);
        res.send('Producto agregado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar producto');
    }
});

app.delete('/inventario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM inventario WHERE id = ?';
        await db.execute(query, [id]);
        res.send('Producto eliminado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar producto');
    }
});

app.put('/inventario/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, cantidad, precio } = req.body;
    try {
        const query = 'UPDATE inventario SET nombre = ?, cantidad = ?, precio = ? WHERE id = ?';
        await db.execute(query, [nombre, cantidad, precio, id]);
        res.send('Producto actualizado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar producto');
    }
});

// RUTA PARA LAS VENTAS
app.post('/ventas', async (req, res) => {
    const { id_producto, cantidad_vendida, fecha, total } = req.body;
    
    console.log('Datos recibidos en el servidor:', req.body);  // Esto es importante para ver si los datos llegan correctamente

    if (!id_producto || !cantidad_vendida || !fecha || !total) {
        return res.status(400).send('Todos los campos (id_producto, cantidad_vendida, fecha, total) son obligatorios');
    }

    try {
        // Primero obtenemos el producto para asegurarnos de que tiene un precio
        const producto = await obtenerProductoPorId(id_producto);
        
        if (!producto || !producto.precio) {
            return res.status(400).send('Producto no válido o precio no disponible');
        }

        // Depurar el precio obtenido
        console.log('Precio del producto:', producto.precio);

        // Ahora calculamos el total basado en el precio del producto
        const totalCalculado = producto.precio * cantidad_vendida;

        // Depurar el total calculado
        console.log('Total calculado:', totalCalculado);

        // Verificamos si el total recibido es igual al total calculado
        if (total !== totalCalculado) {
            return res.status(400).send('El total de la venta es incorrecto. El total calculado es: ' + totalCalculado);
        }

        // Si todo está bien, insertamos la venta
        await db.execute(
            'INSERT INTO ventas (id_producto, cantidad_vendida, fecha, total) VALUES (?, ?, ?, ?)',
            [id_producto, cantidad_vendida, fecha, totalCalculado]
        );

        res.status(200).send('Venta registrada correctamente');
    } catch (error) {
        console.error(error); // Verifica si hay errores en el servidor
        res.status(500).send('Error al registrar la venta');
    }
});



// Supongamos que tienes una ruta para obtener un producto por su ID
// Ruta para obtener un producto por su ID
app.get('/inventario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Obteniendo producto con ID:', id);  // Verifica el ID que se pasa
        const producto = await obtenerProductoPorId(id); // Esta función consulta la base de datos
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});




app.put('/inventario/:id/stock', async (req, res) => {
    const id = req.params.id;
    const { cantidad } = req.body;
    try {
        await db.query('UPDATE inventario SET cantidad = ? WHERE id = ?', [cantidad, id]);
        res.status(200).send('Stock actualizado');
    } catch (error) {
        res.status(500).send('Error al actualizar el stock');
    }
});

// Función para obtener producto por ID con async/await
async function obtenerProductoPorId(id) {
    try {
        const [resultados] = await db.query('SELECT * FROM inventario WHERE id = ?', [id]);
        return resultados[0]; // Devuelve el primer producto encontrado
    } catch (error) {
        throw new Error('Error al obtener producto');
    }
}

app.get('/producto/:id', async (req, res) => {
    const idProducto = req.params.id;
    console.log('Obteniendo producto con ID:', idProducto);

    try {
        const producto = await obtenerProductoPorId(idProducto);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});



//RUTAS REPORTES 
app.get('/reporte-ventas', (req, res) => {
    res.sendFile(__dirname + '/reporteVentas.html');
});

// Ruta para generar el reporte
// Ruta para generar el reporte
app.post('/generar-reporte-pdf', async (req, res) => {
    try {
        const tipoReporte = req.body.reporte;
        let query = '';

        if (tipoReporte === 'diario') {
            query = 'SELECT * FROM ventas WHERE DATE(fecha) = CURDATE()';
        } else if (tipoReporte === 'semanal') {
            query = 'SELECT * FROM ventas WHERE YEARWEEK(fecha, 1) = YEARWEEK(CURDATE(), 1)';
        } else if (tipoReporte === 'mensual') {
            query = 'SELECT * FROM ventas WHERE MONTH(fecha) = MONTH(CURDATE()) AND YEAR(fecha) = YEAR(CURDATE())';
        } else {
            return res.status(400).send('Tipo de reporte no válido');
        }

        const [results] = await db.query(query);
        const PDFDocument = require('pdfkit');
        const fs = require('fs');
        const filePath = __dirname + '/reporte-ventas.pdf';

        const writeStream = fs.createWriteStream(filePath);
        const doc = new PDFDocument();
        doc.pipe(writeStream);

        doc.fontSize(18).text('Reporte de Ventas', { align: 'center' }).moveDown(2);

        results.forEach((venta) => {
            doc.text(`ID Venta: ${venta.id}`);
            doc.text(`Producto: ${venta.id_producto}`);
            doc.text(`Cantidad: ${venta.cantidad_vendida}`);
            doc.text(`Fecha: ${venta.fecha}`);
            doc.text(`Total: $${venta.total}`);
            doc.moveDown();
        });

        doc.end();

        writeStream.on('finish', () => {
            res.download(filePath, 'reporte-ventas.pdf', (err) => {
                if (err) {
                    console.error('Error al descargar el PDF:', err);
                }
                fs.unlinkSync(filePath);  // Eliminar archivo después de la descarga
            });
        });
    } catch (err) {
        console.error('Error al generar PDF:', err);
        res.status(500).send('Error interno del servidor');
    }
});




// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

