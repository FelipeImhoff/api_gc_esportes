import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class EquipeCampeonatoController {
  async index(request: Request, response: Response) {
    const data = await prismaClient.equipeCampeonato.findMany({
      include: {
        campeonato: {
          include: {
            esporte: true,
          },
        },
        equipe: {
          include: {
            esporte: true,
          },
        },
      },
    });

    if (!data.length) {
      return response
        .status(404)
        .json("Nenhum relacionamento entre equipes e campeonatos econtrado");
    }
    return response.json(data);
  }

  //Validar se esporte da equipe == esporte do campeonato?
  async store(request: Request, response: Response) {
    const { id_equipe, id_campeonato } = request.body;

    if (!id_equipe || !id_campeonato) {
      return response.status(400).json({
        Erro: "Parâmetros ausentes",
        Mensagem:
          "Alguns parâmetros obrigatórios estão ausentes na sua solicitação. Certifique-se de incluir todos os parâmetros necessários para a gravação de dados.",
      });
    }

    const data = await prismaClient.equipeCampeonato.create({
      data: {
        id_campeonato,
        id_equipe,
      },
      include: {
        campeonato: {
          include: {
            esporte: true,
          },
        },
        equipe: {
          include: {
            esporte: true,
          },
        },
      },
    });

    return response.status(201).json(data);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const data = await prismaClient.equipeCampeonato.findUnique({
      where: {
        id,
      },
      include: {
        campeonato: {
          include: {
            esporte: true,
          },
        },
        equipe: {
          include: {
            esporte: true,
          },
        },
      },
    });

    return response.json(data);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const body = request.body;

    const data = await prismaClient.equipeCampeonato.update({
      where: {
        id,
      },
      include: {
        campeonato: {
          include: {
            esporte: true,
          },
        },
        equipe: {
          include: {
            esporte: true,
          },
        },
      },
      data: body,
    });

    return response.json(data);
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;
    await prismaClient.equipeCampeonato.delete({
      where: {
        id,
      },
    });

    return response
      .status(200)
      .json("Relacionamento entre equipe e campeonato deletada");
  }

  async getCampeonatoByEquipe(request: Request, response: Response){
    const { id_equipe } = request.params;
    const data = await prismaClient.equipeCampeonato.findMany({
      where: {
        id_equipe
      },
      include: {
        campeonato: {
          include: {
            esporte: true,
          },
        },
        equipe: {
          include: {
            esporte: true,
          },
        },
      },
    })

    return response.json(data);
  }
}
