const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Mulai bermain'),
	async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Play')
            .setDescription('Pilih Kategori')
            .setTimestamp()
            .setFooter({ text: 'anigame'});

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('play')
					.setLabel('Mulai')
					.setStyle(ButtonStyle.Primary),
			);
        
        await interaction.reply({embeds: [embed], components: [row]});
	},
};
