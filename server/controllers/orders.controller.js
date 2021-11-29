
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
    let localDate = new Date().toLocaleString();

    console.log(req.body);

    const insertOrderQuery = `INSERT INTO eshopping.orders (date, orders, email) VALUES ('${localDate}', '${req.body.products}', 'daneshwaranm@gmail.com');`
    try {
        client.execute(insertOrderQuery, [], (err, result) => {
            console.log(result);
            if (err) {
                res.status(404).send({ msg: err })
            } else {
                res.status(200).json({ done: result });
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
        console.log(req);
    }
}