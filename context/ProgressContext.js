// src/context/ProgressContext.js
"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("learnhub_progress");
      const savedNotes = localStorage.getItem("learnhub_notes");
      if (savedProgress) setProgress(JSON.parse(savedProgress));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch (e) {
      console.error("Error loading progress:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("learnhub_progress", JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  // Save notes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("learnhub_notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  // Mark lecture complete/incomplete
  const toggleLectureComplete = useCallback((courseId, sectionIndex, lectureIndex) => {
    const key = `${courseId}`;
    const lectureKey = `${sectionIndex}-${lectureIndex}`;

    setProgress((prev) => {
      const courseProgress = prev[key] || { completedLectures: [] };
      const completed = courseProgress.completedLectures.includes(lectureKey);

      return {
        ...prev,
        [key]: {
          ...courseProgress,
          completedLectures: completed
            ? courseProgress.completedLectures.filter((l) => l !== lectureKey)
            : [...courseProgress.completedLectures, lectureKey],
        },
      };
    });
  }, []);

  // Check if lecture is complete
  const isLectureComplete = useCallback(
    (courseId, sectionIndex, lectureIndex) => {
      const key = `${courseId}`;
      const lectureKey = `${sectionIndex}-${lectureIndex}`;
      return progress[key]?.completedLectures?.includes(lectureKey) || false;
    },
    [progress]
  );

  // Get course completion percentage
  const getCourseProgress = useCallback(
    (courseId, totalLectures) => {
      const key = `${courseId}`;
      const completed = progress[key]?.completedLectures?.length || 0;
      if (totalLectures === 0) return 0;
      return Math.round((completed / totalLectures) * 100);
    },
    [progress]
  );

  // Get completed count
  const getCompletedCount = useCallback(
    (courseId) => {
      const key = `${courseId}`;
      return progress[key]?.completedLectures?.length || 0;
    },
    [progress]
  );

  // Save last watched position
  const setLastWatched = useCallback((courseId, sectionIndex, lectureIndex) => {
    setProgress((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        completedLectures: prev[courseId]?.completedLectures || [],
        lastWatched: { sectionIndex, lectureIndex },
      },
    }));
  }, []);

  const getLastWatched = useCallback(
    (courseId) => {
      return progress[courseId]?.lastWatched || { sectionIndex: 0, lectureIndex: 0 };
    },
    [progress]
  );

  // Notes
  const saveNote = useCallback((courseId, sectionIndex, lectureIndex, content) => {
    const noteKey = `${courseId}-${sectionIndex}-${lectureIndex}`;
    setNotes((prev) => ({
      ...prev,
      [noteKey]: {
        content,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const getNote = useCallback(
    (courseId, sectionIndex, lectureIndex) => {
      const noteKey = `${courseId}-${sectionIndex}-${lectureIndex}`;
      return notes[noteKey]?.content || "";
    },
    [notes]
  );

  const getAllNotes = useCallback(
    (courseId) => {
      const courseNotes = [];
      Object.keys(notes).forEach((key) => {
        if (key.startsWith(`${courseId}-`)) {
          const parts = key.split("-");
          courseNotes.push({
            sectionIndex: parseInt(parts[1]),
            lectureIndex: parseInt(parts[2]),
            content: notes[key].content,
            updatedAt: notes[key].updatedAt,
          });
        }
      });
      return courseNotes;
    },
    [notes]
  );

  return (
    <ProgressContext.Provider
      value={{
        toggleLectureComplete,
        isLectureComplete,
        getCourseProgress,
        getCompletedCount,
        setLastWatched,
        getLastWatched,
        saveNote,
        getNote,
        getAllNotes,
        isLoaded,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}