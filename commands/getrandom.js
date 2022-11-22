const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const getData = (URL) => {
    axios
        .get(URL)
        .then( (response) => {
            // salah satu yang menyebalkan dan bikin saya sering lupa
            // axios menambahkan properti "data" untuk menyimpan hasil response nya
            const image = response.data.data.images.jpg.image_url
            const data = response.data.data
            // console.log(data);
            return data
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getrandom')
		.setDescription('Get random anime, manga or character')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Select a categoty')
                .addChoices(
                    { name: 'anime', value: 'anime' },
                    { name: 'manga', value: 'manga' },
                    { name: 'character', value: 'characters' },
                )),
	async execute(interaction) {
        let category = interaction.options.getString('category') ?? 'all';
        let embed = null;

        if (category == 'all') {
            const number = Math.random()
            if (number <= 0.33) {
                category = 'anime'
            } else if (number <= 0.66) {
                category = 'manga'
            } else {
                category = 'characters'
            }
        }

        console.log(category)

        const URL = `https://api.jikan.moe/v4/random/${category}`

        await axios
            .get(URL)
            .then( (response) => {
                result = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
        
        if (category == 'anime' || category == 'manga') {
            embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(result.title)
                .setURL(result.url)
                .setDescription(result.synopsis)
                .addFields(
                    { name: category == 'manga' ? 'Chapters' : 'Episodes', value: category == 'manga' ? `${result.chapters}` : `${result.episodes}`, inline: true },
                    { name: 'Status', value: `${result.status}`, inline: true },
                    { name: 'Rating', value: `${result.score}/10`, inline: true },
                )
                .setImage(result.images.jpg.image_url)
                .setTimestamp()
                .setFooter({ text: 'anigame'});
        }

        if (category == 'characters') {
            embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(result.name)
                .setURL(result.url)
                .setDescription(result.about)
                .addFields(
                    { name: 'Kanji', value: `${result.name_kanji}`, inline: true },
                    { name: 'Favorites', value: `${result.favorites}`, inline: true },
                )
                .setImage(result.images.jpg.image_url)
                .setTimestamp()
                .setFooter({ text: 'anigame'});
        }

        await interaction.reply({embeds: [embed]});
	},
};