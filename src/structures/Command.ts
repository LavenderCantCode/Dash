import { Message } from "discord.js"
import Client from "./Client"

export interface Run {
	(client: Client, message: Message, args: String[]);
}

export interface Command {
	name: string;
	category: String;
	description?: string;
	aliases?: Array<string>;
	usages?: Array<string>;
	premium?: boolean;
}