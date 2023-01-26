const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

router.get('/pet', (req, res) => {
    res.render('formRegPet');
});

router.get('/dogtable', (req, res) => {
    res.render('dogTable');
});

router.get('/savepet', (req, res) => {
    res.render('savePet');
});

// GET all Pets
router.get('/all/pets', (req, res) => {
    mysqlConnection.query('SELECT * FROM pet', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET A Pet
router.get('/one/pet/:idPet', (req, res) => {
    const { idPet } = req.params;
    mysqlConnection.query('SELECT * FROM pet WHERE idPet = ?', [idPet], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});


// DELETE A Pet
router.delete('/delete/pet/:idPet', (req, res) => {
    const { idPet } = req.params;
    mysqlConnection.query('DELETE FROM pet WHERE idPet = ?', [idPet], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Pet Deleted' });
        } else {
            console.log(err);
        }
    });
});

// INSERT A  Pet
router.post('/insert/Pet', (req, res) => {
    const { idPet, namePet, racePet, colorPet, typePet, statusPet, descriptionPet } = req.body;
    console.log(idPet, namePet, racePet, colorPet, typePet, statusPet, descriptionPet);
    const query = `
    SET @idPet = ?;
    SET @namePet = ?;
    SET @racePet = ?;
    SET @colorPet = ?;
    SET @typePet = ?;
    SET @statusPet = ?;
    SET @descriptionPet = ?;
    INSERT INTO Pet (idPet, namePet, racePet, colorPet, typePet, statusPet, descriptionPet) 
    VALUES (@idPet, @namePet, @racePet, @colorPet, @typePet, @statusPet, @descriptionPet);
  `;
    mysqlConnection.query(query, [idPet, namePet, racePet, colorPet, typePet, statusPet, descriptionPet], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Pet Saved' });
        } else {
            console.log(err);
        }
    });
    return res.redirect('/savepet');
});

//Update a Pet
router.put('/update/pet/:idPet', (req, res) => {
    const { namePet, racePet, colorPet, typePet, statusPet, descriptionPet } = req.body;
    const { idPet } = req.params;
    const query = `
    SET @idPet = ?;
    SET @namePet = ?;
    SET @racePet = ?;
    SET @colorPet = ?;
    SET @typePet = ?;
    SET @statusPet = ?;
    SET @descriptionPet = ?;
    UPDATE pet
    SET
    namePet = @namePet,
    racePet = @racePet, 
    colorPet = @colorPet, 
    typePet = @typePet, 
    statusPet = @statusPet, 
    descriptionPet = @descriptionPet
    WHERE idPet = @idPet;
  `;
    mysqlConnection.query(query, [idPet, namePet, racePet, colorPet, typePet, statusPet, descriptionPet], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Pet Updated' });
        } else {
            console.log(err);
        }
    });
});

//SHOW DATA BASES MYSQL
router.get('/adoppet/galery', (req, res) => {
    res.redirect('/lookpet');

});

//SHOW DATA BASES MYSQL
router.get('/lookpet', (req, res) => {
    mysqlConnection.query('SELECT * FROM pet', (err, rows, fields) => {
        if (!err) {
            res.render('dogTable.ejs', {
                rows
            });
        } else {
            console.log(err);
        }
    });

});

module.exports = router;