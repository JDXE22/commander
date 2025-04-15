import mongoose from "mongoose";
import { commandSchema } from "../../schemas/mongo-schema/commandSchema.js";

const url = process.env.DATABASE_URL;
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

async function connect() {
  try {
    await mongoose.connect(url, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to the database");
    console.error(error);
    await mongoose.disconnect();
  }
}

const commandMongooseModel = mongoose.model(
  "command",
  commandSchema,
  "commands"
);

connect().then(() => console.log("Connection established."));

export class CommandModel {
  getAll = async () => {
    const result = await commandMongooseModel.find({});

    return result;
  };

  getById = async ({ id }) => {
    const commandId = String(id)

    if (!mongoose.Types.ObjectId.isValid(commandId)) {
      console.log("The id is not a valid ObjectId");
      return null;
    }

    const result = await commandMongooseModel.findById(commandId);

    return result;
  };

  getByCommand = async ({ command }) => {
    const result = await commandMongooseModel.find({ command})

    return result;
  };

    createCommand = async ({ input }) => {
      const command = new commandMongooseModel(input)

      const result = await command.save()

      return result;
    };

  //   updateCommand = ({ id, input }) => {
  //     const commandIndex = commands.findIndex((cmd) => cmd.id === id);
  //     if (commandIndex !== -1) {
  //       commands[commandIndex] = {
  //         ...commands[commandIndex],
  //         ...input,
  //       };
  //       return commands[commandIndex];
  //     }
  //   };

  //   delete = ({ id }) => {
  //     const commandById = commands.findIndex((cmd) => cmd.id === id);
  //     if (commandById === -1) return false;
  //     commands.splice(commandById, 1);

  //     return { message: `Command has been deleted successfully` };
  //   };
}
