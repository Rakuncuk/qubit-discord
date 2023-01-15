const { botToken, guildID, roles: configRoles, logRooms } = require('./config')

const { Client, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: 32767 });

const parseUserID = id => id.startsWith('discord:') ? id.substring(8, id.length) : id

const getUserInfo = id => {
    try {
        const { members } = client.guilds.cache.get(guildID)
        id = parseUserID(id)
        const { user, roles } = members.cache.get(id)

        return {
            username: `${user.username}#${user.discriminator}`,
            roles: Object.fromEntries(roles.cache),
            avatar: user.displayAvatarURL({ dynamic: true, size: 1024 })
        }
    } catch (e) {
        console.log('Error while using getUserInfo', e)
        return null
    }
}

const hasRole = (id, roleID) => {
    try {
        const { members } = client.guilds.cache.get(guildID)
        id = parseUserID(id)
        const { roles } = members.cache.get(id)

        if (configRoles[roleID])
            roleID = configRoles[roleID]

        if (isNaN(roleID))
            return false

        return roles.cache.get(roleID) !== undefined
    } catch (e) {
        console.log('Error while using hasRole', e)
        return false
    }
}

const giveRole = (id, roleID) => {
    try {
        const { members } = client.guilds.cache.get(guildID)
        id = parseUserID(id)
        const { roles } = members.cache.get(id)

        if (configRoles[roleID])
            roleID = configRoles[roleID]

        if (isNaN(roleID))
            return false

        return roles.add(roleID)
    } catch (e) {
        console.log(e, 'Couldn\'t give role to user:', id, e)
    }
}

const removeRole = (id, roleID) => {
    try {
        const { members } = client.guilds.cache.get(guildID)
        id = parseUserID(id)
        const { roles } = members.cache.get(id)

        if (configRoles[roleID])
            roleID = configRoles[roleID]

        if (isNaN(roleID))
            return false

        return roles.remove(roleID)
    } catch (e) {
        console.log(e, 'Couldn\'t remove role from user:', id, e)
    }
}

const sendLog = (roomID, data) => {
    try {
        if (logRooms[roomID])
            roomID = logRooms[roomID]

        if (isNaN(roomID))
            return false

        if (!data.messages)
            return console.log('There must be a "messages" field to send a log.')

        const embed = new EmbedBuilder()
        embed.setColor('#f9f812')
        data.title && embed.setTitle(data.title)
        data.url && embed.setURL(data.url)
        data.author && embed.author(data.author)
        data.description && embed.setDescription(data.description)
        data.thumbnail && embed.setThumbnail(data.thumbnail)
        data.messages && Array.isArray(data.messages) ? embed.addFields(...data.messages) : embed.addFields({ name: 'Message from server', value: data.messages })
        data.image && embed.setImage(data.image)
        data.footer && embed.setFooter(data.footer)
        embed.setTimestamp()

        const channel = client.channels.cache.get(roomID)
        channel.send({ embeds: [embed] })
    } catch (e) {
        console.log('Error occured while sending log:', e)
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.login(botToken);

exports('getUserInfo', getUserInfo)
exports('hasRole', hasRole)
exports('giveRole', giveRole)
exports('sendLog', sendLog)
exports('removeRole', removeRole)