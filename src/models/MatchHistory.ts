import type {Player} from "@/models/Player";

export interface MatchHistory {
  id: string;
  teamId: string;
  date: Date;
  location: string;
  opponent: string;
  registeredPlayers: Player[];
  unregisteredPlayers: Player[];
  undecidedPlayers: Player[];
}

export const createMatchHistory = (
  id: string,
  teamId: string,
  date: Date,
  location: string,
  opponent: string,
  registeredPlayers: Player[] = [],
  unregisteredPlayers: Player[] = [],
  undecidedPlayers: Player[] = []
): MatchHistory => ({
  id,
  teamId,
  date,
  location,
  opponent,
  registeredPlayers,
  unregisteredPlayers,
  undecidedPlayers,
});