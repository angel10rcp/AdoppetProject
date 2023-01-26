const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bulletin = require('../model/bulletinModel');

router.get('/bulletin', (req, res) => {
    res.render('formBulletin');
});

router.get('/savebulletin', (req, res) => {
    res.render('saveBulletin');
});

// GET all Bulletins
router.get('/all/bulletins', (req, res,next) => {
    Bulletin.find()
    .exec()
    .then(bulletins => res.status(200).json(bulletins))
    .catch(err => res.status(500).json({ error: err }));
});

// GET A Bulletin
router.get('/one/bulletin/:_id', (req, res,next) => {
    const _id = req.params._id;
    Bulletin.findById(_id)
        .exec()
        .then(bulletin => {
            if (bulletin) {
                res.status(200).json(bulletin);
            } else {
                res.status(404).json({ message: 'bulletin not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// DELETE A Bulletin
router.delete('/elimination/bulletin/:bulletinID', (req, res,next) => {
    const { bulletinID } = req.params.bulletinID;
    Bulletin.deleteOne({ idPetBulletin: bulletinID  })
        .exec()
        .then(result => {
            res.redirect(req.get('referer'));
        })
        .catch(err => res.status(500).json({ error: err }));
});

// INSERT A Bulletin
router.post('/insertion/bulletin', (req, res) => {
    
    const bulletin = new Bulletin({
        _id: req.body._id,
        bulletinName: req.body.bulletinName,
        bulletinDescription: req.body.bulletinDescription,
        bulletinType: req.body.bulletinType,
    });
    bulletin
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    res.redirect('/savebulletin');
    return res.redirect('/savebulletin');
});

//Update a Bulletin
router.put('/update/bulletin/:idBulletin',  async(req, res) => {
    const { bulletinName,bulletinDescription, bulletinType } = req.body;
   
    try {
        const bulletin = await Bulletin.findById(req.params._id);
        bulletin.bulletinName = bulletinName;
        bulletin.bulletinDescription= bulletinDescription;
        bulletin.bulletinType= bulletinType;
        await bulletin.save();
        res.json(bulletin);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;