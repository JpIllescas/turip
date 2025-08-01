module.exports = app => {
    const prestamos = require("../controllers/prestamo.controller.js");
    var router = require("express").Router();
    router.post("/create/", prestamos.create);
    router.get("/", prestamos.findAll);
    router.get("/status", prestamos.findAllStatus);
    router.get("/:id", prestamos.findOne);
    router.put("/update/:id", prestamos.update);
    router.delete("/delete/:id", prestamos.delete);
    router.delete("/delete/", prestamos.deleteAll);
    app.use("/api/prestamo", router);
};