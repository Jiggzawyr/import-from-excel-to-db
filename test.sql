DROP TABLE IF EXISTS test.product;
DROP TABLE IF EXISTS test.inventory;

CREATE TABLE test.inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    autogenerate_code VARCHAR(50),
    item_code VARCHAR(50),
    title VARCHAR(100),
    product_type VARCHAR(50),
    actual_stock DECIMAL(10, 2) NOT NULL,
    search_name VARCHAR(100)
);



CREATE TABLE test.product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    inventory_id INT,
    FOREIGN KEY (inventory_id) REFERENCES test.inventory(inventory_id),
    item_code VARCHAR(50),
    title VARCHAR(100),
    product_type VARCHAR(50),
    actual_stock DECIMAL(10, 2) NOT NULL,
    search_name VARCHAR(100)
);