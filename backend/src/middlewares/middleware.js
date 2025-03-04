import jwt from "jsonwebtoken";

// Middleware per autenticazione JWT
export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Accesso negato. Nessun token fornito." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token non valido." });
  }
};

// Middleware per validare i dati della creazione di un'azienda
export const validateCompanyData = (req, res, next) => {
  const { name, vat, tax_code, email, address, password, password_confirm } = req.body;

  if (!name || !vat || !tax_code || !email || !address || !password || !password_confirm) {
    return res.status(400).json({ error: "Tutti i campi obbligatori devono essere compilati." });
  }

  if (password !== password_confirm) {
    return res.status(400).json({ error: "Le password non corrispondono." });
  }

  next();
};
