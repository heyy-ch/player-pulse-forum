import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageSquare, Clock, User } from "lucide-react";
import ReportForm from "@/components/ReportForm";

// Mock data - will be replaced with Supabase data
const mockPlayer = {
  id: "1",
  username: "PlayerOne",
  riot_id: "Player#1234",
  created_at: "2024-01-15",
  is_active: true,
};

const mockReports = [
  {
    id: "1",
    content: "This player was extremely toxic during our ranked game. Used offensive language and intentionally fed.",
    reporter_name: "Anonymous",
    created_at: "2024-01-20T10:30:00Z",
    is_approved: true,
  },
  {
    id: "2",
    content: "Caught this player using scripts. Their aim was impossibly perfect every single time.",
    reporter_name: "WitnessGamer",
    created_at: "2024-01-18T15:45:00Z",
    is_approved: true,
  },
  {
    id: "3",
    content: "Griefing team members and throwing games intentionally. Very frustrating experience.",
    reporter_name: "Anonymous",
    created_at: "2024-01-16T20:15:00Z",
    is_approved: false,
  },
];

const PlayerForum = () => {
  const { playerId } = useParams();
  const [showReportForm, setShowReportForm] = useState(false);
  const [player] = useState(mockPlayer);
  const [reports] = useState(mockReports);

  const approvedReports = reports.filter(report => report.is_approved);

  return (
    <div className="min-h-screen gaming-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/forum">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forum
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {player.username}
              </h1>
              {player.riot_id && (
                <p className="text-muted-foreground mb-2">{player.riot_id}</p>
              )}
              <Badge variant={player.is_active ? "default" : "secondary"}>
                {player.is_active ? "Active" : "Archived"}
              </Badge>
            </div>
            
            <Button onClick={() => setShowReportForm(true)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Submit Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {showReportForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Submit New Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReportForm
                    playerId={playerId!}
                    onSuccess={() => setShowReportForm(false)}
                    onCancel={() => setShowReportForm(false)}
                  />
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Reports ({approvedReports.length})
              </h2>
              
              {approvedReports.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No reports available for this player.</p>
                  </CardContent>
                </Card>
              ) : (
                approvedReports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          {report.reporter_name || "Anonymous"}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground leading-relaxed">{report.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Player Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">{player.username}</p>
                </div>
                
                {player.riot_id && (
                  <div>
                    <p className="text-sm text-muted-foreground">Riot ID</p>
                    <p className="font-medium">{player.riot_id}</p>
                  </div>
                )}
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground">Section Created</p>
                  <p className="font-medium">
                    {new Date(player.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="font-medium">{reports.length}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Approved Reports</p>
                  <p className="font-medium">{approvedReports.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerForum;