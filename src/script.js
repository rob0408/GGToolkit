// Copyright 2021 GGToolkit
// Gerne im GitHub mithelfen!

import LiquidBounce.category.Categorys
import LiquidBounce.category.CategoryBuilder

Category GGToolkit = Categorys.add(new CategoryBuilder("GGToolkit"))

GGToolkit.append("AutoConfirm", {
    description = "Gibt wenn vom Server verlangt automatisch Befehle wie "/p reset", "/setowner confirm" oder "/checkplot antrag" etc. ein"
    BooleanSettings = [ Plot-Reset, Checkplot, Setowner ]

    HookEventIfEnabled("Message", {
        if (message.type == "Plot-Confirmation") {
            Chat.send("/p confirm")
        } else if (message.type == "Checkplot-Confirmation") {
            Chat.send("/checkplot confirm")
        } else if (message.type == "Setowner-Confirmation") {
            Chat.send("/setowner confirm")
        }
    })
})

GGToolkit.append("AutoGB", {
    description = "Schiesst automatisch auf Mobs und wechselt dann auf das Looting Objekt."
    IntegerSettings = [ Looting-Item Slot, Bogen Slot ]

    HookEventIfEnabled("BowHeld", {
        Bow.chargeUntilFull()
        mc.thePlayer.switchHeldItem(Looting-Item Slot)
        when (Bow.getArrow().hasHit) {
            mc.thePlayer.switchHeldItem(Bogen Slot)
        }
    })
})

GGToolkit.append("AutoIch", {
    description = "Sagt "Ich" oder "me" wenn jemand fragt wer Geld haben will."
    FloatSettings = [ Delay (Sekunden) ]

    HookEventIfEnabled("Message", {
        if (message.attributes.match("wer will |möchte ../ 1-9+k$?\egg \full")) {
            Chat.send(Ich || me)
        }
    })
})

GGToolkit.append("AutoScam", {
    description = "Registriert Item-Bewegungen und reagiert anpassbar. Shift-Click-Proof (Command: .as)"
    MixedSettings = [ Aktion{>/p kick * >.t KillAura >Custom-Nachricht}, Ziel-Slot, Shift-Click Check Slot-Wechsel Hotbar-Slot ]

    HookEventIfEnabled("OpenPlayer", {
        when(WatchSlot(Ziel-Slot).getItem().hasMoved) {
            if (Shift-Click Check) {
                Chat.send("/view %p")

                @IfSettingEnabled
                if (Inventory.heldItem != WatchSlot(Ziel-Slot)) {
                    abort()
                }
            }
            Chat.send(Aktion)
        }
    })
})

GGToolkit.append("BotFinder", {
    description = "Findet Bots durch ihren Namen und gibt die Liste im Chat aus. (Command: .fb)"

    Chat.print("[BotFinder] Spieler die den Kriterien entsprechen:\n\n----------------------------------\n" + FoundBots + "-------------------------").format("GrieferGames")
})

GGToolkit.append("MysteryMod", {
    description = "Sammelt MysteryMod Boni ein."

    HookEventIfEnabled("mysterymod_user_check", {
        sendToServer("mysterymod=true")
    })
})

GGToolkit.credits = "rob0408"
GGToolkit.version = 1.0
