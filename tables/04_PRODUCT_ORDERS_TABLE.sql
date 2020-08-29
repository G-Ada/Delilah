CREATE TABLE productOrders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productID INT NOT NULL,
    orderID INT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (productID) REFERENCES products(id),
    FOREIGN KEY (orderID) REFERENCES orders(id)
)