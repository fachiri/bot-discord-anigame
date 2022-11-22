const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Mulai bermain'),
	async execute(interaction) {
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Play')
            .setDescription('Upss... Command ini belum tersedia')
            .setTimestamp()
            .setFooter({ text: 'anigame'});
        
        await interaction.reply({embeds: [embed]});
	},
};
