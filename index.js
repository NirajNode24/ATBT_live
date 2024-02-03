const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./models')
const Admin_router = require('./Routes/Admin')
const Entite_router = require('./Routes/Entite')
const emailRoute = require('./mail/mail')
const Auth_router = require('./Routes/Auth')
const User_router = require('./Routes/User')
const errorHander = require('./middlewares/errorHandler.middleware')
const routeNotFound = require('./middlewares/routeNotfound.middleware')
const authVerify = require('./middlewares/authVerify.middleware')
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/profile', express.static('Public/Images'));
app.use('/admin', authVerify, Admin_router);
app.use('/entite', Entite_router);
app.use('/api', emailRoute);
app.use('/auth', Auth_router)
app.use('/user', User_router)

app.get('/', (req, res) => {
  res.send("API 1/31/24-0.1")
})
app.use(errorHander);
app.use(routeNotFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})