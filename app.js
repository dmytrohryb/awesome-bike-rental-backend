const express = require('express')
const app = express()
const port = 4002
const db = require('./db')
const cors = require('cors')
const body_parser = require('body-parser')

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.use(cors())

app.use(function (req, res, next) {

    next();
})

require("./routes/bikes")(app, db)
require("./routes/types")(app, db)
require("./routes/orders")(app, db)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
