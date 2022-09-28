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

    const locationItems = await Promise.all(items.map(async (item_id: number) => {
        const selectedItem = await transaction('items').where('id', item_id).first();

        if (!selectedItem) {
            return false
        }

        return {
            item_id,
            location_id
        }
    }))


    

    if(locationItems[0]) {
        await transaction('locations_items').insert(locationItems)
        await transaction.commit();
        return res.json({
            id: location_id,
            ... location
        });
    } else {
        await transaction.rollback();
        return res.status(400).json({ message: 'Items not found' });
    }

});

export default locationsRoute;