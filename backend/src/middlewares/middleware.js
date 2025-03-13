import jwt from "jsonwebtoken";

// Middleware per autenticazione JWT
export function authenticateUser(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Prende il token dall'header
  if (!token) return res.status(401).json({ message: "Accesso negato. Nessun token fornito." });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica il token
      req.user = decoded; // Aggiunge i dati dell'utente alla richiesta
      next(); // Passa al prossimo middleware
  } catch (err) {
      res.status(403).json({ message: "Token non valido." });
  }
}

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