import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { CreatePlayerData } from "@/types/forum";

interface CreatePlayerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreatePlayerForm = ({ onSuccess, onCancel }: CreatePlayerFormProps) => {
  const [formData, setFormData] = useState<CreatePlayerData>({
    username: "",
    riot_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      toast({
        title: "Error",
        description: "Username is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with Supabase integration
      console.log("Creating player:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Player section created successfully",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create player section",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Username *</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          placeholder="Enter player username"
          maxLength={50}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="riot_id">Riot ID (Optional)</Label>
        <Input
          id="riot_id"
          value={formData.riot_id}
          onChange={(e) => setFormData(prev => ({ ...prev, riot_id: e.target.value }))}
          placeholder="e.g., Player#1234"
          maxLength={50}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Player Section"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreatePlayerForm;