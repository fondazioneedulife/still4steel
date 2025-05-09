CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    vat VARCHAR(50) UNIQUE NOT NULL,
    tax_code VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(20) CHECK (phone ~ '^[0-9+\-\s]+$'),
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL CHECK (email LIKE '%@%'),
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    dati BOOLEAN DEFAULT FALSE
);

CREATE TABLE widgets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE TABLE companies_token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(200) NOT NULL,
    expires_at TIMESTAMP NOT NULL, -- 🕒 Scadenza token
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE TABLE warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    note TEXT,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE
);

INSERT INTO companies (name, vat, tax_code, phone, email, address, password, created_at, note, dati)
VALUES  ('Tech Innovations Srl', 'IT12345678901', 'TIN1234XYZ', '0412345678', 'alessandronicolis1@gmail.com', 'Via Roma 45, Milano', 'password2025', NOW(), 'Azienda innovativa nel settore tecnologico.', TRUE),
        ('Green Energy Solutions', 'IT98765432109', 'GES9876ABC', '0398765432', 'contact@greenenergy.com', 'Viale Europa 12, Torino', 'securePass123', NOW(), 'Fornitore di soluzioni per energie rinnovabili.', TRUE),
        ('Foodie Delight Srl', 'IT11223344556', 'FDL1122QWE', '0634567890', 'support@foodiedelight.com', 'Piazza Maggiore 20, Bologna', 'gusto2025', NOW(), 'Ristorante con cucina gourmet.', TRUE),
        ('AutoTech Italia', 'IT66778899000', 'ATI7788RTY', '0551234567', 'info@autotechitalia.com', 'Via Firenze 10, Firenze', 'automotive@123', NOW(), 'Specializzati in componenti per automobili.', TRUE),
        ('Fashion Trends Srl', 'IT99887766554', 'FTS9988WER', '0301234567', 'sales@fashiontrends.com', 'Corso Vittorio Emanuele 120, Napoli', 'style2025', NOW(), 'Azienda di abbigliamento e moda.', TRUE);

INSERT INTO warehouses (name, address, type, note, company_id)
VALUES  ('Magazzino Centrale Milano', 'Via Milano 100, Milano', 'Stoccaggio', 'Magazzino principale per la gestione delle merci.', 1),
        ('Deposito Torino', 'Strada Torino 45, Torino', 'Logistica', 'Magazzino utilizzato per la distribuzione regionale.', 2),
        ('Centro Distribuzione Bologna', 'Via Bologna 120, Bologna', 'Logistica', 'Magazzino per la gestione degli ordini online.', 3),
        ('Magazzino Componenti Auto', 'Via Autostrada 10, Roma', 'Stoccaggio', 'Deposito per componenti e accessori per auto.', 4),
        ('Showroom Napoli', 'Via Napoli 30, Napoli', 'Vendita', 'Spazio espositivo per la vendita di abbigliamento.', 5),
        ('Stoccaggio Materie Prime Firenze', 'Via Firenze 55, Firenze', 'Stoccaggio', 'Deposito per materie prime utilizzate nella produzione.', 1),
        ('Magazzino Rimini', 'Via Rimini 10, Rimini', 'Distribuzione', 'Magazzino destinato alla spedizione dei prodotti finiti.', 2);

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
        ('Pizza Gourmet', 'PZ123', 12.00, 200, 'Pizza gourmet con ingredienti freschi', 1, 3, 3),
        ('Freni Auto 3000', 'FR3000', 150.00, 80, 'Freni per auto ad alte prestazioni', 3, 2, 1),
        ('Giacca Fashion Trend', 'GIACFT01', 75.00, 150, 'Giacca elegante per stagione autunno-inverno', 1, 1, 2);

CREATE TABLE variables (
    variable_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE
);

INSERT INTO variables (name, type, product_id)
VALUES  ('Colore', 'rosso', 5),  -- Giacca Fashion Trend, Colore
        ('Taglia', 'L', 5);  -- Giacca Fashion Trend, Taglia

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

CREATE TABLE prodotti (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  category_id TEXT,
  brand TEXT,
  descrizione TEXT,
  prezzoAcquisto DECIMAL(10,2),
  prezzoVendita DECIMAL(10,2),
  iva_id INTEGER,
  quantita INTEGER,
  quantitaMinima INTEGER,
  nomeFornitore TEXT,
  codice_fornitore TEXT,
  emailFornitore TEXT,
  telefonoFornitore TEXT,
  dataFornitura DATE
);

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

INSERT INTO customers (first_name, last_name, email, age, created_at, note)
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

INSERT INTO suppliers (first_name, last_name, email, phone, created_at, note)
VALUES  ('Marco', 'Conti', 'marco.conti@example.com', '0412345678', NOW(), 'Fornitore di componenti elettronici'),
        ('Sara', 'Galli', 'sara.galli@example.com', '0398765432', NOW(), 'Fornitrice di materie prime per la ristorazione');


CREATE TABLE company_supplier (
    company_supplier_id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE CASCADE
);

