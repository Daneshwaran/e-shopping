
import { client } from '../index.js';

export const authUser = async (req, res) => {
    let getAllUsers = "SELECT * FROM eshopping.users"
    console.log(req.body);
    try {
        client.execute(getAllUsers, [], (err, result) => {
            if (err) {
                res.status(404).send({ msg: err })
            } else {
                let userExist = result.rows.filter((user) => user.email === req.body.email)
                
                if (userExist.length > 0 && userExist[0].password == req.body.password) {
                    res.status(200).json('success');
                } else {
                    res.status(200).json('failed');
                }

            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
        console.log(req);
    }
}