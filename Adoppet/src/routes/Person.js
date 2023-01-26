const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Person = require('../model/personModel');

router.get('/person', (req, res) => {
    res.render('IndexRegPerson');
});

router.get('/adoppet', (req, res) => {
    res.render('IndexAdoppet');
});

router.get('/login', (req, res) => {
    res.render('IndexSignIn');
});

router.get('/logeed', (req, res) => {
    res.render('IndexLogged');
});

//router.get('/prueba', (req, res) => {
//    res.render('prueba');
//});


router.get('/', (req, res) => {
    // Prepare the context
    res.render('hIndexRegPerson', context);
});

//GET all Person
router.get('/', (req, res) => {
    res.render('IndexRegPerson');
});


// GET all person
router.get('/all/person', (req, res,next) => {
    Person.find()
    .exec()
    .then(person => res.status(200).json(person))
    .catch(err => res.status(500).json({ error: err }));
});


//GET A person id

//router.get('/api/one/person/:personID', (req, res) => {
//    const { personID } = req.params;
//    mysqlConnection.query('SELECT * FROM Person WHERE PersonID = ?', [personID], (err, rows, fields) => {
//        if (!err) {
//            res.json(rows[0]);
//        } else {
//            console.log(err);
//        }
//    });
//});


router.get('/one/person/:_id', (req, res,next) => {
    const _id = req.params._id;
    Person.findById(_id)
        .exec()
        .then(person => {
            if (person) {
                res.status(200).json(person);
            } else {
                res.status(404).json({ message: 'person not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


// DELETE A PErson

//router.delete('/api/elimination/person/:personID', (req, res) => {
//    const { personID } = req.params;
//    mysqlConnection.query('DELETE FROM PErson WHERE personID = ?', [personID], (err, rows, fields) => {
//        if (!err) {
//            res.json({ status: 'PErson Deleted' });
//        } else {
//            console.log(err);
//        }
//    });
//});

router.delete('/elimination/person/:personID', (req, res,next) => {
    const { personID } = req.params.personID;
    Person.deleteOne({ _id: personID  })
        .exec()
        .then(result => {
            res.redirect(req.get('referer'));
        })
        .catch(err => res.status(500).json({ error: err }));
});

//authenticate user
router.post('/authentication', (req, res) => {
    const PersonEmail = req.body.PersonEmail;
    const Password = req.body.PersonPassword;
    const query = ` 
    SELECT * FROM person WHERE PersonEmail = ? AND Password = ?  
`;
    mysqlConnection.query(query, [PersonEmail, Password], (err, rows, fields) => {
        if (err) throw err
        if (rows.length <= 0) {
            //req.flash('error', 'Please correct enter email and Password!')
            //alert('Incorrect Username and/or Password!');
            res.redirect('/login');


        } else {
            //req.session.loggedin = true;
            //req.session.name = name;
            res.redirect('/lookbulletin');
        }
    });

});



//SHOW DATA BASES MYSQL
router.get('/lookbulletin', (req, res) => {
    mysqlConnection.query('SELECT * FROM bulletin', (err, rows, fields) => {
        if (!err) {
            res.render('IndexLogged.ejs', {
                rows
            });
        } else {
            console.log(err);
        }
    });

});


// INSERT A Person
router.post('/insertion/person', (req, res) => {
 
    const person = new Person({
        _id: req.body._id,
        personName: req.body.personName,
        password: req.body.password,
        personEmail: req.body.personEmail,
        personPhoneNumber: req.body.personPhoneNumber,
    });
    person
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    res.redirect('/login');
    return res.redirect('/login');
});



//Update a Person
router.put('/update/person/:idPerson',  async(req, res) => {
    const { personName,password, personEmail, personPhoneNumber } = req.body;
    try {
        const person = await Person.findById(req.params._id);
        person.personName = personName;
        person.password= password;
        person.personEmail= personEmail;
        person.personPhoneNumber= personPhoneNumber;
        await person.save();
        res.json(person);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// GET all Messages
router.get('/api/all/messages', (req, res) => {
    mysqlConnection.query('SELECT * FROM messages', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET A Message
router.get('/api/one/message/:messageID', (req, res) => {
    const { messageID } = req.params;
    mysqlConnection.query('SELECT * FROM messages WHERE messageID = ?', [messageID], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// DELETE A Message
router.delete('/api/elimination/message/:messageID', (req, res) => {
    const { messageID } = req.params;
    mysqlConnection.query('DELETE FROM messages WHERE messageID = ?', [messageID], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Message Deleted' });
        } else {
            console.log(err);
        }
    });
});

// INSERT A Message
router.post('/api/insertion/message', (req, res) => {
    const { contactName, contactPhoneNumber, contactEmail, messageContent } = req.body;
    console.log(contactName, contactPhoneNumber, contactEmail, messageContent);
    const query = `
    SET @contactName = ?;
    SET @contactPhoneNumber = ?;
    SET @contactEmail = ?;
    SET @messageContent = ?;
    INSERT INTO messages ( contactName, contactPhoneNumber, contactEmail, messageContent ) 
    VALUES (@contactName, @contactPhoneNumber, @contactEmail, @messageContent);
  `;
    mysqlConnection.query(query, [contactName, contactPhoneNumber, contactEmail, messageContent], (err, rows, fields) => {
        if (!err) {
            //res.json({ status: 'Person Saved' });
            console.log("Guardado");
            //res.redirect('/');
            // res.end('IndexRegPerson');
            // res.redirect('/person');
            //res.redirect('/prueba');
        } else {
            console.log("Error");
        }
    });
    return res.redirect('/adoppet');

});
module.exports = router;