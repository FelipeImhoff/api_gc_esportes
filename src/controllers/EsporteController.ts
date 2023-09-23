import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class EsporteController {
    async index(request: Request, response: Response){
        const esportes = await prismaClient.esporte.findMany();
        
        if(!esportes.length){
            return response.status(404).json("No esportes found")
        }
        return response.json(esportes)
    }
}