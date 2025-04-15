import { Router } from "express"
import { CommandController } from "../controllers/commandsController.js";

export const commandRouter = ({commandModel})=> {
    const router = Router();

    const commandController = new CommandController({commandModel})

    router.get("/", commandController.getAll)
    
    router.get("/command/:command", commandController.getByCommand)

    router.get("/:id", commandController.getById)

    router.post("/", commandController.saveCommand)

    router.patch("/command/:id", commandController.updateCommand)

    router.delete("/command/:id", commandController.delete)

    return router;
}