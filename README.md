# qubit-discord

### This is a drop-in [Discord](https://discord.com) module for the [Qubit](https://github.com) framework.
#
This module provides additional [Discord](https://discord.com) functions for players and for the overall framework.

### Configuration
You need to edit `config.json` to start using this module.

A default config file should look like this:
```js
module.exports = {
    botToken: 'Your bot token provided by Discord',
    guildID: 'Your Discord server ID',
    roles: {
        exampleRole: 'exampleRoleID',
    },
    logRooms: {
        exampleRoom: 'exampleRoomID'
    }
}
```
### Logging
#### `Qubit.sendLog`
If you are running a server with a lot of players you might run in to issues regarding rate limits.

`Qubit.sendLog` uses the default [discord.js embed parameters](https://discordjs.guide/popular-topics/embeds.html#embed-preview).

```lua
    Qubit.sendLog('exampleRoom', {
        title = "Greeting",
        messages = "Hello there",
        author = {
            name = "Obi-Wan Kenobi",
            iconURL = "https://m.media-amazon.com/images/M/MV5BNzk1MTE3ZmUtMjU2Yi00ZjExLThlZDctYTc0Y2MyYjJmODI1XkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_FMjpg_UX1280_.jpg,
        }
        -- other parameters can be found in the discord.js embed docs.
    })
```
The only required parameters is `messages`.

If you need to send multiple fields at once you can use this function like so:
```lua
    Qubit.sendLog('exampleRoom', {
        title = "A conversation between two esteemed gentlemen",
        messages = {
            { name = 'General Kenobi', value = 'Hello there.' },
            { name = 'General Grievous', value = 'General Kenobi. You are a bold one. Kill him!' },
            { name = 'General Grievous', value = 'Back away! I will deal with this Jedi slime myself.' },
            { name = 'General Kenobi', value = 'Your move.' },
            { name = 'General Grievous', value = 'You fool. I\'ve been trained in your Jedi arts by Count Dooku.' },
            { name = 'General Grievous', value = 'Attack, Kenobi!' },
        },
        author = {
            name = "Obi-Wan Kenobi",
            iconURL = "https://m.media-amazon.com/images/M/MV5BNzk1MTE3ZmUtMjU2Yi00ZjExLThlZDctYTc0Y2MyYjJmODI1XkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_FMjpg_UX1280_.jpg,
        }
        -- other parameters can be found in the discord.js embed docs.
    })
```

#

### Player Management
##### `Player.getUserInfo`
If you have configured the `vip` role in the config before, you can use it like this:
```lua

Qubit.registerCallback('qubit:getDiscordInfo', function(Player, cb)
    local discordInfo = Player.getDiscordInfo()
    --[[ 
        discordInfo = {
            username = "rakun#7680",
            roles = {
                ["roleID"] = {
                    name = "exampleRole",
                    ...
                }
            }
        }
     ]]
     cb(discordInfo)
end)
```

##### `Player.hasRole`
If you have configured the `vip` role in the config before, you can use it like this:
```lua
RegisterServerEvent('qubit-kits:claimVIPKit', function()
    local src = source
    local Player = Qubit.GetPlayer(src)
    if Player.hasRole('exampleRole') then
        ...
    end
end)
```
If not, you can use a roleID to perform the same action like so:
```lua
    if Player.hasRole('1042137534962073661') then
        ...
    end
```
#
##### `Player.giveRole`
You can use this module to give [Discord](https://discord.com) roles to players.
```lua
RegisterServerEvent('qubit-kits:purchasePriority', function()
    local src = source
    local Player = Qubit.GetPlayer(src)
    if Player.removeMoney(1000) then
        Player.giveRole('priority') -- Player.giveRole('1042137534962073661')
    end
end)
```
##### `Player.removeRole`
You can remove roles as well.
```lua
Player.removeRole('priority') -- Player.removeRole('1042137534962073661')
```