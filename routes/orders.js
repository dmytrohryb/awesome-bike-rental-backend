module.exports = function (app, db) {

    app.delete('/orders', async (req, res) => {
        const t = await db.sequelize.transaction();
        try {
            await db.order.destroy({where: {bikeId: req.query.bikeId}}, { transaction: t });
            await db.bike.update({ available: true}, {where: {id: req.query.bikeId}}, {transaction: t})
            await t.commit();
            res.status(200).send()
        } catch (error) {
            await t.rollback();
            res.status(400).send()
        }
    })

    app.get('/orders', async (req, res) => {
        let data = await db.order.findAll({
            include: {
                model: db.bike,
                where: {
                    available: false
                },
                include: {
                    model: db.type
                }
            }
        })

        let orders = []
        let values = []
        let totalrent = 0

        data.forEach(elem => {
            totalrent += elem.discountPrice * elem.countHours
            values.push({id: elem.bike.id, name: elem.bike.name, price: elem.bike.price, countHours: elem.countHours, quantity: elem.discountPrice, type: elem.bike.type.name})
        })

        orders.push(totalrent)
        orders.push(values)

        res.send(orders)
    })

    app.post('/orders', async (req, res) => {
        const t = await db.sequelize.transaction()
        try{
            await db.bike.update({available: false}, {where: {id: req.body.bikeId}}, {transaction: t})
            await db.order.create({discountPrice: req.body.discountPrice, countHours: req.body.countHours, bikeId: req.body.bikeId}, {transaction: t})
            await t.commit()
            res.status(200).send()
        }catch (e){
            await t.rollback()
            res.status(400).send()
        }
    })
}
