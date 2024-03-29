export interface Config {
   TOKEN: string,
   DB: string,
   owners: Array<string>,
   emojis: Emojis,
   blackListedLinks: Array<string>
}

export interface Emojis {
   tick: string,
   cross: string,
   warning:string,
   gray: string,
   info: string,
}