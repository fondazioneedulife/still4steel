import app from "./app.js"; // Aggiungi l'estensione .js

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
