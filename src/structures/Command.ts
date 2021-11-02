import { Message, PermissionFlags } from "discord.js"
import Client from "./Client"

export interface Run {
	(client: Client, message: Message, args: String[]);
}

export interface Command {
	name: string;
	category: String;
	description?: string;
	aliases?: Array<string>;
	usage?: string;
	premium?: boolean;
	owner?: boolean;
	permissions?: Array<keyof PermissionFlags>,
	botPermissions?: Array<keyof PermissionFlags>,
}