-- CreateTable
CREATE TABLE "resultados" (
    "id" TEXT NOT NULL,
    "id_equipe" TEXT NOT NULL,
    "id_campeonato" TEXT NOT NULL,
    "posicao" INTEGER NOT NULL,

    CONSTRAINT "resultados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_id_equipe_fkey" FOREIGN KEY ("id_equipe") REFERENCES "equipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_id_campeonato_fkey" FOREIGN KEY ("id_campeonato") REFERENCES "campeonatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
