require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();

const giphyKey = process.env.GIPHY_API_KEY;
const funGeneratorsKey = process.env.FUN_GENERATORS_API_KEY;
const discordToken = process.env.DISCORD_TOKEN;

const getGeckoFace = async () => {
    try {
        var response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyKey}&tag=gecko&rating=g`);
        return response.data.data.images.original.url;
    } catch (err) {
        console.error(err);
        return err;
    }

}

const getGeckoFact = async() => {
    try {
        var response = await axios.get(`http://api.fungenerators.com/fact/random?category=Animal&subcategory=gecko`, { headers: { "X-Fungenerators-Api-Secret": funGeneratorsKey } });
        return response.data.contents.fact;
    } catch (err) {
        console.error(err);
        return err;
    }

};

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
            const fact = await getGeckoFact();
            msg.reply(fact);
            break;
    }
});

client.login(discordToken);


