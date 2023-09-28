const express = require("express");
const router = express.Router();
const proyectosController = require("../Controladores/Proyecto");

router.get("/",proyectosController.getAll);
router.get("/:id",proyectosController.getByID);
router.get("/:id/donadores", proyectosController.getDonadoresAsociados);
router.get("/:id/donatario", proyectosController.getDonatarioProyecto);

module.exports = router;
