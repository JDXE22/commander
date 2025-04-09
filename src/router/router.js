import { Router } from "express"
import { CommandController } from "../controllers/commandsController.js";

export const commandRouter = ({commandModel})=> {
    const router = Router();

    const commandController = new CommandController({commandModel})

    router.get("/", commandController.getAll)
    
    router.get("/:id", commandController.getById)

    router.get("/:name", commandController.getByName)



    return router;
}