const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

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
        try {
            let category = interaction.options.getString('category') ?? 'all';
            var embed = null;
    
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
    
            const response = await axios.get(`https://api.jikan.moe/v4/random/${category}`)
            const result = response.data.data

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
        } catch (e) {
            console.log(e)
            await interaction.reply({embeds: [new EmbedBuilder()
                .setColor('Red')
                .setTitle('Upss...')
                .setURL('https://github.com/fachiri/bot-discord-anigame/issues/new')
                .setDescription("Terjadi kesalahan pada sistem. \n Segera laporkan masalah ini melalui tautan *GitHub Issue* di bawah ini dengan detail tentang masalah yang terjadi. \n\n https://github.com/fachiri/bot-discord-anigame/issues/new. \n\n ***Error Message:*** \n ```"+e.message+"``` \n Terima kasih :pray: :heart:")
                .setTimestamp()
                .setFooter({ text: 'anigame'})
            ]});
        }
	},
};