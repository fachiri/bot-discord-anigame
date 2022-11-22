const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('User')
            .setDescription(`Halo ${interaction.user.username} sayang... 👋 😘`)
            .setTimestamp()
            .setFooter({ text: 'anigame'});
        
        await interaction.reply({embeds: [embed]});
	},
};
