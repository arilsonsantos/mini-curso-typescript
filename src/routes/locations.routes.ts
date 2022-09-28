import { Router } from "express";
import knex from "../database/connection";

const locationsRoute = Router();

type RequestLocation = {
    nome: string;
    imagem: string;
    email: string;
    cidade: string;
    uf: string;
    latitude: number;
    longitude: number;
    items: number[];
};

type ReturnLocation = {
    id: number,
    nome: string;
    imagem: string;
    email: string;
    cidade: string;
    uf: string;
    latitude: number;
    longitude: number;    
    message: string;
}


async function createLocation(req: RequestLocation): Promise<ReturnLocation> {
     const location = {
        nome: req.nome,
        imagem: "fake_imagem.png",
        email: req.email,
        cidade: req.cidade,
        uf: req.uf,
        latitude: req.latitude,
        longitude: req.longitude
    };

    const transaction = await knex.transaction();

    const newIds = await transaction('locations').insert(location);

    const location_id = newIds[0];

    const countItems = await transaction('items').whereIn('id', req.items);

    if(countItems.length === req.items.length) {
        const locationItems = req.items.map((item_id: number) => {
            return {
                item_id,
                location_id
            }
        })
        await transaction('locations_items').insert(locationItems)
        await transaction.commit();
        return {
            id: location_id,
            ... location,
            message: "Location created successfully"
        };        
    }else{ 
        await transaction.rollback();
        return {
            message: "Error: Some items do not exist"
        } as ReturnLocation;
    }        
}

async function getLocations(): Promise<ReturnLocation[]> {
    const locations = await knex('locations').select('*');
    return locations;
}

async function getLocation(id: number): Promise<ReturnLocation> {
    const location = await knex('locations').where('id', id).first();
    return location;
}

locationsRoute.post('/', async (req, res) => {
    return res.json(await createLocation(req.body));
});

locationsRoute.get('/', async (req, res) => {
    return res.json(await getLocations());
});

locationsRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    return res.json(await getLocation(Number(id)));
});

export default locationsRoute;