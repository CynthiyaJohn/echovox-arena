import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, WifiOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8 animate-bounce">
        <WifiOff className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h1 className="text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold mb-4">Frequency Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The signal you're looking for seems to have drifted into static. Let's get you back to a clear channel.
      </p>

      <Link href="/">
        <Button size="lg" className="rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
        </Button>
      </Link>
    </div>
  );
}
