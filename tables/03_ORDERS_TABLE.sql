CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    delivery_state VARCHAR(100) NOT NULL CHECK(delivery_state IN('NUEVO', 'CONFIRMADO', 'PREPARANDO', 'ENVIANDO', 'CANCELADO', 'ENTREGADO')),
    order_time TIME NOT NULL,
    payment_method VARCHAR(10) NOT NULL CHECK(payment_method IN('EFECTIVO', 'TARJETA')),
    userID INT NOT NULL,
    FOREIGN KEY (userID)
        REFERENCES users(id)
)