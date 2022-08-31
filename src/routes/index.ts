import { Router } from "express";
import itemsRoute from "./items.route";

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({
        message: "Olá dev!"
    })
});

routes.use('/items', itemsRoute);

export default routes;