const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', // Cambia esto si tu usuario tiene contraseña
    database: 'papeleriaG',
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Endpoints
app.get('/inventario', (req, res) => {
    db.query('SELECT * FROM inventario', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener datos');
        } else {
            res.json(results);
        }
    });
});

app.post('/inventario', (req, res) => {
    const { nombre, cantidad, precio } = req.body;
    const query = 'INSERT INTO inventario (nombre, cantidad, precio) VALUES (?, ?, ?)';
    db.query(query, [nombre, cantidad, precio], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al agregar producto');
        } else {
            res.send('Producto agregado');
        }
    });
});

app.delete('/inventario/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM inventario WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar producto');
        } else {
            res.send('Producto eliminado');
        }
    });
});

app.put('/inventario/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, cantidad, precio } = req.body;
    const query = 'UPDATE inventario SET nombre = ?, cantidad = ?, precio = ? WHERE id = ?';
    db.query(query, [nombre, cantidad, precio, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar producto');
        } else {
            res.send('Producto actualizado');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


//RUTA PARA LAS VENTAS 
// Ruta para registrar ventas
app.post('/ventas', async (req, res) => {
    const { id_producto, cantidad_vendida, fecha, total } = req.body;
    
    try {
        // Registrar la venta en la base de datos
        await db.query('INSERT INTO ventas (id_producto, cantidad_vendida, fecha, total) VALUES (?, ?, ?, ?)', [id_producto, cantidad_vendida, fecha, total]);

        res.status(200).send('Venta registrada correctamente');
    } catch (error) {
        res.status(500).send('Error al registrar la venta');
    }
});

// Ruta para actualizar el inventario
app.put('/inventario/:id', async (req, res) => {
    const id = req.params.id;
    const { cantidad } = req.body;

    try {
        // Actualizar el stock del producto
        await db.query('UPDATE inventario SET cantidad = ? WHERE id = ?', [cantidad, id]);

        res.status(200).send('Stock actualizado');
    } catch (error) {
        res.status(500).send('Error al actualizar el stock');
    }
});
