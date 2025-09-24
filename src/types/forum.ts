export interface Player {
  id: string;
  username: string;
  riot_id?: string;
  created_at: string;
  created_by: string;
  is_active: boolean;
}

export interface Report {
  id: string;
  player_id: string;
  content: string;
  reporter_name?: string;
  created_at: string;
  is_approved: boolean;
}

export interface CreatePlayerData {
  username: string;
  riot_id?: string;
}

export interface CreateReportData {
  content: string;
  reporter_name?: string;
}