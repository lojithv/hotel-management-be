module.exports = function(app) {
    const { Auth } = require("../middleware/auth");

    const AuthController = require("../controllers/AuthController");

    app.post("/api/register", AuthController.registerUser);
    app.post("/api/login", AuthController.loginUser);
    app.get("/api/user", Auth, AuthController.getUserDetails);

};