require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();

const getGeckoFace = async () => {
    try {
        var response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=Cw8x434GrIRGQUKwrT1MYJmVC4EnWVeS&tag=gecko&rating=g`);
        return response.data.data.images.original.url;
    } catch (err) {
        console.error(err);
        return err;
    }

}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    switch (msg.content) {
        case '!gecko face':
            const face = await getGeckoFace();
            msg.channel.send(`${face} \n *powered by GIPHY*`);
            break;
        case '!gecko fact':
            msg.reply(`I can't give you facts yet, but I will be able to soon!`);
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);


