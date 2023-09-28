const cors = require("cors");
const express = require("express");
const app = express();
const proyectoController = require("./Controladores/Proyecto");
const donadoresController = require("./Controladores/Donadores");
const donatorioController = require("./Controladores/Donatarios"); // Agregar controlador de donatarios
const proyectoRouter = require("./Routes/Proyectos");
const donadoresRouter = require("./Routes/Donadores"); // Agregar ruta para donadores
const donatoriosRouter = require("./Routes/Donatarios"); // Agregar ruta para donatarios

app.use(cors());
app.use(express.json());
app.use("/proyectos", proyectoRouter); // Utiliza el enrutador de proyectos
app.use("/donadores", donadoresRouter); // Utiliza el enrutador de donadores
app.use("/donatarios", donatoriosRouter); // Utiliza el enrutador de donatarios

const puerto = 3030; // Especifica el puerto en el que deseas que escuche tu servidor
app.listen(puerto, () => {
    console.log(`Server en el puerto ${puerto}`);
});
