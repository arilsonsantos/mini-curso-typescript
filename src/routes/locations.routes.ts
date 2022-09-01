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

    const transaction = await knex.transaction();

    const newIds = await transaction('locations').insert(location);

    const location_id = newIds[0];

    const locationItems = items.map((item_id: number) => {
        return {
            item_id,
            location_id
        }
    })

    await transaction('locations_items').insert(locationItems)

    transaction.commit();

    return res.json({
        id: location_id,
        ... location
    });

});

export default locationsRoute;