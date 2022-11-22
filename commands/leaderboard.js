const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Lihat peringkat'),
	async execute(interaction) {
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Leaderboard')
            .setDescription('Upss... Command ini belum tersedia')
            .setTimestamp()
            .setFooter({ text: 'anigame'});
        
        await interaction.reply({embeds: [embed]});
	},
};
