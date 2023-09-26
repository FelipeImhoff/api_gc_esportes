/*
  Warnings:

  - Added the required column `id_usuario` to the `campeonatos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `equipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campeonatos" ADD COLUMN     "id_usuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "equipes" ADD COLUMN     "id_usuario" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "equipeUsuario" (
    "id" TEXT NOT NULL,
    "id_equipe" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "equipeUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "id_google" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipeUsuario" ADD CONSTRAINT "equipeUsuario_id_equipe_fkey" FOREIGN KEY ("id_equipe") REFERENCES "equipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipeUsuario" ADD CONSTRAINT "equipeUsuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
