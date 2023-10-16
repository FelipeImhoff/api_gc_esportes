import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class EquipeController {
  async index(request: Request, response: Response) {
    const data = await prismaClient.equipe.findMany({
      include: {
        esporte: true,
      },
    })

    if (!data.length) {
      return response.status(404).json('Nenhuma equipe encontrada')
    }
    return response.json(data)
  }

  async store(request: Request, response: Response) {
    const { nome, descricao, id_esporte, id_usuario } = request.body

    if (!nome || !descricao || !id_esporte || !id_usuario) {
      return response.status(400).json({
        Erro: 'Parâmetros ausentes',
        Mensagem: 'Alguns parâmetros obrigatórios estão ausentes na sua solicitação. Certifique-se de incluir todos os parâmetros necessários para a gravação de dados.',
      })
    }

    const data = await prismaClient.equipe.create({
      data: {
        nome,
        descricao,
        id_esporte,
        id_usuario,
      },
      include: {
        esporte: true,
      },
    })

    return response.status(201).json(data)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const data = await prismaClient.equipe.findUnique({
      where: {
        id,
      },
      include: {
        esporte: true,
      },
    })

    return response.json(data)
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const body = request.body

    const data = await prismaClient.equipe.update({
      where: {
        id,
      },
      include: {
        esporte: true,
      },
      data: body,
    })

    return response.json(data)
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params
    await prismaClient.equipe.delete({
      where: {
        id,
      },
    })

    return response.status(200).json('Equipe deletada com sucesso')
  }

  async getEquipeByUsuario(request: Request, response: Response) {
    const { authorization } = request.headers
    const token: string | undefined = authorization?.split(' ')[1]
    if (token) {
      const { id_usuario } = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string) as JwtPayload
      const data = await prismaClient.equipe.findMany({
        where: {
          id_usuario,
        },
        include: {
          esporte: true,
        },
      })
      return response.json(data)
    } else {
      return response.json('Usuário não encontrado')
    }
  }
}
