//Rota: receber a requisição e a resposta e repassar para o controller equivalente
const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

//Middleware: interceptadores de requisições
// conhecem a requisição, seu corpo, sua resposta e o destino da requisição
// function myMiddleware(request, response, next) {
// 	if (!request.body.isAdmin) {
// 		return response.json({ message: "user unauthorized" });
// 	}

// 	next();
// }

// usersRoutes.use(myMiddleware);
const usersController = new UsersController();

//POST
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;
