import type {Player} from "@/models/Player";

export interface Match {
  id: string;
  teamId: string;
  date: Date;
  location: string;
  opponent: string;
  registeredPlayers: Player[];
  unregisteredPlayers: Player[];
  undecidedPlayers: Player[];
}

export const createMatch = (
  id: string,
  teamId: string,
  date: Date,
  location: string,
  opponent: string,
  registeredPlayers: Player[] = [],
  unregisteredPlayers: Player[] = [],
  undecidedPlayers: Player[] = []
): Match => ({
  id,
  teamId,
  date,
  location,
  opponent,
  registeredPlayers,
  unregisteredPlayers,
  undecidedPlayers,
});