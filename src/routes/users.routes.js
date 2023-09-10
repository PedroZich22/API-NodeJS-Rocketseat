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
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

//POST
usersRoutes.post("/", usersController.create);
//quando acessar essa rota é interceptado pelo middleware de autenticação
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
