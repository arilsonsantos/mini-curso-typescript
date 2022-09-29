import knex from "../database/connection";


export type RequestLocation = {
    nome: string;
    imagem: string;
    email: string;
    cidade: string;
    uf: string;
    latitude: number;
    longitude: number;
    items: number[];
};

export type ReturnLocation = {
    id: number,
    nome: string;
    imagem: string;
    email: string;
    cidade: string;
    uf: string;
    latitude: number;
    longitude: number;    
    message: string;
    itemsName?: string[];
}



export async function createLocation(req: RequestLocation): Promise<ReturnLocation> {
     const location = req;
     location.imagem = 'fake_imagem.png';

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

export async function getLocations(): Promise<ReturnLocation[]> {
    const locations = await knex('locations').select('*');
    return locations;
}

export async function getLocation(id: number): Promise<ReturnLocation> {
    const location = await knex('locations').where('id', id).first();
    return location;
}

export async function updateLocation(id: number, fileName: string): Promise<ReturnLocation> {
    const location = await knex('locations').where('id', id).first();

    const locationUpdated = {
        ...location,
        imagem: fileName
    };

    await knex('locations').update(locationUpdated).where('id', id);

    return locationUpdated;
}

export async function getLocationItems(id: number): Promise<ReturnLocation> {
    const location = await knex('locations').where('id', id).first();

    const itemsTitulos = await knex('items')
        .join('locations_items', 'item_id', '=', 'items.id')
        .where('locations_items.location_id', id)
        .select('items.titulo');

    location.items = itemsTitulos;
    return location;
}

export async function getLocationByItems(itemsId: number[]): Promise<ReturnLocation[]> {
    const locations = await knex('locations')
        .join('locations_items', 'location_id', '=', 'locations.id')
        .whereIn('locations_items.item_id', itemsId)
        .select('locations.*');
    
    return locations;
}

export async function deletetLocation(id: number): Promise<Number> {
    return await knex('locations').where('id', id).delete();
}

