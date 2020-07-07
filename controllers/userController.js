const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const { mongoose } = require('./../db/config');

const User = require('./../models/user');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Welcome to user controller");
})

app.get('/all', async (req, res) => {
    let users = await User.find();
    res.status(200).send(users);
})

app.post('/register', (req, res) => {

    let data = req.body;

    let user = new User({
        username: data.username,
        email: data.email,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
        role: "resp"
    });

    user.save()
        .then(() => { res.status(200).send({ action: true }); })
        .catch((e) => { res.status(400).send({ action: true }); })

});

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email }).
        then((user) => {
            if (!user) {
                res.status(404).send({ action: false });
            } else {

                let compare = bcrypt.compareSync(password, user.password);

                if (!compare) {
                    res.status(404).send({ action: false });
                } else {

                    let token = jwt.sign({ id: user._id, role: user.role }, "SEKRITOU");

                    res.status(200).send({ token, action: true });

                }
            }
        })
        .catch((e) => { res.status(400).send({ action: false }); })

});

app.post('/forgotPassword', (req, res) => {

    let email = req.body.email;

    User.findOne({ email }).then((doc) => {
        if (!doc) {
            res.status(404).send({ action: false });
        } else {

            let salt = bcrypt.genSaltSync(10);
            let generatedPassword = genPassword()
            let newpassword = bcrypt.hashSync(generatedPassword, salt);

            async function main() {

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    requireTLS: true,
                    auth: {
                        user: "formalab16@gmail.com", // generated ethereal user
                        pass: "forma.lab.20@16" // generated ethereal password
                    }
                });

                let mailOptions = {
                    from: '"Support 👨‍💻" <formalab16@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Changement mot de passe ✔", // Subject line
                    text: "Nouveau mot de passe", // plain text body
                    html: "<b>Nouveau mot de passe : </b>" + generatedPassword // html body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log('success');
                });

            }

            main().catch(console.error);

            doc.password = newpassword;
            doc.save();
            res.status(200).send({ action: true });
        }
    }).catch((error) => {
        res.status(400).send({ action: false });
    })

});

//FUNCTIONS
function genPassword() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;

    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = app;