import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

interface CampeonatoData {
  nome: string;
  descricao: string;
  legenda: string;
  id_esporte: string;
  total_atletas_equipes: number;
  total_equipes: number;
  data_inicio_inscricao: string;
  data_final_inscricao: string;
  horario: string;
  endereco: string;
  bairro: string;
  cidade: string;
}
export class CampeonatoController {
  async index(request: Request, response: Response) {
    const data = await prismaClient.campeonato.findMany();

    if (!data.length) {
      return response.status(404).json("Nenhum campeonato encontrado");
    }
    return response.json(data);
  }

  async store(request: Request, response: Response) {
    const campeonatoData: CampeonatoData = request.body;
    campeonatoData.data_final_inscricao = new Date(
      campeonatoData.data_final_inscricao
    ).toISOString();
    campeonatoData.data_inicio_inscricao = new Date(
      campeonatoData.data_inicio_inscricao
    ).toISOString();

    for (const valor of Object.values(campeonatoData)) {
      if (valor === "" || valor === null || valor === undefined) {
        return response.status(400).json({
          Erro: "Parâmetros ausentes",
          Mensagem:
            "Alguns parâmetros obrigatórios estão ausentes na sua solicitação. Certifique-se de incluir todos os parâmetros necessários para a gravação de dados.",
        });
      }
    }

    const data = await prismaClient.campeonato.create({
      data: campeonatoData,
    });

    return response.status(201).json(data);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const data = await prismaClient.campeonato.findUnique({
      where: {
        id,
      },
    });

    return response.json(data);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const body = request.body;

    const data = await prismaClient.campeonato.update({
      where: {
        id,
      },
      data: body,
    });

    return response.json(data);
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;
    await prismaClient.campeonato.delete({
      where: {
        id,
      },
    });

    return response.status(200).json("Campeonato deletado com sucesso");
  }
}
