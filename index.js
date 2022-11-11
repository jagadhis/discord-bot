require('dotenv').config({path: "./vars/.env"});
const { Client, GatewayIntentBits } = require('discord.js')
const axios = require('axios');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,

    ]
})
let interval;



client.on('ready',() => {
    console.log(`Logged in as ${client.user.tag}!`);

})
function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
      })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

const prefix = "!";

client.on("messageCreate", async function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  if(command === "inspire"){
    getQuote().then(quote => message.channel.send(quote))
  }
 

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
});

async function getMeme(){
  const res = await axios.get('https://memeapi.pythonanywhere.com/');
  console.log(res.data)
  return res.data.memes[0].url;
}


client.login(process.env.CLIENT_TOKEN);