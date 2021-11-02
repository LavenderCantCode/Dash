export interface GuildConfig {
   guildId: string;
   prefix: string;
   premium: boolean;
   mutedRole: string;
   removeRoleOnMute: boolean;
   deleteModerationMessage: boolean;
   maxWarnsBeforeBan: number;
   disabledCommands: Array<string>;
   antiLinks: Array<string>;
   antiLinkAction: Array<string>,
   antiLink: boolean;
   antiLinkRes: string;
   errorLogChannel: string;
   suggestionsChannelId: string;
   chatFilterWords: Array<string>;
   chatFilterAction: Array<string>,
   chatFilter: boolean;
   chatFilterRes: string;
}
export interface WarnsInterface {
   moderator: string;
   time: number;
   reason: string;
   channel: string;
   id: string;
}
export interface UserConfig {
   userId: string;
   coins: number;
   bank: number;
   inventory: Array<object>
}
