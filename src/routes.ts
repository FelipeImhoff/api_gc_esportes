import { Router } from "express";
import { EsporteController } from "./controllers/EsporteController";
import { EquipeController } from "./controllers/EquipeController";

const router = Router();
const esporteController = new EsporteController();
const equipeController = new EquipeController();

const esporteRouter = Router();
esporteRouter.get("/", esporteController.index);
esporteRouter.post("/", esporteController.store);
esporteRouter.get("/:id", esporteController.show);
esporteRouter.put("/:id", esporteController.update);
esporteRouter.delete("/:id", esporteController.destroy);

const equipeRouter = Router();
equipeRouter.get("/", equipeController.index);
equipeRouter.post("/", equipeController.store);
equipeRouter.get("/:id", equipeController.show);
equipeRouter.put("/:id", equipeController.update);
equipeRouter.delete("/:id", equipeController.destroy);

//outras rotas aqui
router.use("/api/esporte", esporteRouter);
router.use("/api/equipe", equipeRouter);

export { router };
