import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class EsporteController {
    async index(request: Request, response: Response){
        const data = await prismaClient.esporte.findMany();
        
        if(!data.length){
            return response.status(404).json("No esportes found")
        }
        return response.json(data)
    }
    
    async store(request: Request, response: Response){
        const { nome, descricao } = request.body;
        const data = await prismaClient.esporte.create({
            data: {
                nome,
                descricao
            }
        })
        
        return response.status(201).json(data)
    }
}