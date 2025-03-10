import type {Player} from "@/models/Player";

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export const createTeam = (id: string, name: string, players: Player[] = []): Team => ({
  id,
  name,
  players,
});