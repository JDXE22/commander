import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function connect(){
    try {
        await client.connect()
        const database= client.db("database")
        return database.collection("CMD")
    } catch (error) {
            console.error('Error connecting to the database')
    console.error(error)
    await client.close()
    }
}
export class CommandModel {



    getAll = async () => {
      const db = await connect()

      console.log('Connected to MongoDB');
      

      return db.find().toArray()
    };
  
    getById = ({ id }) => {
      if (id) {
        const commandById = commands.find((cmd) => cmd.id === id);
        return commandById;
      }
    };
  
    getByCommand = ({ command }) => {
      if (command) {
        const commandByName = commands.filter(
          (cmd) => cmd.command.toLowerCase() === command.toLowerCase()
        );
        return commandByName;
      }
    };
  
    createCommand = ({ input }) => {
      const newCommand = {
        id: commands.length + 1,
        ...input,
      };
  
      commands.push(newCommand);
  
      return newCommand;
    };
  
    updateCommand = ({ id, input }) => {
      const commandIndex = commands.findIndex((cmd) => cmd.id === id);
      if (commandIndex !== -1) {
        commands[commandIndex] = {
          ...commands[commandIndex],
          ...input,
        };
        return commands[commandIndex];
      }
    };
  
    delete = ({ id }) => {
        const commandById = commands.findIndex((cmd) => cmd.id === id);    
        if (commandById === -1) return false; 
      commands.splice(commandById, 1)
  
      return {message: `Command has been deleted successfully`}
    };
  }
  