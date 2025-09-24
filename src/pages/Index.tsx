import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Riot Player Reporting Forum
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A community-driven platform to report and discuss player behavior in Riot Games. 
            Help maintain a positive gaming environment for everyone.
          </p>
          <Link to="/forum">
            <Button size="lg" className="text-lg px-8 py-6">
              <MessageSquare className="mr-2 h-5 w-5" />
              Enter Forum
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Report Players
              </CardTitle>
              <CardDescription>
                Create dedicated sections for specific players and submit detailed reports about their behavior.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Community Discussion
              </CardTitle>
              <CardDescription>
                Share experiences and discuss player behavior with the community to build awareness.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Moderated Content
              </CardTitle>
              <CardDescription>
                All reports are reviewed by moderators to ensure quality and prevent abuse of the system.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-4">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Create or Find</h3>
              <p className="text-muted-foreground">Search for an existing player section or create a new one with their username/Riot ID.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Submit Report</h3>
              <p className="text-muted-foreground">Provide detailed information about the player's behavior, incidents, and relevant context.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Community Review</h3>
              <p className="text-muted-foreground">After moderation approval, reports become visible for community discussion and awareness.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
