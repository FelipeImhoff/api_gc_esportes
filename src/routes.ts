import { Router } from "express";
import { EsporteController } from "./controllers/EsporteController";

const router = Router();
const esporteController = new EsporteController()

router.get('/esporte', esporteController.index);

export { router };