import { Client, CommandInteraction } from "discord.js"

export interface Run {
	(client: Client, interaction: CommandInteraction, args: String[]);
}

export interface SlashCommand {
   name: string,
   description?: string,
   category: string | "Misc",
   options?: Array<object>
   run: Run
}