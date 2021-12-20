const express = require("express");
const cors = require("cors");
const goalsDB = require('./goalDB.json')
const app = express();
let goalId = 1

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];
  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get('/api/fortune/', (req, res) => {
  const fortunes = [ 'A friend is a present you give yourself.', 'A good time to finish up old tasks', 'A person is never to old to learn', 'A pleasant suprise is waiting for you', 'all will go well with your new project'
]
  let randomIndex = Math.floor(Math.random() * fortunes.length)
  let randomFortune = fortunes[randomIndex]

  res.status(200).send(randomFortune)
})

app.post('/api/goals/', (req,res) => {
  let {goal} = req.body
  let newGoal = {
    goal,
    id: goalId
  }
  goalId++
  goalsDB.push(newGoal)
  console.log(newGoal)
  res.status(200).send(goalsDB)
})

app.delete('/api/goals/:id', (req,res) => {
    const {id} = req.params
    const index = goalsDB.findIndex((element) => {
      +element.id === +id
    })
    goalsDB.splice(index,1)
    res.status(200).send(goalsDB)
})





app.listen(4004, () => console.log("Server running on 4004"));

