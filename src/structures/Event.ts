import { ClientEvents } from "discord.js";
import Client from "./Client"

export interface Run {
   (client: Client, ...args: any[])
}

export interface Event {
   name: keyof ClientEvents,
}