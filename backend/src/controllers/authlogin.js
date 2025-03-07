import jwt from "jsonwebtoken";

export function loginUser(req, res) {
    const { email, password } = req.body;

    // Simuliamo un utente preso dal database
    const user = { id: "123", email: "test@example.com" };

    if (email !== user.email) {
        return res.status(401).json({ message: "Credenziali errate." });
    }

    // Creiamo il token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
}
