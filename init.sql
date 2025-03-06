CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    vat VARCHAR(50) UNIQUE NOT NULL,
    tax_code VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL,
    password VARCHAR(200) NOT NULL,
    password_confirm VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note TEXT
);

CREATE TABLE warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    note TEXT,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE
);

INSERT INTO companies (name, vat, tax_code, phone, email, address, password, password_confirm, created_at, note)
VALUES  ('Tech Innovations Srl', 'IT12345678901', 'TIN1234XYZ', '0412345678', 'info@techinnovations.com', 'Via Roma 45, Milano', 'password2025', 'password2025', NOW(), 'Azienda innovativa nel settore tecnologico.'),
        ('Green Energy Solutions', 'IT98765432109', 'GES9876ABC', '0398765432', 'contact@greenenergy.com', 'Viale Europa 12, Torino', 'securePass123', 'securePass123', NOW(), 'Fornitore di soluzioni per energie rinnovabili.'),
        ('Foodie Delight Srl', 'IT11223344556', 'FDL1122QWE', '0634567890', 'support@foodiedelight.com', 'Piazza Maggiore 20, Bologna', 'gusto2025', 'gusto2025', NOW(), 'Ristorante con cucina gourmet.'),
        ('AutoTech Italia', 'IT66778899000', 'ATI7788RTY', '0551234567', 'info@autotechitalia.com', 'Via Firenze 10, Firenze', 'automotive@123', 'automotive@123', NOW(), 'Specializzati in componenti per automobili.'),
        ('Fashion Trends Srl', 'IT99887766554', 'FTS9988WER', '0301234567', 'sales@fashiontrends.com', 'Corso Vittorio Emanuele 120, Napoli', 'style2025', 'style2025', NOW(), 'Azienda di abbigliamento e moda.');

INSERT INTO warehouses (name, address, type, note, company_id)
VALUES  ('Magazzino Centrale Milano', 'Via Milano 100, Milano', 'Stoccaggio', 'Magazzino principale per la gestione delle merci.', 1),
        ('Deposito Torino', 'Strada Torino 45, Torino', 'Logistica', 'Magazzino utilizzato per la distribuzione regionale.', 2),
        ('Centro Distribuzione Bologna', 'Via Bologna 120, Bologna', 'Logistica', 'Magazzino per la gestione degli ordini online.', 3),
        ('Stoccaggio Materie Prime Firenze', 'Via Firenze 55, Firenze', 'Stoccaggio', 'Deposito per materie prime utilizzate nella produzione.', 4),
        ('Magazzino Rimini', 'Via Rimini 10, Rimini', 'Distribuzione', 'Magazzino destinato alla spedizione dei prodotti finiti.', 5);


CREATE TABLE iva (
    iva_id SERIAL PRIMARY KEY,
    rate DECIMAL(5,2) NOT NULL,
    description TEXT
);

INSERT INTO iva (rate, description)
VALUES  (22.00, 'IVA ordinaria'),
        (10.00, 'IVA ridotta per alcuni beni e servizi'),
        (4.00, 'IVA super-ridotta per beni di prima necessità');

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) UNIQUE NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    description TEXT,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    warehouse_id INT REFERENCES warehouses(warehouse_id) ON DELETE CASCADE,
    iva_id INT REFERENCES iva(iva_id) ON DELETE CASCADE
);

INSERT INTO products (name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id)
VALUES  ('Laptop X100', 'LAPX100', 1200.00, 50, 'Laptop di ultima generazione', 1, 1, 1),
        ('Pannello Solare 200W', 'SOL200W', 300.00, 100, 'Pannello solare ad alta efficienza', 2, 2, 2),
        ('Pizza Gourmet', 'PZ123', 12.00, 200, 'Pizza gourmet con ingredienti freschi', 3, 3, 3),
        ('Freni Auto 3000', 'FR3000', 150.00, 80, 'Freni per auto ad alte prestazioni', 4, 4, 1),
        ('Giacca Fashion Trend', 'GIACFT01', 75.00, 150, 'Giacca elegante per stagione autunno-inverno', 5, 5, 2);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

INSERT INTO categories (name, description)
VALUES  ('Elettronica', 'Prodotti tecnologici e dispositivi elettronici'),
        ('Energia', 'Prodotti legati alle energie rinnovabili'),
        ('Cibo', 'Prodotti alimentari e bevande'),
        ('Automobili', 'Accessori e componenti per automobili'),
        ('Moda', 'Abbigliamento e accessori alla moda');

CREATE TABLE product_category (
    product_category_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE
);

