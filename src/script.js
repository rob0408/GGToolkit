// Copyright 2021 - 2023 GGToolkit
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

GGToolkit.append("ColorChat", {
    description = "Formatiert deine Nachrichten Regenbogenfarbig im Chat."
    MixedSettings = [ Farbcodes{>Rainbow >Lucky >Frost >Deutschland >WeissGrau >DoppelGelb >DoppelRot >DoppelBlau >DoppelGrün >DoppelGrau >DoppelLila >PinkWeiss >Frühling >Sommer >Herbst >Winter >Weihnachten >Weihnachten-alt >Halloween >Halloween-alt}, Globalchat, Privatnachrichten ]

    HookEventIfEnabled("SendToChat", {
        FormatMessage(GrieferGamesStyle, Farbcodes)
    })
})

GGToolkit.append("AntiCrashSkull", {
    description = "Ersetzt Crash-Skulls durch einen neutralen Kopf."

    HookEventIfEnabled("LoadItem", {
        ReplaceItem(new ItemStack(RedHead, "§cCrash Skull", "von: %p", "UUID: %p.u"))
    })
})

GGToolkit.append("Radar", {
    description = "Hebt besondere Spieler hervor."
    MixedSettings = [ Scammer, rob0408's Rentner, Tomate's Rentner ]

    Listen = { Scammer{"http://newh1ve.de:8080/scammer/scammers", "§c§lSCAMMER"}, Trusted MM's{"http://newh1ve.de:8080/mm/middlemans", "&a&lTRUSTED"}, Rentner (rob0408){"https://pastebin.com/raw/7g1G2j55", "§7§lRENTNER"}, Rentner (Tomate){"http://vps-zap883661-1.zap-srv.com", "§7§lRENTNER"}, Kiddies{"https://pastebin.com/raw/jM0GstVD", "§c§lK§6§lI§e§lD§a§lD§b§lI§d§lE"}, Ausländer{"https://pastebin.com/raw/husq9rcW", "§5§lKANAKE"}, Transen{"https://pastebin.com/raw/J7yX9jL7", "§b§lT§d§lR§f§lA§d§lN§b§lS§d§lE"}, Furrys{"f66a4ec4-6290-4378-93bd-77e25ff5fdf2", "§9§lFURRY"} }
    
    HookEventIfEnabled("LoadPlayerName", {
        SetPrefix(Listen, MixedSettings)
    })
})

GGToolkit.credits = "rob0408"
GGToolkit.version = 1.4
