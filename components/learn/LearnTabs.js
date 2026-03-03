// src/components/learn/LearnTabs.js
"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@/context/ProgressContext";
import {
  HiOutlinePencil,
  HiOutlineChatAlt2,
  HiOutlineDocumentDownload,
  HiOutlineInformationCircle,
  HiOutlineTrash,
  HiOutlineThumbUp,
} from "react-icons/hi";

const dummyQA = [
  {
    id: 1,
    user: "Alex M.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    question: "Can you explain how closures work in this context?",
    date: "2 days ago",
    likes: 12,
    answers: [
      {
        user: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        answer: "Great question! A closure is formed when a function retains access to its parent scope, even after the parent function has returned. In this lecture's example...",
        date: "1 day ago",
        isInstructor: true,
      },
    ],
  },
  {
    id: 2,
    user: "Priya S.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    question: "Is there a downloadable cheat sheet for this section?",
    date: "5 days ago",
    likes: 8,
    answers: [],
  },
];

const dummyResources = [
  { name: "Lecture Slides.pdf", size: "2.4 MB", type: "PDF" },
  { name: "Source Code.zip", size: "1.1 MB", type: "ZIP" },
  { name: "Cheat Sheet.pdf", size: "850 KB", type: "PDF" },
];

export default function LearnTabs({ course, currentSection, currentLecture }) {
  const [activeTab, setActiveTab] = useState("notes");

  const tabs = [
    { id: "notes", label: "Notes", icon: HiOutlinePencil },
    { id: "qa", label: "Q&A", icon: HiOutlineChatAlt2 },
    { id: "resources", label: "Resources", icon: HiOutlineDocumentDownload },
    { id: "overview", label: "Overview", icon: HiOutlineInformationCircle },
  ];

  return (
    <div className="bg-base-100">
      {/* Tab Headers */}
      <div className="border-b border-base-300">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5 max-w-4xl mx-auto">
        {activeTab === "notes" && (
          <NotesTab
            courseId={course.id}
            sectionIndex={currentSection}
            lectureIndex={currentLecture}
            lectureName={
              course.sections[currentSection]?.lectures[currentLecture]?.title
            }
          />
        )}
        {activeTab === "qa" && <QATab />}
        {activeTab === "resources" && <ResourcesTab />}
        {activeTab === "overview" && <OverviewTab course={course} />}
      </div>
    </div>
  );
}

function NotesTab({ courseId, sectionIndex, lectureIndex, lectureName }) {
  const { saveNote, getNote, getAllNotes } = useProgress();
  const [noteContent, setNoteContent] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [showAllNotes, setShowAllNotes] = useState(false);

  useEffect(() => {
    setNoteContent(getNote(courseId, sectionIndex, lectureIndex));
  }, [courseId, sectionIndex, lectureIndex, getNote]);

  useEffect(() => {
    setAllNotes(getAllNotes(courseId));
  }, [courseId, getAllNotes, noteContent]);

  const handleSave = () => {
    saveNote(courseId, sectionIndex, lectureIndex, noteContent);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">
            Notes for: <span className="text-primary">{lectureName}</span>
          </h4>
          <button
            onClick={() => setShowAllNotes(!showAllNotes)}
            className="btn btn-ghost btn-xs text-primary rounded-lg"
          >
            {showAllNotes ? "Current Lecture" : `All Notes (${allNotes.length})`}
          </button>
        </div>

        {!showAllNotes ? (
          <>
            <textarea
              className="textarea textarea-bordered w-full h-40 text-sm resize-y rounded-lg"
              placeholder="Write your notes here... (auto-saved per lecture)"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              onBlur={handleSave}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs opacity-40">
                Notes auto-save when you click away
              </p>
              <button
                onClick={handleSave}
                className="btn btn-primary btn-xs gap-1 rounded-lg"
              >
                <HiOutlinePencil className="w-3 h-3" />
                Save Note
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {allNotes.length === 0 ? (
              <p className="text-sm opacity-50 text-center py-8">
                No notes yet. Start taking notes while watching lectures!
              </p>
            ) : (
              allNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-base-200/50 rounded-lg border border-base-300/50"
                >
                  <p className="text-xs font-semibold opacity-60 mb-1">
                    Section {note.sectionIndex + 1}, Lecture{" "}
                    {note.lectureIndex + 1}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                  <p className="text-[10px] opacity-40 mt-2">
                    {new Date(note.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function QATab() {
  const [question, setQuestion] = useState("");

  return (
    <div className="space-y-4">
      {/* Ask Question */}
      <div className="bg-base-200/30 rounded-xl p-4 border border-base-300/50">
        <h4 className="font-semibold text-sm mb-2">Ask a Question</h4>
        <textarea
          className="textarea textarea-bordered w-full h-20 text-sm rounded-lg"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button className="btn btn-primary btn-sm rounded-lg">
            Post Question
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {dummyQA.map((qa) => (
          <div
            key={qa.id}
            className="border border-base-300/50 rounded-xl p-4"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                <img src={qa.avatar} alt={qa.user} className="w-full h-full" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{qa.user}</span>
                  <span className="text-xs opacity-40">{qa.date}</span>
                </div>
                <p className="text-sm">{qa.question}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button className="btn btn-ghost btn-xs gap-1 opacity-60 hover:opacity-100">
                    <HiOutlineThumbUp className="w-3.5 h-3.5" />
                    {qa.likes}
                  </button>
                  <button className="btn btn-ghost btn-xs opacity-60 hover:opacity-100">
                    Reply
                  </button>
                </div>

                {/* Answers */}
                {qa.answers.map((answer, idx) => (
                  <div
                    key={idx}
                    className="mt-3 ml-4 pl-4 border-l-2 border-primary/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img
                          src={answer.avatar}
                          alt={answer.user}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="font-semibold text-xs">
                        {answer.user}
                      </span>
                      {answer.isInstructor && (
                        <span className="badge badge-primary badge-xs">
                          Instructor
                        </span>
                      )}
                      <span className="text-[10px] opacity-40">
                        {answer.date}
                      </span>
                    </div>
                    <p className="text-sm opacity-80">{answer.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesTab() {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-3">Downloadable Resources</h4>
      <div className="space-y-2">
        {dummyResources.map((res, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-base-200/30 rounded-lg border border-base-300/50 hover:bg-base-200/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <HiOutlineDocumentDownload className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{res.name}</p>
                <p className="text-xs opacity-50">{res.size}</p>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm btn-primary rounded-lg">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewTab({ course }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">About this course</h4>
        <p className="text-sm opacity-80 leading-relaxed">
          {course.description}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Hours", value: `${course.totalHours}h` },
          { label: "Lectures", value: course.totalLectures },
          { label: "Level", value: course.level },
          { label: "Language", value: course.language },
        ].map((item) => (
          <div
            key={item.label}
            className="text-center p-3 bg-base-200/30 rounded-lg"
          >
            <p className="text-lg font-bold text-primary">{item.value}</p>
            <p className="text-xs opacity-50">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}