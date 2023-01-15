Qubit = exports['qubit']:fetch()

TriggerEvent('qubit:registerPlayerComponent', function(self)
    self.hasRole = function(role)
        if not self.identifiers.discord then
            return false
        end

        return exports['qubit-discord']:hasRole(self.identifiers.discord, role)
    end

    self.giveRole = function(role)
        if not self.identifiers.discord then
            return false
        end

        return exports['qubit-discord']:giveRole(self.identifiers.discord, role)
    end
    
    self.removeRole = function(role)
        if not self.identifiers.discord then
            return false
        end

        return exports['qubit-discord']:removeRole(self.identifiers.discord, role)
    end

    self.getDiscordInfo = function()
        if not self.identifiers.discord then
            return false
        end

        return exports['qubit-discord']:getUserInfo(self.identifiers.discord)
    end
end)

Qubit.RegisterIndex('sendLog', function(...)
    return exports['qubit-discord']:sendLog(...)
end)
