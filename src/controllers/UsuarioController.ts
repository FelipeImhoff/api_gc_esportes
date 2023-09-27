import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {PrismaErrors} from "../middlewares/errors/prisma_errors";
import {UsuarioRepository} from "../repositories/UsuarioRepository";

/*
Request: {
  id_google: "sdv13ds21v32sd1",
  nome: "João",
  email: "joão@teste.com.br",
  avatar: "http://teste.com.br/lksdnvklsdvsvdmçdv"
}

Response: {
  id_usuario: 1,
  token: lnlkmdsdv351mdçlvmsdv4sd4v
}
*/

export class UsuarioController {
  async login(req: Request, res: Response) {
    try {
        const { id_google, nome, avatar, email } = req.body;
        const user = await new UsuarioRepository().findEmail(email);

        if (!user) {
            // User não existe.
            let user = { id_google, nome, avatar, email };
            const userCreated = await new UsuarioRepository().createUser(user);

            const token = jwt.sign({ id: userCreated.id }, process.env.JWT_SECRET_TOKEN as string, {
                expiresIn: "7days",
            });

            res.status(201).send({
                id_usuario: userCreated.id,
                token: token,
            });
        } else {
            // User existe.
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_TOKEN as string, {
                expiresIn: "7days",
            });

            res.status(200).send({
                id_usuario: user.id,
                token: token,
            });
        }
    } catch (error) {
        res.status(400).send(new PrismaErrors().mensagem(error));
    }
  }
}

