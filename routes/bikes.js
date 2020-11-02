module.exports = function (app, db) {

    app.get('/bikes', async (req, res) => {
        let data = await db.type.findAll({
            order: [
                [db.bike, 'id', 'asc']
            ],
            include: {
                model: db.bike,
                where: {
                    available: req.query.available
                }
            }
        })

        let bikes = []

        data.forEach(elem => {
            elem.bikes.forEach(el => {
                bikes.push({id: el.id, name: el.name, price: el.price, type: elem.name})
            })
        })

        res.status(200).send(bikes)
    })

    app.delete('/bikes', async (req, res) => {
        await db.bike.destroy({where: {id: req.query.id}})
        res.status(200).send()
    })

    app.post('/bikes', async (req, res) => {

        let isExists = await db.bike.count({where: {name: req.body.name}})

        if (isExists) {
            res.status(400).send({msg: 'Already exists!'});
        } else {
            await db.bike.create({name: req.body.name, price: req.body.price, available: true, typeId: req.body.type});
            res.status(201).send()
        }
    })
}
