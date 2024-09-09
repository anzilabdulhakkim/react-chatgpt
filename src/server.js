const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
    });
    res.send(completion.data.choices[0].text.trim());
  } 
  catch (error) {
    console.error("Error communicating with OpenAI API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
