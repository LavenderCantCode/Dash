import { Event, Run } from "../../structures/Event";

export const event: Event = {
   name: "ready"
}
export const run: Run = (client) => {
   console.log(client.user.tag + " is now online")
}