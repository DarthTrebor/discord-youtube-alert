require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const cron = require('cronosjs');

const youtubeController = require('./controller/Youtube');
const prefix = process.env.PREFIX;
const moment = require('moment');
let lastVideoId = 0;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if(!message.content.startsWith(prefix)) {
        return;
    }
    const args = message.content.split(" ");
    const song = await youtubeController.getLastVideo(message, args[1]);
    console.log(song);
})

cron.scheduleTask('*/20 * * * *', async () => {
    console.log('test');
    const data = await youtubeController.getLastVideo();
    const channel = client.channels.cache.find(channel => channel.name === "general");
    data.forEach(item => {
        if(item.id.videoId) {
            const posted_at = moment(item.snippet.publishTime);
            const now = moment();
            console.log(item.snippet.title);
            if(item.snippet.videoId !== lastVideoId || lastVideoId === 0) {
                if (now.diff(posted_at, 'seconds') <= 60 * 20) {
                    lastVideoId = item.snippet.videoId;
                    channel.send('Salut, @everyone, am postat un nou videoclip! \n' + 'https://www.youtube.com/watch?v=' + item.id.videoId);
                }
            }
        }
    })
})

client.login(process.env.CLIENT_TOKEN);

