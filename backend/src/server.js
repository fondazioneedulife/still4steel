import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
  console.log(`Swagger disponibile su http://localhost:${PORT}/api-docs`);
});