INSERT INTO product_category (product_id, category_id)
VALUES  (1, 1),  -- Laptop X100, Categoria Elettronica
        (2, 2),  -- Pannello Solare 200W, Categoria Energia
        (3, 3),  -- Pizza Gourmet, Categoria Cibo
        (4, 4),  -- Freni Auto 3000, Categoria Automobili
        (5, 5);  -- Giacca Fashion Trend, Categoria Moda

CREATE TABLE discounts (
    discount_id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    value DECIMAL(10,2) NOT NULL CHECK (value > 0),
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    state VARCHAR(100) NOT NULL CHECK (state IN ('attivo', 'scaduto', 'inattivo')),
    description TEXT,
    note TEXT
);

INSERT INTO discounts (type, value, date_start, date_end, state, description, note)
VALUES  ('percentuale', 10.00, '2025-02-01', '2025-02-28', 'attivo', 'Sconto del 10% su tutti i prodotti elettronici', 'Promozione valida solo per il mese di febbraio'),
        ('fisso', 5.00, '2025-03-01', '2025-03-15', 'attivo', 'Sconto fisso di 5€ sui prodotti alimentari', 'Offerta speciale per i clienti nuovi');


CREATE TABLE product_discount (
    product_discount_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    discount_id INT REFERENCES discounts(discount_id) ON DELETE CASCADE
);

INSERT INTO product_discount (product_id, discount_id)
VALUES  (1, 1),  -- Laptop X100, Sconto percentuale 10%
        (2, 2),  -- Pannello Solare 200W, Sconto fisso 5€
        (3, 2),  -- Pizza Gourmet, Sconto fisso 5€
        (4, 1),  -- Freni Auto 3000, Sconto percentuale 10%
        (5, 1);  -- Giacca Fashion Trend, Sconto percentuale 10%

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note TEXT
);

INSERT INTO customers (customer_id, first_name, last_name, email, age, created_at, note)
VALUES  ('Giovanni', 'Rossi', 'giovanni.rossi@example.com', '35', NOW(), 'Cliente regolare'),
        ('Maria', 'Bianchi', 'maria.bianchi@example.com', '28', NOW(), 'Cliente VIP'),
        ('Luca', 'Verdi', 'luca.verdi@example.com', '45', NOW(), 'Cliente occasionale');

CREATE TABLE company_customer (
    company_customer_id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE
);

INSERT INTO company_customer (company_id, customer_id)
VALUES  (1, 1),  -- Tech Innovations Srl, Giovanni Rossi
        (2, 2),  -- Green Energy Solutions, Maria Bianchi
        (3, 3);  -- Foodie Delight Srl, Luca Verdi

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note TEXT
);


CREATE TABLE company_supplier (
    company_supplier_id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE CASCADE
);

CREATE TABLE supplies (
    supply_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) UNIQUE NOT NULL,
    date_release TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state BOOLEAN NOT NULL,
    supply_cost DECIMAL(10,2) NOT NULL,
    note TEXT,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE CASCADE
);

CREATE TABLE supply_product (
    supply_product_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    supply_id INT REFERENCES supplies(supply_id) ON DELETE CASCADE
);

CREATE TABLE company_supply (
    company_supply_id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    supply_id INT REFERENCES supplies(supply_id) ON DELETE CASCADE
);

CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    state BOOLEAN NOT NULL,
    note TEXT
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR(100) NOT NULL,
    note TEXT,
    customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    invoice_id INT REFERENCES invoices(invoice_id) ON DELETE CASCADE
);

CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity > 0),
    note TEXT,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE
);

CREATE TABLE renders (
    render_id SERIAL PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity > 0),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state BOOLEAN NOT NULL,
    accept BOOLEAN NOT NULL,
    description TEXT,
    note TEXT,
    order_detail_id INT REFERENCES order_details(order_detail_id) ON DELETE CASCADE
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    method VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL CHECK (state IN ('in attesa', 'completato', 'fallito', 'annullato')),
    note TEXT
);

CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tax DECIMAL(10,2) NOT NULL CHECK (tax >= 0),
    online BOOLEAN NOT NULL,
    note TEXT,
    payment_id INT REFERENCES payments(payment_id) ON DELETE CASCADE,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE
);

CREATE TABLE sale_discount (
    sale_discount_id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(sale_id) ON DELETE CASCADE,
    discount_id INT REFERENCES discounts(discount_id) ON DELETE CASCADE
);

CREATE TABLE sale_payment (
    sale_payment_id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(sale_id) ON DELETE CASCADE,
    payment_id INT REFERENCES payments(payment_id) ON DELETE CASCADE
);

CREATE TABLE logs (
    log_id SERIAL PRIMARY KEY,
    action VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE
);