import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, MessageSquare } from "lucide-react";
import CreatePlayerForm from "@/components/CreatePlayerForm";

// Mock data - will be replaced with Supabase data
const mockPlayers = [
  { id: "1", username: "PlayerOne", riot_id: "Player#1234", created_at: "2024-01-15", reports_count: 5, is_active: true },
  { id: "2", username: "ToxicGamer", riot_id: "Toxic#5678", created_at: "2024-01-10", reports_count: 12, is_active: true },
  { id: "3", username: "Cheater123", riot_id: "Cheat#9999", created_at: "2024-01-05", reports_count: 8, is_active: false },
];

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [players] = useState(mockPlayers);

  const filteredPlayers = players.filter(player =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (player.riot_id && player.riot_id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen gaming-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Player Reporting Forum</h1>
          <p className="text-muted-foreground">Report and discuss player behavior in Riot Games</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by username or Riot ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="lg:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Player
          </Button>
        </div>

        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Player Section</CardTitle>
            </CardHeader>
            <CardContent>
              <CreatePlayerForm 
                onSuccess={() => setShowCreateForm(false)}
                onCancel={() => setShowCreateForm(false)}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => (
            <Card key={player.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{player.username}</CardTitle>
                  <Badge variant={player.is_active ? "default" : "secondary"}>
                    {player.is_active ? "Active" : "Archived"}
                  </Badge>
                </div>
                {player.riot_id && (
                  <p className="text-sm text-muted-foreground">{player.riot_id}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    {player.reports_count} reports
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Created {new Date(player.created_at).toLocaleDateString()}
                  </span>
                </div>
                <Link to={`/forum/player/${player.id}`}>
                  <Button className="w-full" variant="outline">
                    View Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No players found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;