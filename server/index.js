// server/index.js
const path = require('path');
const express = require("express")
const PORT = process.env.PORT || 3001
const app = express()
const cohere = require('cohere-ai')
cohere.init('YKYmKzvHw6Rk7HCcIvhiyrkDHUSlCY55Qp2BP2GQ', '2021-11-08')

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", async (req, res) => {
  const prompt = `This is a trivia question and answer generating tool. Trivia answers are factual answers.
  -
  Topic: History
  Q: Who invented penicillin?
  -
  Topic: Entertainment
  Q: What was the first toy to be advertised on television?
  -
  Topic: Sports
  Q: Which two countries have not missed one of the modern-day Olympics?
  -
  Topic: Geography
  Q: What is the smallest country in the world?
  -
  Topic: Music
  Q: Which song by Little Mix was number one on the charts for the longest time?
  -
  Topic: Lord of the Rings
  Q: Who killed Sauron?
  -
  Topic: World Affairs
  Q: What organization was founded in 1920 by the Paris Peace Conference?
  -
  Topic: ${req.query.prompt}` || ''
  // console.log(req.query)
  const response = await cohere.generate('medium', {
    prompt,
    max_tokens: 50,
    temperature: 1,
    k: 0,
    p: 0.75,
    stop_sequences: ['-']
  })
  response.body.prompt = prompt
  res.json(response.body)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
