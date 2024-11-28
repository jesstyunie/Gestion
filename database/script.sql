CREATE DATABASE papeleriaG;
USE papeleriaG;

CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);
select * from inventario;

INSERT INTO inventario (nombre, cantidad, precio) VALUES ("ejemplo", 2, 10);
DESCRIBE ventas;
SELECT fecha FROM ventas LIMIT 10;
SELECT * FROM ventas WHERE DATE(fecha) = CURDATE();
SELECT * FROM ventas WHERE YEARWEEK(fecha, 1) = YEARWEEK(CURDATE(), 1);

SELECT id_venta, producto, cantidad, fecha, total FROM ventas;

select * from ventas;
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    cantidad_vendida INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES inventario(id)
);
