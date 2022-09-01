import { Router } from "express";
import itemsRoute from "./items.routes";
import locationsRoute from "./locations.routes";

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({
        message: "Olá dev!"
    })
});

routes.use('/items', itemsRoute);

routes.use('/locations', locationsRoute);

export default routes;