import { Router } from 'express'
import { EsporteController } from './controllers/EsporteController'
import { EquipeController } from './controllers/EquipeController'
import { CampeonatoController } from './controllers/CampeonatoController'
import { EquipeCampeonatoController } from './controllers/EquipeCampeonatoController'
import { ResultadoController } from './controllers/ResultadoController'

const router = Router()
const esporteController = new EsporteController()
const equipeController = new EquipeController()
const campeonatoController = new CampeonatoController()
const resultadoController = new ResultadoController()
const equipeCampeonatoController = new EquipeCampeonatoController()

const esporteRouter = Router()
esporteRouter.get('/', esporteController.index)
esporteRouter.post('/', esporteController.store)
esporteRouter.get('/:id', esporteController.show)
esporteRouter.put('/:id', esporteController.update)
esporteRouter.delete('/:id', esporteController.destroy)

const equipeRouter = Router()
equipeRouter.get('/', equipeController.index)
equipeRouter.post('/', equipeController.store)
equipeRouter.get('/:id', equipeController.show)
equipeRouter.put('/:id', equipeController.update)
equipeRouter.delete('/:id', equipeController.destroy)

const campeonatoRouter = Router()
campeonatoRouter.get('/', campeonatoController.index)
campeonatoRouter.post('/', campeonatoController.store)
campeonatoRouter.get('/:id', campeonatoController.show)
campeonatoRouter.put('/:id', campeonatoController.update)
campeonatoRouter.delete('/:id', campeonatoController.destroy)

const resultadoRouter = Router()
resultadoRouter.get('/', resultadoController.index)
resultadoRouter.post('/', resultadoController.store)
resultadoRouter.get('/:id', resultadoController.show)
resultadoRouter.put('/:id', resultadoController.update)
resultadoRouter.delete('/:id', resultadoController.destroy)

const equipeCampeonatoRouter = Router()
equipeCampeonatoRouter.get('/', equipeCampeonatoController.index)
equipeCampeonatoRouter.post('/', equipeCampeonatoController.store)
equipeCampeonatoRouter.get('/:id', equipeCampeonatoController.show)
equipeCampeonatoRouter.put('/:id', equipeCampeonatoController.update)
equipeCampeonatoRouter.delete('/:id', equipeCampeonatoController.destroy)

//Manter o singular?
router.use('/api/esporte', esporteRouter)
router.use('/api/equipe', equipeRouter)
router.use('/api/campeonato', campeonatoRouter)
router.use('/api/resultado', resultadoRouter)
router.use('/api/equipeCampeonato', equipeCampeonatoRouter)

export { router }
