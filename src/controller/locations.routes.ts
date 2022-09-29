import { Router } from "express";
import { createLocation, deletetLocation, getLocation, getLocations } from "../service/locations.service";


const locationsRoute = Router();

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

locationsRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await deletetLocation(Number(id));
    
    if (deleted > 0){
        return res.status(202).send();
    }else{
        return res.status(404).send({message: 'Id ' + id + ' not found.'});
    }
    
});

export default locationsRoute;