// client/src/pages/Settings.tsx

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md space-y-8">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Settings</h1>

      {/* Profile Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your Name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <Button className="mt-2">Update Profile</Button>
      </section>

      {/* Password Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <div className="space-y-2">
          <Label htmlFor="old-password">Current Password</Label>
          <Input id="old-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>
        <Button className="mt-2" variant="secondary">Change Password</Button>
      </section>

      {/* Preferences */}
      <section className="flex items-center justify-between">
        <span className="font-medium">Dark Mode</span>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </section>

      {/* Delete Account */}
      <section className="pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Confirm Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
