require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
const Gfycat = require('gfycat-sdk');

const giphyKey = process.env.GIPHY_API_KEY;
const funGeneratorsKey = process.env.FUN_GENERATORS_API_KEY;
const discordToken = process.env.DISCORD_TOKEN;
const gfycatClientId = process.env.GFYCAT_CLIENT_ID;
const gfycatClientSecret = process.env.GFYCAT_API_KEY;

const gfycat = new Gfycat({clientId: gfycatClientId, clientSecret: gfycatClientSecret});

const getGeckoFace = async () => {
    try {
        var response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyKey}&tag=lizard+gecko`);
        return response.data.data.images.original.url;
    } catch (err) {
        console.error(err);
        return err;
    }

};

const getGeckoFaceFromGfycat = async () => {
    try {
        await gfycat.authenticate();

        const options = {
            search_text: 'gecko',
            random: true
          };
           
        const data = await gfycat.search(options);        
        return data.gfycats[0].content_urls.max1mbGif.url;
          
    } catch (err) {
        console.error(err);
        return err;
    }

};

const getGeckoFact = async () => {
    try {
        var response = await axios.get(`http://api.fungenerators.com/fact/random?category=Animal&subcategory=gecko`, { headers: { "X-Fungenerators-Api-Secret": funGeneratorsKey } });
        return response.data.contents.fact;
    } catch (err) {
        console.error(err);
        return err;
    }

};

const getLizardDance = async () => {
    try {
        var response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyKey}&tag=lizard+dance`);
        return response.data.data.images.original.url;
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
            //const face = await getGeckoFaceFromGfycat();
            msg.channel.send(`${face} \n *powered by GIPHY*`);
            break;
        case '!gecko fact':
            const fact = await getGeckoFact();
            msg.reply(fact);
            break;
        // case '!geckspacho':
        //     const dance = await getLizardDance();
        //     msg.reply(dance);
        //     break;
    }
});

client.login(discordToken);


