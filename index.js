import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Ollama } from "@langchain/ollama";

const model = new Ollama({ model: "llama3.1" });

const messages = [
  new SystemMessage("Translate the following from English into Nepali "),
  new HumanMessage("What is your name?"),
];

const parser = new StringOutputParser();

//without chaining
// const result = await model.invoke(messages);
// const parsedResult = await parser.invoke(result);
// console.log(parsedResult);

//with chaining
const chain = model.pipe(parser);
const result = await chain.invoke(messages);
// console.log(result);
