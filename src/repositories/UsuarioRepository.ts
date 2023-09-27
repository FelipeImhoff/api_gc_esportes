import { prismaClient as prisma } from "../database/prismaClient";

interface data {
    id_google: string;
    nome: string;
    email: string;
    avatar: string;
}

export class UsuarioRepository {
    
    async createUser (data: data) {
        const user = await prisma.usuario.create({
            data,
            select: {
                id: true,
            }
        });

        return user;
    };

    async findId (id: string) {
        const user = await prisma.usuario.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });

        return user;
    };

    async findEmail (email: string) {
        const user = await prisma.usuario.findFirst({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });

        return user;
    };
}