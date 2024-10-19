import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";

const model = new Ollama({ model: "llama3.1" });
const parser = new StringOutputParser();

//using prompt template with chaining
const systemTemplate = "Translate the following into {language}:";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

const chaining = promptTemplate.pipe(model).pipe(parser);
console.log(await chaining.invoke({ language: "spanish", text: "hi" }));
