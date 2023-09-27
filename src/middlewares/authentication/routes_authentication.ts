import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UsuarioRepository } from "../../repositories/UsuarioRepository";

export class routesAuthentication {
    async auth (req:  Request, res: Response, next: NextFunction){
        try {
            if (process.env.API_AUTH_DEBUG == "TRUE") {
                next();
            } else {
                const { authorization } = req.headers;
    
                if (!authorization) {
                    throw new Error();
                } else {
                    const token = authorization.split(" ")[1];
                    const { id } = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string);
                    const user = await new UsuarioRepository().findId(id);
    
                    if (!user) {
                        throw new Error();
                    } else {
                        next();
                    }
                }
            }
        } catch (error) {
            return res.status(401).json({
                errors: [
                    {
                        field: "",
                        type: "authentication",
                        message: "Unauthorized action!",
                    },
                ],
            });
        }
    }
}