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
   deleteDiscordInviteLinks: boolean,
   antiLink: boolean,
   antiLinkRes: string
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
