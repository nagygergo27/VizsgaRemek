const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express= require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin =require("firebase-admin")

var serviceAccount = require("./uservizsgaremek-firebase-adminsdk-fbsvc-227ee2b21e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uservizsgaremek-default-rtdb.europe-west1.firebasedatabase.app"
});

const app=express();

app.use(cors({origin:'*'}));

app.use(bodyParser.json());

const verifyToken= (req,res, next)=>{
    const idToken= req.headers.authorization;

    admin.auth().verifyIdToken(idToken).then(
        (decodeData)=>{
            req.user=decodeData;
            next();
        }
    )
    .catch((error)=>{
        console.log("Hiba a token ellenőrzésekot!");
        res.sendStatus(401);
    })
}


app.get('/users', (req, res) => {
    admin
      .auth()
      .listUsers()
      .then((userRecords) => {
        const users = userRecords.users.map((user) => ({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          claims:user.claims || {}
        }));
        res.json(users);
      })
      .catch((error) => {
        console.error('Hiba történt a felhasználók lekérésekor:', error);
        res.sendStatus(500);
      });
    });

    // {
    //   "uid":"FXiuF4mFw2eXOdpHLQ8QWe8ACzf1",
    //   "claims":{"admin":false}
    //   }

app.post('/setCustomClaims', (req,res)=>{
  const {uid, claims} = req.body
  console.log("uid", uid)
  console.log("claims", claims)
  admin.auth().setCustomUserClaims(uid, claims)
  .then(()=>res.json({message:"OK"}))
  .catch((error)=>{
    console.log("Hiba a claimsok beállításánál! ",error)
    res.sendStatus(500)
  })
})

app.get('/getClaims/:uid', (req,res)=>{
  const {uid}= req.params
  admin.auth().getUser(uid).then(
    (user)=>{
      res.json(user.customClaims || {})
    }
  ).catch((error)=>{
    console.log("Hiba a claimsok lekérdezésénél! ",error)
    res.sendStatus(500)
  }
)})

exports.api =onRequest(app);