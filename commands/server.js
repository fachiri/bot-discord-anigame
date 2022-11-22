const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('About bot anigame'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('About')
            .setDescription(`Bot ini dibuat dengan ❤️ oleh Fachiri`)
            .setTimestamp()
            .setFooter({ text: 'anigame'});
        
        await interaction.reply({embeds: [embed]});
	},
};
