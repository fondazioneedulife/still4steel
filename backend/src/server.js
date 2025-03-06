import app from "./app.js";

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server in esecuzione su http://127.0.0.1:${PORT}`);
  console.log(`Swagger disponibile su http://127.0.0.1:${PORT}/api-docs`);
});