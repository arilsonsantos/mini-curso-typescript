import { response, Router } from "express";
import knex from "../database/connection";

const locationsRoute = Router();

locationsRoute.post('/', async (req, res) => {
    const {
        nome,
        imagem,
        email,
        cidade,
        uf,
        latitude,
        longitude,
        items
    } = req.body;

     const location = {
        nome,
        imagem: "fake_imagem.png",
        email,
        cidade,
        uf,
        latitude,
        longitude
    };

    const newIds = await knex('locations').insert(location);

    const locationId = newIds[0];

    const locationItems = items.map((i: number) => {
        return {
            item_id: i,
            location_id: locationId
        }
    })

    await knex('locations_items').insert(locationItems)

    return res.json({
        id: locationId,
        ... location
    });

});

export default locationsRoute;