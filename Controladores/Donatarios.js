const donatario = require("../Modelo/Donatario");
const proyecto = require("../Modelo/Proyecto");
const getAllDonatarios = async function(req, res) {
    try {
        let donatarios = donatario.findAllDonatarios();
        res.json(donatarios);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getByRFC = async function(req, res) {
    try {
        const rfc = req.params.rfc; // Obtén el RFC de la solicitud
        let donatarioEncontrado = donatario.findByRFC(rfc);
        if (donatarioEncontrado) {
            res.json(donatarioEncontrado);
        } else {
            res.status(404).json({ error: "Donatario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener el Proyecto de un Donatario por RFC
const getProyectoDonatario = async function(req, res) {
    try {
        const rfcDonatario = req.params.rfc;
        const donatarioEncontrado = donatario.findByRFC(rfcDonatario);

        if (!donatarioEncontrado) {
            res.status(404).json({ error: "Donatario no encontrado" });
            return;
        }

        const proyectosAsociados = donatarioEncontrado.proyectoAsociados;

        res.json(proyectosAsociados);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


exports.getAllDonatarios = getAllDonatarios;
exports.getByRFC = getByRFC;
exports.getProyectoDonatario = getProyectoDonatario;