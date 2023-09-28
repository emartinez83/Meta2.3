const donador = require("../Modelo/Donadores");
const proyecto = require ("../Modelo/Proyecto")
const getAllDonadores = async function(req, res) {
    try {
        let donadores = donador.findAllDonadores();
        res.json(donadores);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getProyectosAsociados = async function(req, res) {
    try {
        const rfcDonador = req.params.rfc;
        const donadorEncontrado = donador.findByRFC(rfcDonador);

        if (!donadorEncontrado) {
            res.status(404).json({ error: "Donador no encontrado" });
            return;
        }

        // Obtenemos la lista de proyectos asociados al donador
        const proyectosAsociados = donadorEncontrado.proyectosAsociados;

        res.json(proyectosAsociados);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


const getByRFC = async function(req, res) {
    try {
        const rfc = req.params.rfc; // Obtén el RFC de la solicitud
        let donadorEncontrado = donador.findByRFC(rfc);
        if (donadorEncontrado) {
            res.json(donadorEncontrado);
        } else {
            res.status(404).json({ error: "Donador no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getAllDonadores = getAllDonadores;
exports.getByRFC = getByRFC;
exports.getProyectosAsociados = getProyectosAsociados;
