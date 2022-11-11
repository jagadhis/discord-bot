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


const prefix = "!";

client.on("messageCreate", async function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  if(command === "meme"){
    message.channel.send("Here's your meme!");
      const img = await getMeme();
      message.channel.send(img);
  }
  else if (command === "eye"){
    message.channel.send("You are now subscribed to eye reminders.");
       interval = setInterval (function () {
        message.channel.send("Please take an eye break now!")
        .catch(console.error); 
      }, 3600000); 
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