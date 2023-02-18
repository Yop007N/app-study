const { application } = require('express');
const express = require('express');
const app = express();

const userRoute = require("../../../../src/route/users/users.route");



//Ruta raiz
app.get('/', function (req, res) {
    //logica
  res.send('Hello World');
});
app.get('/pagina2', function (req, res) {
    /* logicab esta aqui -Controller*/

    res.json({application: 'Study APP', version: '1.0.0'});
});
  /* llamadas a routes de los casos de uso*/
  userRoute(app);
app.listen(3000);