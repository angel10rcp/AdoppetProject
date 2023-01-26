const express = require('express');
const mongoose = require('mongoose');
const LostPet = require('../model/lostPetModel');
const router = express.Router();

router.get('/lostpet', (req, res) => {
    res.render('formLostPet');
});

router.get('/savelostpet', (req, res) => {
    res.render('saveLostPet');
});

router.get('/all/lostpets', (req, res, next) => {
    LostPet.find()
        .exec()
        .then(lostPetList => res.status(200).json(lostPetList))
        .catch(err => res.status(500).json({ error: err }));
});

//Insertar nuevo videojuego
router.post('/new/lostPet', (req, res, next) => {
    const lostPet = new LostPet({
        _id: req.body._id,
        idPetLostPet: req.body.idPetLostPet,
        lostFlagLostPet: req.body.lostFlagLostPet,
        lostPetPlace: req.body.lostPetPlace,
    });
    lostPet
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    res.redirect('/saveLostPet');
});

//Borrar videojuego por nombre
router.delete('/deleting/:_id', (req, res, next) => {
    const _id = req.params._id;
    LostPet.deleteOne({ _id: _id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'LostPet has been deleted'
            });
        })
        .catch(err => res.status(500).json({ error: err }));
});

//Buscar videojuego por nombre
router.get('/search/:_id', (req, res, next) => {
    const _id = req.params._id;
    LostPet.findById(_id)
        .exec()
        .then(lostPet => {
            if (lostPet) {
                res.status(200).json(lostPet);
            } else {
                res.status(404).json({ message: 'LostPet not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

//Buscar videojuego por nombre
router.put('/update/:_id', async(req, res) => {
    const { idPetLostPet, lostFlagLostPet, lostPetPlace } = req.body;
    try {
        const lostPet = await LostPet.findById(req.params._id);
        lostPet.idPetLostPet = idPetLostPet;
        lostPet.lostFlagLostPet = lostFlagLostPet;
        lostPet.lostPetPlace= lostPetPlace;
        await lostPet.save();
        res.json(lostPet);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

//SHOW DATA BASES MYSQL
router.get('/looklostpet', (req, res) => {

    LostPet.find({}, function(err, lostpets) {
        res.render('showLostPet', {
            lostpetsList: lostpets
        })
    })
});

// INSERT A Lost Pet
router.post('/api/insertion/lostpet', (req, res) => {
    const lostPet = new LostPet({
        _id: req.body._id,
        idPetLostPet: req.body.idPetLostPet,
        lostFlagLostPet: req.body.lostFlagLostPet,
        lostPetPlace: req.body.lostPetPlace,
    });
    lostPet
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    res.redirect('/saveLostPet');
});

// DELETE A Lost Pet by Id
router.get('/deletelostpet/:idPetLostPet', (req, res) => {

    const idPetLostPet = req.params.idPetLostPet;
    LostPet.deleteOne({ idPetLostPet: idPetLostPet })
        .exec()
        .then(result => {
            res.redirect(req.get('referer'));
        })
        .catch(err => res.status(500).json({ error: err }));
});

router.get('/editlostpet/:_id', (req, res) => {

    const _id = req.params._id;
    LostPet.findById(_id, function(err, lostpet){
        if (err){
            console.log(err);
        } else {
            res.render("editLostPet.ejs", {onelostpet: lostpet});
        }
    });
});

router.post('/updatelostpet',(req, res) => {

    LostPet.updateOne(
        { idPetLostPet: req.body.idPetLostPet },
        { $set: { lostFlagLostPet: req.body.lostFlagLostPet,lostPetPlace: req.body.lostPetPlace  }},
        (err, respuesta) => {
            if(err){
                res.status(500).send('Error')
            } else {
                res.redirect('/looklostpet');
            }
        }
    )
});

module.exports = router;