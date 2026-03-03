// src/app/instructor/reviews/page.js
"use client";

import { useState } from "react";
import { recentReviews } from "@/data/instructor";
import { useToast } from "@/components/Toast";
import { HiOutlineReply, HiOutlineFlag, HiStar } from "react-icons/hi";

export default function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const { addToast } = useToast();

  const filtered = filter === "all" ? recentReviews : filter === "replied" ? recentReviews.filter((r) => r.replied) : recentReviews.filter((r) => !r.replied);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Student Reviews</h1>
        <div className="flex gap-1">
          {["all", "pending", "replied"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`btn btn-xs rounded-full capitalize ${filter === f ? "btn-primary" : "btn-ghost"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((review) => (
          <div key={review.id} className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300 shrink-0">
                <img src={review.avatar} alt={review.student} className="w-full h-full" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{review.student}</span>
                  <div className="flex">{[...Array(5)].map((_, i) => (<HiStar key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-warning" : "text-base-300"}`} />))}</div>
                  <span className="text-xs opacity-40">{review.date}</span>
                  {review.replied && <span className="badge badge-success badge-xs">Replied</span>}
                </div>
                <p className="text-xs text-primary opacity-60 mt-0.5">{review.course}</p>
                <p className="text-sm opacity-80 mt-2">{review.comment}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)} className="btn btn-ghost btn-xs gap-1"><HiOutlineReply className="w-3.5 h-3.5" /> Reply</button>
                  <button className="btn btn-ghost btn-xs gap-1 opacity-50"><HiOutlineFlag className="w-3.5 h-3.5" /> Report</button>
                </div>
                {replyingTo === review.id && (
                  <div className="mt-3 ml-4 pl-4 border-l-2 border-primary/30">
                    <textarea className="textarea textarea-bordered w-full text-sm h-20 rounded-lg" placeholder="Write your reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => { addToast("Reply sent!", "success"); setReplyingTo(null); setReplyText(""); }} className="btn btn-primary btn-xs">Send Reply</button>
                      <button onClick={() => { setReplyingTo(null); setReplyText(""); }} className="btn btn-ghost btn-xs">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}