/* eslint-disable sort-exports/sort-exports */

export interface ContentToken {
  type:
    | 'EscapeCharacter'
    | 'CommandDeclarator'
    | 'WhiteSpace'
    | 'LineBreak'
    | 'Symbol'
    | 'Text'
    | 'Image'
    | 'Stamp';
  value: string;
}

export interface ImageAst {
  type: 'Image';
  value: string;
}

export interface CommandAst {
  type: 'Command';
  value: string;
}

export interface TextAst {
  type: 'Text';
  value: string;
}

export interface MessageContentAst {
  type: 'Image' | 'Command' | 'Text' | 'WhiteSpace' | 'LineBreak' | 'Stamp';
  value: string;
}

export interface ChatContentAst {
  type: 'ChatContent';
  characterId: string;
  characterName: string;
  characterType: 'user' | 'system' | 'npc' | 'custom';
  messageType: 'text' | 'stamp' | 'image' | 'relationship' | 'choice';
  messageContentAst: MessageContentAst[];
}

export interface ChatContent {
  characterId: string;
  characterName: string;
  characterType: 'user' | 'system' | 'npc' | 'custom';
  messageType:
    | 'text'
    | 'stamp'
    | 'image'
    | 'relationship'
    | 'choice'
    | 'narration';
  messageContent: string;
}

export interface Character {
  id: string;
  name: string;
  avatarType: 'npc' | 'custom';
  avatar: string;
}
