import TelegramBot from 'node-telegram-bot-api';
import express from 'express'

const token = '6076149880:AAHwz9Cfp8SL69qmWFG3HpnPzmmmKTtvB5w';
const gptToken = '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'

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: gptToken,
});

const openai = new OpenAIApi(configuration);

const app = express()

app.get('/', (req, res) => {
    res.send('server started...')
})

const PORT = process.env.PORT || 3002

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (telegramResponse) => {
    console.log(telegramResponse.text)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: telegramResponse.text,
        temperature: 0,
        max_tokens: 666,
    });
    console.log(response.data.choices[0].text)
    await bot.sendMessage(telegramResponse.chat.id, response.data.choices[0].text);
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})