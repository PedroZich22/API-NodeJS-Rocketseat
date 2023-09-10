//Rota: receber a requisição e a resposta e repassar para o controller equivalente

//Middleware: interceptadores de requisições
// conhecem a requisição, seu corpo, sua resposta e o destino da requisição
// function myMiddleware(request, response, next) {
// 	if (!request.body.isAdmin) {
// 		return response.json({ message: "user unauthorized" });
// 	}

// 	next();
// }
// usersRoutes.use(myMiddleware);
const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();

//POST
usersRoutes.post("/", usersController.create);
//quando acessar essa rota é interceptado pelo middleware de autenticação
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;
