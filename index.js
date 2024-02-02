const express = require('express')
var bodyParser = require('body-parser')
require('./models')
const multer  = require('multer');
const cors = require('cors')
const storage = require('./utils/store')
const Admin_router = require('./Routes/Admin')
const Entite_router = require('./Routes/Entite')
const emailRoute = require('./mail/mail')
const Auth_router = require('./Routes/Auth')
const User_router = require('./Routes/User')
const errorHander = require('./middlewares/errorHandler.middleware')
const routeNotFound = require('./middlewares/routeNotfound.middleware')
const authVerify = require('./middlewares/authVerify.middleware')
const app = express()
const port = 3000

// middel ware
// parse application/x-www-form-urlencoded
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/admin', authVerify, Admin_router);
app.use('/entite', Entite_router);
app.use('/api', emailRoute);
app.use('/auth', Auth_router)
app.use('/user', User_router)

app.get('/', (req, res) => {
  res.send("API 1/31/24-0.1")

})


const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1000000
  }
})
app.use('/profile', express.static('Public/Images'));

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
  res.status(200).json({
    success: 1,
    profile_url: `https://atbtmain.teksacademy.com/profile/${req.file.filename}`
})
});


app.use(errorHander);
app.use(routeNotFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})