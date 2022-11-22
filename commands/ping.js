const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Test bot!'),
	async execute(interaction) {
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Ping!')
            .setDescription('pang ping pang ping pem perepem peng pem peng')
            .setTimestamp()
            .setFooter({ text: 'anigame'});
        
        await interaction.reply({embeds: [embed]});
	},
};
