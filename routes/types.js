module.exports = function (app, db){
    app.get('/types', async (req, res) => {
        let data = await db.type.findAll()
        res.send(data)
    })
}
