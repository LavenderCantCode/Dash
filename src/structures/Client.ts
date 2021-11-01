import { config } from "dotenv";
config();
import { Client, Collection } from "discord.js";
import { connect } from "mongoose";
import { Command } from "./Command";
import { SlashCommand } from "./SlashCommand";
import { Event } from "./Event";
import { Config } from "./Config";
import { promisify } from "util";
import { glob } from "glob";
const { TOKEN, DB } = process.env;
const globPromise = promisify(glob);

class Dash extends Client {
	constructor(options = {}) {
		super({
			intents: [
				"GUILDS",
				"GUILD_BANS",
				"GUILD_EMOJIS_AND_STICKERS",
				"GUILD_INTEGRATIONS",
				"GUILD_INVITES",
				"GUILD_MEMBERS",
				"GUILD_MESSAGES",
				"GUILD_MESSAGE_REACTIONS",
				"GUILD_MESSAGE_TYPING",
				"GUILD_PRESENCES",
				"GUILD_VOICE_STATES",
				"GUILD_WEBHOOKS",
			],
			partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
			allowedMentions: {
				repliedUser: false
			}
		});
	}
	public commands: Collection<string, Command> = new Collection();
	public slashCommands: Collection<string, SlashCommand> = new Collection();
	public dontenv: Config = { TOKEN: TOKEN, DB: DB }
	public async init() {
		this.login(TOKEN);
		connect(DB)
			.then(() => {
				console.log(`Connected to database`);
			})
			.catch((err) => {
				console.log(`Failed to connect to database`);
				console.log(err);
			});
		// Commands
		const commandFiles = await globPromise(
			`${process.cwd()}/src/commands/**/*.ts`
		);
		commandFiles.map((value) => {
			const file = require(value);
			const splitted = value.split("/");
			const directory = splitted[splitted.length - 2];
			if (file.command.name) {
				const run = file.run
				const properties = { directory, ...file.command, run};
				this.commands.set(file.command.name, properties);
			}
		});

		// Events
		const eventFiles: string[] = await globPromise(
			`${process.cwd()}/src/events/**/*.ts`
		);
		eventFiles.map(async (evenFile: string) => {
			const event = (await import(evenFile));
			this.on(event.event.name, event.run.bind(null, this));
		});
	}
}

export default Dash;
