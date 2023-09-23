-- CreateTable
CREATE TABLE "equipes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "id_esporte" TEXT NOT NULL,

    CONSTRAINT "equipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipes" ADD CONSTRAINT "equipes_id_esporte_fkey" FOREIGN KEY ("id_esporte") REFERENCES "esportes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
