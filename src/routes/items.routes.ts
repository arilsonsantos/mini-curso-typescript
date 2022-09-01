import { Router } from "express";
import knex from "../database/connection";

const itemsRoute = Router();

itemsRoute.get('/', async (req, res) => {
    const items = await knex('items').select('*');

    const serialized = items.map(i => {
        return {
            id: i.id,
            titulo: i.titulo,
            imagem_url: `http://localhost:333/uploads/${i.imagem}`
        }
    })

    return res.json(serialized);
});

export default itemsRoute;