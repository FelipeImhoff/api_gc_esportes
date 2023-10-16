import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'

export class ResultadoController {
  async index(request: Request, response: Response) {
    const data = await prismaClient.resultado.findMany({
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

    if (!data.length) {
      return response.status(404).json('Nenhum resultado encontrado')
    }
    return response.json(data)
  }

  async store(request: Request, response: Response) {
    const { id_equipe, id_campeonato, posicao } = request.body

    if (!id_equipe || !id_campeonato || !posicao) {
      return response.status(400).json({
        Erro: 'Parâmetros ausentes',
        Mensagem: 'Alguns parâmetros obrigatórios estão ausentes na sua solicitação. Certifique-se de incluir todos os parâmetros necessários para a gravação de dados.',
      })
    }

    const data = await prismaClient.resultado.create({
      data: {
        id_campeonato,
        id_equipe,
        posicao,
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

    return response.status(201).json(data)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const data = await prismaClient.resultado.findUnique({
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
    })

    return response.json(data)
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const body = request.body

    const data = await prismaClient.resultado.update({
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
    })

    return response.json(data)
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params
    await prismaClient.resultado.delete({
      where: {
        id,
      },
    })

    return response.status(200).json('Resultado deletado')
  }

  async filter(request: Request, response: Response) {
    const query = request.body
    const data = await prismaClient.resultado.findMany({
      where: query,
      include: {
        equipe: true,
        campeonato: true,
      },
    })

    return response.json(data)
  }
}
