// src/app/instructor/settings/page.js
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import { HiOutlineUser, HiOutlineMail, HiOutlineGlobe, HiOutlineCamera } from "react-icons/hi";

export default function InstructorSettingsPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [bio, setBio] = useState("Passionate educator with years of industry experience.");

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-bold">Instructor Settings</h1>

      {/* Profile */}
      <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold">Public Profile</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
              <img src={user?.avatar} alt="" className="w-full h-full" />
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary text-primary-content rounded-full flex items-center justify-center">
              <HiOutlineCamera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <p className="font-semibold">{user?.fullName}</p>
            <p className="text-xs opacity-50">{user?.email}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Professional Title</label>
          <input type="text" className="input input-bordered w-full rounded-xl" defaultValue="Senior Full Stack Developer" />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Bio</label>
          <textarea className="textarea textarea-bordered w-full rounded-xl h-28" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Website</label>
          <div className="relative">
            <input type="url" className="input input-bordered w-full pl-10 rounded-xl" placeholder="https://yourwebsite.com" />
            <HiOutlineGlobe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={() => addToast("Settings saved!", "success")} className="btn btn-primary rounded-xl px-8">Save Changes</button>
        </div>
      </div>

      {/* Payout Settings */}
      <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold">Payout Settings</h2>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Payout Method</label>
          <select className="select select-bordered w-full rounded-xl">
            <option>PayPal</option>
            <option>Bank Transfer</option>
            <option>Payoneer</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">PayPal Email</label>
          <input type="email" className="input input-bordered w-full rounded-xl" defaultValue={user?.email} />
        </div>
        <div className="flex justify-end">
          <button onClick={() => addToast("Payout settings saved!", "success")} className="btn btn-primary rounded-xl px-8">Save</button>
        </div>
      </div>
    </div>
  );
}