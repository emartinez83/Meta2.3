const proyecto = require("../Modelo/Proyecto");


const getAll = async function(req, res) {
    try {
        let p = proyecto.findAll();
        res.json(p);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getByID = async function(req, res) {
    try {
        const id = parseInt(req.params.id, 10); // Parsea el ID de la solicitud como un número entero
        let proyectoEncontrado = proyecto.findByID(id);
        if (proyectoEncontrado) {
            res.json(proyectoEncontrado);
        } else {
            res.status(404).json({ error: "Proyecto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener todos los donadores asociados a un proyecto por ID
const getDonadoresAsociados = async function(req, res) {
    try {
        const idProyecto = parseInt(req.params.id, 10);
        // Lógica para buscar los donadores asociados al proyecto con el ID idProyecto
        const proyectoEncontrado = proyecto.findByID(idProyecto);
        if (!proyectoEncontrado) {
            res.status(404).json({ error: "Proyecto no encontrado" });
            return;
        }

        // Extraer los nombres de los donadores válidos y eliminar los valores null
        const donadoresAsociados = proyectoEncontrado.donadores

        res.json(donadoresAsociados);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


// Obtener el Donatario de un proyecto por ID
const getDonatarioProyecto = async function(req, res) {
    try {
        const idProyecto = parseInt(req.params.id, 10);
        // Lógica para buscar el proyecto correspondiente
        const proyectoEncontrado = proyecto.findByID(idProyecto);
        if (!proyectoEncontrado) {
            res.status(404).json({ error: "Proyecto no encontrado" });
            return;
        }
        // Obtener el donatario asociado al proyecto
        const donatarioAsociado = proyectoEncontrado.donatario;
        if (!donatarioAsociado) {
            res.status(404).json({ error: "Donatario no encontrado" });
            return;
        }
        res.json(donatarioAsociado);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getAll = getAll;
exports.getByID = getByID;
exports.getDonadoresAsociados = getDonadoresAsociados;
exports.getDonatarioProyecto = getDonatarioProyecto;
