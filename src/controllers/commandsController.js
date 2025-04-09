export class CommandController{
    constructor({ commandModel}){
        this.commandModel = commandModel
    }

    getAll = (req, res) => {        
        const commands = this.commandModel.getAll()

        res.json(commands)
    }

    getByName = (req, res) => {
        const {name} = req.params
        const commandData = this.commandModel.getByName({name})
        res.json(commandData)
    }
}