import dotenv from "dotenv";
import OpenAI from "openai";
import { getWeather } from "./weather.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const weatherFunctionSpec = {
  name: "get_weather",
  description:
    "Get the accurate current weather in a given city, temperature in Celsius if requested.",
  parameters: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "The city to check weather for.",
      },
    },
    required: ["city"],
  },
};

const messages = [
  { role: "system", content: "You give short answers." },
  { role: "user", content: "Is it raining in Fulbari, Pokhara?" },
];

//connecting everything
async function main() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      functions: [weatherFunctionSpec],
    });

    //taking first response from AI
    const { message: responseMessage } = response.choices[0];
    messages.push(responseMessage);

    if (responseMessage.function_call?.name === "get_weather") {
      const { city } = JSON.parse(responseMessage.function_call.arguments);
      const weather = await getWeather(city);

      messages.push({
        role: "function",
        name: "get_weather",
        content: weather,
      });

      console.log(weather); // Log the concise response
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
