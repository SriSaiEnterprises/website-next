"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // Clear any previous error message

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        // Show success message
        setErrorMessage("Please check your email to verify your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Update authentication state
        setIsAuthenticated(true);

        // Redirect to the home page or admin page
        router.push("/admin");
      }
    } catch (error: unknown) {
      console.error("Authentication Error:", error);

      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error) {
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Please verify your email before signing in.";
        } else if (error.message.includes("User not found")) {
          errorMessage = "Account does not exist. Please sign up.";
        } else {
          errorMessage = error.message;
        }
      }

      // Set the error message to display in the UI
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-[#0E0E55]">
            {isSignUp ? "Create Account" : "Sign In"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignUp
              ? "Create a new account to access the dashboard."
              : "Sign in to your account to access the dashboard."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Display error message if it exists */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0E0E55]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#0E0E55] focus:ring-[#0E0E55]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0E0E55]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#0E0E55] focus:ring-[#0E0E55]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0E0E55] hover:bg-[#1E1E75] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <Button
            variant="link"
            className="w-full mt-4 text-[#0E0E55] hover:text-[#1E1E75]"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;