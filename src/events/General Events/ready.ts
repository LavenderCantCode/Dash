import { Event, Run } from "../../structures/Event";

export const event: Event = {
   name: "ready"
}
export const run: Run = (client) => {
   console.log(client.user.tag + " is now online")
   client.user.setStatus("dnd")
   setInterval(() => {
      client.user.setActivity(`d!help | watching over ${client.guilds.cache.size} servers.`)
   }, 2500)
}