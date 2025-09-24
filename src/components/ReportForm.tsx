import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { CreateReportData } from "@/types/forum";

interface ReportFormProps {
  playerId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const ReportForm = ({ playerId, onSuccess, onCancel }: ReportFormProps) => {
  const [formData, setFormData] = useState<CreateReportData>({
    content: "",
    reporter_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      toast({
        title: "Error",
        description: "Report content is required",
        variant: "destructive",
      });
      return;
    }

    if (formData.content.length > 1000) {
      toast({
        title: "Error",
        description: "Report content must be less than 1000 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with Supabase integration
      console.log("Creating report for player:", playerId, formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Report submitted successfully and is pending approval",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="reporter_name">Your Name (Optional)</Label>
        <Input
          id="reporter_name"
          value={formData.reporter_name}
          onChange={(e) => setFormData(prev => ({ ...prev, reporter_name: e.target.value }))}
          placeholder="Leave blank to report anonymously"
          maxLength={50}
        />
        <p className="text-xs text-muted-foreground mt-1">
          You can report anonymously if you prefer
        </p>
      </div>
      
      <div>
        <Label htmlFor="content">Report Details *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Describe the player's behavior, what happened, and any relevant details..."
          className="min-h-[120px]"
          maxLength={1000}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.content.length}/1000 characters
        </p>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> All reports are reviewed by moderators before being made public. 
          Please provide factual information and avoid personal attacks.
        </p>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Report"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ReportForm;