const express = require("express");
const router = express.Router();
const donadoresController = require("../Controladores/Donadores");

router.get("/", donadoresController.getAllDonadores); // Obtener todos los donadores
router.get("/:rfc", donadoresController.getByRFC); // Obtener un donador por RFC
router.get("/:rfc/proyectos", donadoresController.getProyectosAsociados);

module.exports = router;
