import express from 'express';
import { getOrders, insertOrder } from '../controllers/orders.controller.js'

const router = express.Router();

router
    .route("/")
    .get(getOrders);

router
    .route("/")
    .post(insertOrder);

export default router;
