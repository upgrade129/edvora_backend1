module.exports = app => {
    const user = require("../controller/user.controller");
    var router = require("express").Router();

    //check
    router.get("/",(req, res)=> res.status(200).send("user routes are working!"));

    //create a new user
    router.post("/create", user.create);

    //login user
    router.post("/login", user.login);

    //logout single session 
    router.post("/logout", user.logout);

    //change password
    router.patch("/changepassword", user.changePassword);

    //logout all
    router.delete("/logoutall", user.logoutAll);

    app.use('/api/users',router);
}