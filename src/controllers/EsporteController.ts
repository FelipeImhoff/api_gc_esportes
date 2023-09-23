import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class EsporteController {
  async index(request: Request, response: Response) {
    const data = await prismaClient.esporte.findMany();

    if (!data.length) {
      return response.status(404).json("Nenhum esporte encontrado");
    }
    return response.json(data);
  }

  async store(request: Request, response: Response) {
    const { nome, descricao } = request.body;

    if (nome || descricao) {
      return response.status(400).json({
        Erro: "Parâmetros ausentes",
        Mensagem:
          "Alguns parâmetros obrigatórios estão ausentes na sua solicitação. Certifique-se de incluir todos os parâmetros necessários para a gravação de dados.",
      });
    }

    const data = await prismaClient.esporte.create({
      data: {
        nome,
        descricao,
      },
    });

    return response.status(201).json(data);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const data = await prismaClient.esporte.findUnique({
      where: {
        id,
      },
    });

    return response.json(data);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const body = request.body;

    const data = await prismaClient.esporte.update({
      where: {
        id,
      },
      data: body,
    });

    return response.json(data);
  }
}
