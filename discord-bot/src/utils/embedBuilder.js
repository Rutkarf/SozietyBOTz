const { MessageEmbed } = require('discord.js');

module.exports = {
    createBasicEmbed: (title, description) => {
        return new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },

    createCharacterEmbed: (character, user) => {
        return new MessageEmbed()
            .setColor('#00ff00')
            .setTitle(`Personnage de ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Niveau', value: character.level.toString(), inline: true },
                { name: 'Expérience', value: `${character.experience}/${character.level * 100}`, inline: true },
                { name: 'Communication', value: character.skills.communication.toString(), inline: true },
                { name: 'Participation', value: character.skills.participation.toString(), inline: true },
                { name: 'Leadership', value: character.skills.leadership.toString(), inline: true },
                { name: 'Créativité', value: character.skills.creativity.toString(), inline: true },
                { name: 'Puissance totale', value: character.power.toString(), inline: true }
            )
            .setFooter({ text: 'Gagnez de l\'expérience en participant activement sur le serveur!' });
    },

    createInventoryEmbed: (user, nfts) => {
        const embed = new MessageEmbed()
            .setColor('#ffa500')
            .setTitle(`Inventaire NFT de ${user.username}`)
            .setDescription('Voici vos objets NFT:');

        nfts.forEach(nft => {
            embed.addField(
                `${nft.name} (${nft.rarity})`,
                `ATK: ${nft.stats.attack} | DEF: ${nft.stats.defense} | SPD: ${nft.stats.speed}`,
                true
            );
        });

        return embed;
    },

    createEconomyEmbed: (user) => {
        return new MessageEmbed()
            .setColor('#ffff00')
            .setTitle(`Économie de ${user.username}`)
            .addFields(
                { name: 'Solde R4V3', value: user.balance.toFixed(15), inline: true },
                { name: 'Solde M4T3R', value: user.balanceM4T3R.toString(), inline: true }
            )
            .setFooter({ text: '1 R4V3 = 100,000,000,000,000 M4T3R' });
    },

    createBattleEmbed: (winner, loser, bet) => {
        return new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Résultat du combat')
            .setDescription(`${winner.username} a vaincu ${loser.username}!`)
            .addFields(
                { name: 'Mise', value: `${bet} M4T3R`, inline: true },
                { name: 'Gain', value: `${bet * 2} M4T3R`, inline: true }
            )
            .setFooter({ text: 'Améliorez votre personnage pour augmenter vos chances de victoire!' });
    },

    createShopEmbed: (items) => {
        const embed = new MessageEmbed()
            .setColor('#800080')
            .setTitle('Boutique')
            .setDescription('Voici les articles disponibles:');

        items.forEach(item => {
            embed.addField(
                item.name,
                `Prix: ${item.price} R4V3\nDescription: ${item.description}`,
                false
            );
        });

        return embed;
    }
};
