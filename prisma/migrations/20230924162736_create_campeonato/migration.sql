-- CreateTable
CREATE TABLE "campeonatos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "legenda" TEXT NOT NULL,
    "id_esporte" TEXT NOT NULL,
    "total_atletas_equipes" INTEGER NOT NULL,
    "total_equipes" INTEGER NOT NULL,
    "data_inicio_inscricao" TIMESTAMP(3) NOT NULL,
    "data_final_inscricao" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,

    CONSTRAINT "campeonatos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "campeonatos" ADD CONSTRAINT "campeonatos_id_esporte_fkey" FOREIGN KEY ("id_esporte") REFERENCES "esportes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
