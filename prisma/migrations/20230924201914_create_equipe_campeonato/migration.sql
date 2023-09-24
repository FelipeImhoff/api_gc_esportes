-- CreateTable
CREATE TABLE "equipes_campeonatos" (
    "id" TEXT NOT NULL,
    "id_equipe" TEXT NOT NULL,
    "id_campeonato" TEXT NOT NULL,

    CONSTRAINT "equipes_campeonatos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipes_campeonatos" ADD CONSTRAINT "equipes_campeonatos_id_equipe_fkey" FOREIGN KEY ("id_equipe") REFERENCES "equipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipes_campeonatos" ADD CONSTRAINT "equipes_campeonatos_id_campeonato_fkey" FOREIGN KEY ("id_campeonato") REFERENCES "campeonatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
