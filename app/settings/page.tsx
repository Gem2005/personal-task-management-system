"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { updateProfile } from "@/utils/api"; // Adjust the import path to the correct module
import { Eye, EyeOff } from "lucide-react"; // Import icons for visibility toggle

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== repeatNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await updateProfile({
        name,
        email,
        currentPassword,
        newPassword,
      });

      if (response.error) {
        setError(response.error);
      } else {
        setMessage("Profile updated successfully");
      }
    } catch {
      setError("An error occurred while updating the profile");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-8"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-8"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="repeatNewPassword">Repeat New Password</Label>
              <Input
                id="repeatNewPassword"
                type={showRepeatNewPassword ? "text" : "password"}
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-8"
                onClick={() => setShowRepeatNewPassword(!showRepeatNewPassword)}
              >
                {showRepeatNewPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
