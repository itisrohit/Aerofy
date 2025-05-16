"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toastSuccess, toastError } from "@/utility/toastStyle";
import { Loader2, Check, User, Mail, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, loading: authLoading, error, updateName, updatePassword } = useAuth();
  
  // Name update
  const [newName, setNewName] = useState<string>("");
  const [isUpdatingName, setIsUpdatingName] = useState<boolean>(false);
  
  // Password update
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState<boolean>(false);

  // Set initial name when user data loads
  useEffect(() => {
    if (user) {
      setNewName(user.name);
    }
  }, [user]);

  // Display error when auth error changes
  useEffect(() => {
    if (error) {
      toastError(error);
    }
  }, [error]);

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newName.trim()) {
      toastError("Name cannot be empty");
      return;
    }
    
    try {
      setIsUpdatingName(true);
      const success = await updateName(newName);
      
      if (success) {
        toastSuccess("Name updated successfully");
      }
    } catch (error) {
      toastError("Failed to update name");
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toastError("All password fields are required");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toastError("New passwords do not match");
      return;
    }
    
    try {
      setIsUpdatingPassword(true);
      const success = await updatePassword(currentPassword, newPassword, confirmPassword);
      
      if (success) {
        toastSuccess("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toastError("Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="relative">
      <div className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/20 p-6 rounded-lg border border-border/50">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-muted-foreground mt-1">Manage your personal account settings</p>
          </div>
        </div>
      </div>

      <Separator />

      {authLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Name</p>
                  <p className="text-sm text-muted-foreground mt-1">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Email Address</p>
                  <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
                </div>
              </div>
              {user?.created_at && (
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium leading-none">Member Since</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Update Name */}
          <Card>
            <CardHeader>
              <CardTitle>Update Name</CardTitle>
              <CardDescription>Change your display name</CardDescription>
            </CardHeader>
            <form onSubmit={handleNameUpdate}>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">New Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter new name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      disabled={isUpdatingName}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isUpdatingName}>
                  {isUpdatingName ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Update Name
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Update Password */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordUpdate}>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        disabled={isUpdatingPassword}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={isUpdatingPassword}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isUpdatingPassword}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isUpdatingPassword}>
                  {isUpdatingPassword ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Update Password
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}