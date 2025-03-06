import app from "./app.js";

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server in esecuzione su http://0.0.0.0:${PORT}`);
  console.log(`Swagger disponibile su http://0.0.0.0:${PORT}/api-docs`);
});