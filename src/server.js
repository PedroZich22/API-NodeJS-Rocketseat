require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const express = require("express");
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

app.use((error, request, response, next) => {
  if (error instanceof AppError)
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// GET
// route params: obrigatório(faz parte da rota)
app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params;
  response.send(`Id da mensagem: ${id}. Para o usuário: ${user}`);
});

//query params: opcional
app.get("/users", (request, response) => {
  const { page, limit } = request.query;

  response.send(`Página: ${page}. Mostrar: ${limit}`);
});
