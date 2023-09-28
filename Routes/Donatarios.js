const express = require("express");
const router = express.Router();
const donatariosController = require("../Controladores/Donatarios");

// Obtener todos los donatarios
router.get("/", donatariosController.getAllDonatarios);

// Obtener un donatario por RFC
router.get("/:rfc", donatariosController.getByRFC);

router.get("/:rfc/proyecto", donatariosController.getProyectoDonatario);

module.exports = router;
