import { Router } from "express";
import { EsporteController } from "./controllers/EsporteController";

const router = Router();
const esporteController = new EsporteController();

const esporteRouter = Router();
esporteRouter.get("/", esporteController.index);
esporteRouter.post("/", esporteController.store);
esporteRouter.get("/:id", esporteController.show);
esporteRouter.put("/:id", esporteController.update);

//outras rotas aqui

router.use("/api/esporte", esporteRouter);

export { router };
