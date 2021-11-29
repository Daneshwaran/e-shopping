import express from 'express';
import bodyParser from 'body-parser';
import cassandra from 'cassandra-driver';
import cors from 'cors';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import usersRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 9042;

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'songs'
});

client.connect()
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

export {
  client
};
