import type {Team} from "@/models/Team";

export interface Player {
  id: string;
  name: string;
  defaultTeamId: string;
  teams: Team[];
}

export const createPlayer = (id: string, name: string, defaultTeamId: string, teams: Team[] = []): Player => ({
  id,
  name,
  defaultTeamId,
  teams,
});