
import { client } from '../index.js';

export const getOrders = async (req, res) => {
    let getAllOrders = "SELECT * FROM eshopping.orders"
    try {
        client.execute(getAllOrders, [], (err, result) => {
            if (err) {
                res.status(404).send({ msg: err })
            } else {
                res.status(200).json(result);
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
        console.log(req);
    }
}

export const insertOrder = async (req, res) => {
    let localDate = new Date().toDateString();
    console.log(req.body);
    const queries = req.body.products.map(async (product) => {
        return {
            query: `INSERT INTO eshopping.orders (date, id, quantity) VALUES (?, ?, ?);`,
            params: [localDate, product.id, product.quantity]
        }
    })

    // Promise-based call
    client.batch(queries, { prepare: true })
        .then(function (err, result) {
            if (err) {
                res.status(404).send({ msg: err })
            } else {
                res.status(200).json({ done: 'result' });
            }
        })
        .catch(function (error) {
            // None of the changes have been applied
            res.status(404).json({ message: error.message });
            console.log(error);
            console.log(req);
        });
        
    // try {
    //     client.execute(insertOrderQuery, [], (err, result) => {
    //         console.log('result');
    //         if (err) {
    //             res.status(404).send({ msg: err })
    //         } else {

    //             res.status(200).json({ done: result });
    //         }
    //     })
    // } catch (error) {
    //     res.status(404).json({ message: error.message });
    //     console.log(error);
    //     console.log(req);
    // }
}