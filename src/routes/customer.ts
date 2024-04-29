import { Router } from "express";
import { add, deletee, getall, getbyid, update } from "../controllers/customer";  

export const customerRoutes = Router();
customerRoutes.get('/', getall).get("/:id",getbyid).post('/',add).put('/:id',update).delete('/:id',deletee);