INSERT INTO company_supplier (company_id, supplier_id)
VALUES  (1, 1),  -- Tech Innovations Srl, Marco Conti
        (2, 2);  -- Green Energy Solutions, Sara Galli

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

INSERT INTO supplies (name, code, date_release, state, supply_cost, note, product_id, supplier_id)
VALUES  ('Chipset Laptop X100', 'CHIPX100', NOW(), TRUE, 500.00, 'Componenti per la produzione del Laptop X100', 1, 1),
        ('Materie Prime Ristorante', 'MATERIE123', NOW(), TRUE, 200.00, 'Fornitura di ingredienti freschi', 3, 2);

CREATE TABLE supply_product (
    supply_product_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    supply_id INT REFERENCES supplies(supply_id) ON DELETE CASCADE
);

INSERT INTO supply_product (product_id, supply_id)
VALUES  (1, 1),  -- Laptop X100, Chipset Laptop X100
        (3, 2);  -- Pizza Gourmet, Materie Prime Ristorante

CREATE TABLE company_supply (
    company_supply_id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    supply_id INT REFERENCES supplies(supply_id) ON DELETE CASCADE
);

INSERT INTO company_supply (company_id, supply_id)
VALUES  (1, 1),  -- Tech Innovations Srl, Chipset Laptop X100
        (3, 2);  -- Foodie Delight Srl, Materie Prime Ristorante

CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    state BOOLEAN NOT NULL,
    note TEXT
);

INSERT INTO invoices (date, type, description, state, note)
VALUES  (NOW(), 'Vendita', 'Fattura per laptop X100', TRUE, 'Fattura inviata al cliente'),
        (NOW(), 'Vendita', 'Fattura per pannelli solari', TRUE, 'Fattura inviata al cliente');


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR(100) NOT NULL,
    note TEXT,
    customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE,
    invoice_id INT REFERENCES invoices(invoice_id) ON DELETE CASCADE
);

INSERT INTO orders (date, state, note, customer_id, company_id, invoice_id)
VALUES  (NOW(), 'completato', 'Ordine per laptop', 1, 1, 1),
        (NOW(), 'in corso', 'Ordine per pannelli solari', 2, 2, 2);


CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity > 0),
    note TEXT,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE
);

INSERT INTO order_details (quantity, note, product_id, order_id)
VALUES  (1, 'Ordine per laptop X100', 1, 1),
        (5, 'Ordine per pannelli solari', 2, 2);

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

INSERT INTO renders (quantity, date, state, accept, description, note, order_detail_id)
VALUES  (1, NOW(), TRUE, TRUE, 'Rendimento del laptop X100', 'Accettato e spedito', 1),
        (5, NOW(), TRUE, TRUE, 'Rendimento dei pannelli solari', 'Accettato e spedito', 2);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    method VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL CHECK (state IN ('in attesa', 'completato', 'fallito', 'annullato')),
    note TEXT
);

INSERT INTO payments (date_start, date_end, method, state, note)
VALUES  (NOW(), NOW() + INTERVAL '1 day', 'Carta di credito', 'completato', 'Pagamento per laptop X100'),
        (NOW(), NOW() + INTERVAL '1 week', 'Contanti', 'in attesa', 'Pagamento per pizza gourmet');

CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tax DECIMAL(10,2) NOT NULL CHECK (tax >= 0),
    online BOOLEAN NOT NULL,
    note TEXT,
    payment_id INT REFERENCES payments(payment_id) ON DELETE CASCADE,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE
);

INSERT INTO sales (date, tax, online, note, payment_id, order_id)
VALUES  (NOW(), 22.00, TRUE, 'Vendita di laptop X100', 1, 1),
        (NOW(), 10.00, FALSE, 'Vendita di pizza gourmet', 2, 2);

CREATE TABLE sale_discount (
    sale_discount_id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(sale_id) ON DELETE CASCADE,
    discount_id INT REFERENCES discounts(discount_id) ON DELETE CASCADE
);

INSERT INTO sale_discount (sale_id, discount_id)
VALUES  (1, 1),  -- Laptop X100, sconto 10%
        (2, 2);  -- Pizza Gourmet, sconto 5€

CREATE TABLE sale_payment (
    sale_payment_id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(sale_id) ON DELETE CASCADE,
    payment_id INT REFERENCES payments(payment_id) ON DELETE CASCADE
);

INSERT INTO sale_payment (sale_id, payment_id)
VALUES  (1, 1),     -- Laptop X100, carta di credito
        (2, 2);     -- Pizza Gourmet, contante

CREATE TABLE logs (
    log_id SERIAL PRIMARY KEY,
    action VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id INT REFERENCES companies(company_id) ON DELETE CASCADE
);

INSERT INTO logs (action, description, created_at, company_id)
VALUES  ('creazione ordine', 'Creato un nuovo ordine per laptop', NOW(), 1),
        ('modifica sconto', 'Modificato il valore dello sconto per i pannelli solari', NOW(), 2);
