//get obtener, post - crear, put - actualizar, delete - eliminar

const express = require('express');
const cors = require('cors');
const db = require("./db");

//crea apis en formto jason
const app = express();

//conectas los puertos
app.use(cors());

//crea un objeto para transportar
app.use(express.json());

//rutas
app.get('/docentes',(req,res) =>{
    const sql = 'select * from docentes;'

    db.query(sql,(err, results) => {
        if(err){
            return res.status(500).json({error: 'Error al obtener los docentes'});
        }
        res.json(results);
    });
});

app.post('/docentes',(req,res) =>{
    const {nombre,correo,telefono,titulo,area_academica,dedicacion,anios_experiencia} = req.body;

    if (!nombre?.trim() || !correo?.trim() || !telefono?.trim() || !titulo?.trim() || !area_academica?.trim() || !dedicacion?.trim()) {
        return res.status(400).json({error: 'Todos los campos son requeridos'});
    }
    const anios = Number(anios_experiencia);
    if (Number.isNaN(anios) || anios < 0) {
        return res.status(400).json({error: 'Años de experiencia invalidos'});
    }
    const sql = 'insert into docentes(nombre,correo,telefono,titulo,area_academica,dedicacion,anios_experiencia) values(?,?,?,?,?,?,?)';

    db.query(sql, [nombre.trim(), correo.trim(), telefono.trim(), titulo.trim(), area_academica.trim(), dedicacion.trim(), anios], (err, result) =>{
        if (err) {
            return res.status(500).json({error: 'Error al guardar los docentes'});
        }
        res.json({
            id: result.insertId,
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            titulo: titulo.trim(),
            area_academica: area_academica.trim(),
            dedicacion: dedicacion.trim(),
            anios_experiencia: anios
        });
    });
});

app.put('/docentes/:id',(req,res) =>{
    const {id} = req.params;
    const {nombre,correo,telefono,titulo,area_academica,dedicacion,anios_experiencia} = req.body;

    if (!nombre?.trim() || !correo?.trim() || !telefono?.trim() || !titulo?.trim() || !area_academica?.trim() || !dedicacion?.trim()) {
        return res.status(400).json({error: 'Todos los campos son requeridos'});
    }
    const anios = Number(anios_experiencia);
    if (Number.isNaN(anios) || anios < 0) {
        return res.status(400).json({error: 'Años de experiencia invalidos'});
    }
    const sql = 'update docentes set nombre=?,correo=?,telefono=?,titulo=?,area_academica=?,dedicacion=?,anios_experiencia=? where id=?';

    db.query(sql, [nombre.trim(), correo.trim(), telefono.trim(), titulo.trim(), area_academica.trim(), dedicacion.trim(), anios, id], (err) =>{
        if (err) {
            return res.status(500).json({error: 'Error al actualizar al docente'});
        }
        res.json({message: 'Docente actulizado'});
    });
});



app.delete('/docentes/:id',(req,res) =>{
    const {id} = req.params;

    const sql = 'DELETE FROM docentes where id=?';

    db.query(sql, [ id], (err) =>{
        if (err) {
            return res.status(500).json({error: 'Error al eliminar al docente'});
        }
        res.json({message: 'Docente eliminado'});
    });
});

app.listen(3001,() => {
    console.log('Servidor corriendo desde el puerto 3001')
})