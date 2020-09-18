const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require("nodemailer");

const Device = require('./models/device');
const Route = require('./models/route');
const Detail = require('./models/detail');
const Coordonnee = require('./models/coordonnee');
const Token = require('./models/token');

const userController = require('./controllers/userController');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/user', userController);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server !')
})

app.post('/add/token', async (req, res) => {
    try {
        let token = new Token({
            nom: req.body.token
        });
        let t = await token.save();
        res.status(200).send(t)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/MainActivity', (req, res) => {
    let devices = ["MTS 8000A NO.0", "MTS 8000B NO.1"];
    let routes1 = ["Beja-Bousalem1", "Bousalem2-Beja", "Beja-Garde Nationale ", "Oued Zarga-Bousalem2", "Oued Zarga-Beja"];
    let routes2 = ["Tunis-Garde Nationale", "Garde Nationale-Sousse"];

    res.status(200).send({ devices, routes1, routes2 })
})

app.get('/MapsActivity', (req, res) => {

    let LatLngBoussalem = [
        { lat: 36.610536, lng: 8.973817 },
        { lat: 36.623230, lng: 9.000490 },
        { lat: 36.622584, lng: 9.003355 },
        { lat: 36.624207, lng: 9.027588 },
        { lat: 36.627048, lng: 9.030345 },
        { lat: 36.629648, lng: 9.031611 },
        { lat: 36.627814, lng: 9.034229 },
        { lat: 36.718086, lng: 9.268370 },
        { lat: 36.696886, lng: 9.296306 },
        { lat: 36.703240, lng: 9.336911 },
        { lat: 36.682491, lng: 9.368543 },
        { lat: 36.706456, lng: 9.400132 },
        { lat: 36.661330, lng: 9.460802 },
        { lat: 36.668081, lng: 9.436680 },
    ];

    let LatLngBeja = [
        { lat: 36.733290, lng: 9.183801 },
        { lat: 36.734386, lng: 9.183678 },
        { lat: 36.735835, lng: 9.182641 },
        { lat: 36.738913, lng: 9.185774 },
        { lat: 36.738917, lng: 9.185527 },
        { lat: 36.741612, lng: 9.188488 },
    ];

    res.status(200).send({ LatLngBoussalem, LatLngBeja })
})

app.get('/ChartsActivity', (req, res) => {

    let boussalemSeriesData = [
        { x: "1", value: 0, value2: 0, value3: 14 },
        { x: "10", value: 0, value2: 0, value3: -5 },
        { x: "20", value: 0, value2: 0, value3: -8 },
        { x: "30", value: 0, value2: 0, value3: -10 },
        { x: "40", value: 0, value2: 0, value3: -12 },
        { x: "50", value: 0, value2: 0, value3: -14 },
    ]

    let boussalemRoutes = [
        { event: "1", loss: "- 521.5", distance: "452.36" },
        { event: "2", loss: "- 320.5", distance: "54412.36" },
    ]

    let bejaSeriesData = [
        { x: "1", value: 0, value2: 0, value: 10 },
        { x: "2", value: 0, value2: 0, value: -1 },
        { x: "3", value: 0, value2: 0, value: 0 },
        { x: "4", value: 0, value2: 0, value: 0 },
        { x: "5", value: 0, value2: 0, value: 0 },
    ]

    let bejaRoutes = [
        { event: "1", loss: "- 44.55", distance: "985.35" },
        { event: "2", loss: "- 201.5", distance: "214.36" },
    ]

    res.status(200).send({ boussalemSeriesData, boussalemRoutes, bejaSeriesData, bejaRoutes })
})

app.post('/add/aff', (req, res) => {

    let aff = req.body.aff;

    if (aff > 0.5) {
        async function main() {

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                requireTLS: true,
                auth: {
                    type: 'OAuth2',
                    user: "networkapp2020@gmail.com", // generated ethereal user
                    pass: "network2020" ,// generated ethereal password
                    accessToken: 'ya29.a0AfH6SMBO65jbcx-1uAx0yrAsoCBj-fKamMi66O_IU2FFd53mhxK5He7TPb9dYiAuLpf_b2NrS06p5A_AT2tAXONGTNwihcUNoXw_jMJgegKawYGpVbmEGLk07xgpv3QyutlzpuU7I4d2ri28xyG7x7N0m_YgDv3vTtg'
                }
            });

            let mailOptions = {
                from: '"Support 👨‍💻" <networkapp@gmail.com>', // sender address
                to: "siluekassoum17@yahoo.fr", // list of receivers
                subject: "Evenement constaté ✔", // Subject line
                text: "Evenement constaté", // plain text body
                html: "Vous avez une <b>variation</b> de signal dans la route <b>Oued Zarga - Beja - Bousalem</b> <br/><br/> <a href='https://www.google.com/maps/place/36.675148,+9.435696/@36.6742544,9.4331559,15z'>Voir La Route</a> !" // html body
            };

            let mailOptions2 = {
                from: '"Support 👨‍💻" <networkapp@gmail.com>', // sender address
                to: "guefyeo@gmail.com", // list of receivers
                subject: "Evenement constaté ✔", // Subject line
                text: "Evenement constaté", // plain text body
                html: "Vous avez une <b>variation</b> de signal dans la route <b>Oued Zarga - Beja - Bousalem</b> <br/><br/> <a href='https://www.google.com/maps/place/36.675148,+9.435696/@36.6742544,9.4331559,15z'>Voir La Route</a> !" // html body
            };
            //

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error.message);
                }
                console.log('success');
            });

            transporter.sendMail(mailOptions2, (error, info) => {
                if (error) {
                    return console.log(error.message);
                }
                console.log('success');
            });

        }

        main().catch(console.error);

        res.status(200).send({ action: false });
    } else {
        res.status(200).send({ action: true });
    }

});

app.listen(port, () => {
    console.log("Server started");
})
