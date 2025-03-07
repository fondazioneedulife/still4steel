import jwt from "jsonwebtoken";

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

