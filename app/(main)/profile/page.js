// src/app/(main)/profile/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineCamera,
  HiOutlineBadgeCheck,
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoaded, updateProfile, changePassword, authError, setAuthError } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({ fullName: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoaded, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setProfileData({ fullName: user.fullName, email: user.email });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));

    const success = updateProfile(profileData);
    if (success) {
      addToast("Profile updated successfully!", "success");
    }
    setIsSaving(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAuthError("New passwords do not match");
      return;
    }

    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));

    const success = changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    if (success) {
      addToast("Password changed successfully!", "success");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
    setIsSaving(false);
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="container-custom py-8 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mx-auto">
              <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <HiOutlineCamera className="w-4 h-4" />
            </button>
          </div>
          <h1 className="text-xl font-bold">{user.fullName}</h1>
          <p className="text-sm opacity-60">{user.email}</p>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs opacity-50">
            <span className="flex items-center gap-1">
              <HiOutlineBadgeCheck className="w-3.5 h-3.5 text-success" />
              Verified Account
            </span>
            <span className="flex items-center gap-1">
              <HiOutlineCalendar className="w-3.5 h-3.5" />
              Joined {new Date(user.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-base-300/50">
          {[
            { id: "profile", label: "Edit Profile" },
            { id: "password", label: "Change Password" },
            { id: "preferences", label: "Preferences" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setAuthError(""); }}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {authError && (
          <div className="alert alert-error mb-4 py-2 text-sm rounded-xl">
            <HiOutlineExclamationCircle className="w-5 h-5 shrink-0" />
            <span>{authError}</span>
            <button onClick={() => setAuthError("")} className="btn btn-ghost btn-xs btn-square">✕</button>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6">
            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 rounded-xl"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    required
                  />
                  <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 rounded-xl"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    required
                  />
                  <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary rounded-xl px-8" disabled={isSaving}>
                  {isSaving ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              {[
                { key: "current", label: "Current Password", field: "currentPassword", placeholder: "Enter current password" },
                { key: "new", label: "New Password", field: "newPassword", placeholder: "Enter new password" },
                { key: "confirm", label: "Confirm New Password", field: "confirmPassword", placeholder: "Confirm new password" },
              ].map((item) => (
                <div key={item.key}>
                  <label className="text-sm font-medium mb-1.5 block">{item.label}</label>
                  <div className="relative">
                    <input
                      type={showPasswords[item.key] ? "text" : "password"}
                      placeholder={item.placeholder}
                      className="input input-bordered w-full pl-10 pr-10 rounded-xl"
                      value={passwordData[item.field]}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, [item.field]: e.target.value })
                      }
                      required
                    />
                    <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, [item.key]: !showPasswords[item.key] })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100"
                    >
                      {showPasswords[item.key] ? (
                        <HiOutlineEyeOff className="w-5 h-5" />
                      ) : (
                        <HiOutlineEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary rounded-xl px-8" disabled={isSaving}>
                  {isSaving ? <span className="loading loading-spinner loading-sm" /> : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="bg-base-100 border border-base-300/50 rounded-2xl p-6 space-y-5">
            <h3 className="font-semibold">Notification Preferences</h3>
            {[
              { label: "Email notifications for new courses", defaultChecked: true },
              { label: "Push notifications for course updates", defaultChecked: true },
              { label: "Weekly learning report", defaultChecked: false },
              { label: "Promotional offers and discounts", defaultChecked: true },
              { label: "Instructor announcements", defaultChecked: true },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <span className="text-sm">{pref.label}</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  defaultChecked={pref.defaultChecked}
                />
              </div>
            ))}

            <div className="divider" />

            <h3 className="font-semibold">Danger Zone</h3>
            <div className="flex items-center justify-between p-4 bg-error/5 border border-error/20 rounded-xl">
              <div>
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs opacity-50">This action cannot be undone</p>
              </div>
              <button className="btn btn-error btn-sm btn-outline rounded-lg">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}