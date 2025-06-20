import mongoose from "mongoose";
import { commandSchema } from "../../schemas/mongo-schema/commandSchema.js";
import { URL } from "../../config/config.js";

const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

async function connect() {
  try {
    await mongoose.connect(URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
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
connect();
export class CommandModel {
  getAll = async ({query}) => {

    const { limit, page } = query;

    
    const currentlimit = limit ? parseInt(limit) : 5;
    const currentpage = page ? parseInt(page) : 1;
    const skip = (currentpage - 1) * currentlimit;
    const result = await commandMongooseModel.find().skip(skip).limit(currentlimit);
    const total = await commandMongooseModel.countDocuments();
    const totalPages = Math.ceil(total / currentlimit);


    return {
      commands: result,
      totalPages: totalPages,
    }
  };

  getById = async ({ id }) => {
    const commandId = id;

    const result = await commandMongooseModel.findById(commandId);

    return result;
  };

  getByCommand = async ({ command }) => {
    const commandFiltered =
      (await commandMongooseModel.findOne({ command })) || {};
    return commandFiltered;
  };

  createCommand = async ({ input }) => {
    const command = new commandMongooseModel(input);

    const commandExists = await commandMongooseModel.findOne({
      command: input.command,
    });

    if (commandExists) {
      return { message: "Command already exists" };
    }

    const result = await command.save();

    return result;
  };

  updateCommand = async ({ id, input }) => {

    const updatedCommand = await commandMongooseModel.updateOne(
      { _id: id },
      input
    );

    return updatedCommand;
  };

  delete = async ({ id }) => {
    const commandId = String(id);

    const command = await commandMongooseModel.findByIdAndDelete(commandId);

    return { message: `The command has been deleted:` };
  };
}
