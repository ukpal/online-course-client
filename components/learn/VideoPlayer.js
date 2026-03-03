// src/components/learn/VideoPlayer.js
"use client";

import { useRef, useState, useEffect } from "react";
import {
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
  HiOutlineCog,
  HiOutlineArrowsExpand,
} from "react-icons/hi";

// Sample videos for different qualities — replace with real cloud URLs later
const VIDEO_SOURCES = {
  1080: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  720: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  480: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
};

const QUALITY_OPTIONS = [
  { value: 1080, label: "1080p", tag: "HD" },
  { value: 720, label: "720p", tag: "HD" },
  { value: 480, label: "480p", tag: "" },
];

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function VideoPlayer({ lecture, onComplete }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeout = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState(720);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState("main"); // main | speed | quality

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => {
      setIsPlaying(false);
      if (onComplete) onComplete();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
    };
  }, [onComplete]);

  // Reset video when lecture changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      setShowSettings(false);
      setSettingsTab("main");
    }
  }, [lecture]);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (showSettings && !e.target.closest(".settings-panel")) {
        setShowSettings(false);
        setSettingsTab("main");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSettings]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setSettingsTab("main");
  };

  const changeQuality = (q) => {
    const video = videoRef.current;
    const wasPlaying = isPlaying;
    const savedTime = video.currentTime;

    // In production, you'd change the video source URL here
    video.src = VIDEO_SOURCES[q];
    video.currentTime = savedTime;
    setQuality(q);

    video.addEventListener(
      "loadeddata",
      () => {
        video.currentTime = savedTime;
        if (wasPlaying) video.play();
      },
      { once: true }
    );

    setSettingsTab("main");
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video) return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(video.currentTime + 10, duration);
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 10, 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          video.volume = Math.min(video.volume + 0.1, 1);
          setVolume(video.volume);
          break;
        case "ArrowDown":
          e.preventDefault();
          video.volume = Math.max(video.volume - 0.1, 0);
          setVolume(video.volume);
          break;
        case "m":
          toggleMute();
          break;
        case "f":
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, duration]);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative bg-black w-full aspect-video group cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target === videoRef.current) {
          togglePlay();
        }
      }}
    >
      <video
        ref={videoRef}
        src={VIDEO_SOURCES[quality]}
        className="w-full h-full object-contain"
        playsInline
      />

      {/* Center Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
          >
            <HiOutlinePlay className="w-10 h-10 text-primary-content ml-1" />
          </button>
        </div>
      )}

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-3 px-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <div
          className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group/progress hover:h-2.5 transition-all"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-primary rounded-full relative transition-all"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-primary rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors"
            >
              {isPlaying ? (
                <HiOutlinePause className="w-6 h-6" />
              ) : (
                <HiOutlinePlay className="w-6 h-6" />
              )}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <HiOutlineVolumeOff className="w-5 h-5" />
                ) : (
                  <HiOutlineVolumeUp className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 transition-all duration-300 accent-primary h-1 cursor-pointer"
              />
            </div>

            {/* Time */}
            <span className="text-white text-xs font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Settings Button */}
            <div className="relative settings-panel">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettings(!showSettings);
                  setSettingsTab("main");
                }}
                className="text-white hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <HiOutlineCog
                  className={`w-5 h-5 transition-transform duration-300 ${
                    showSettings ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Settings Panel */}
              {showSettings && (
                <div
                  className="absolute bottom-full right-0 mb-2 bg-neutral/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden min-w-[220px] settings-panel"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Main Menu */}
                  {settingsTab === "main" && (
                    <div className="py-1">
                      <p className="text-[10px] font-bold text-neutral-content/40 uppercase tracking-wider px-4 pt-2 pb-1">
                        Settings
                      </p>

                      {/* Speed Option */}
                      <button
                        onClick={() => setSettingsTab("speed")}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-neutral-content hover:bg-white/10 transition-colors"
                      >
                        <span>Playback Speed</span>
                        <span className="text-primary font-medium text-xs">
                          {playbackRate === 1 ? "Normal" : `${playbackRate}x`}
                        </span>
                      </button>

                      {/* Quality Option */}
                      <button
                        onClick={() => setSettingsTab("quality")}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-neutral-content hover:bg-white/10 transition-colors"
                      >
                        <span>Quality</span>
                        <span className="text-primary font-medium text-xs flex items-center gap-1">
                          {quality}p
                          {quality >= 720 && (
                            <span className="text-[9px] bg-primary/20 text-primary px-1 rounded font-bold">
                              HD
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Speed Submenu */}
                  {settingsTab === "speed" && (
                    <div className="py-1">
                      <button
                        onClick={() => setSettingsTab("main")}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-content/60 hover:bg-white/10 transition-colors border-b border-white/10"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Playback Speed
                      </button>
                      {SPEED_OPTIONS.map((rate) => (
                        <button
                          key={rate}
                          onClick={() => changePlaybackRate(rate)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                            playbackRate === rate
                              ? "text-primary bg-primary/10 font-semibold"
                              : "text-neutral-content hover:bg-white/10"
                          }`}
                        >
                          <span>
                            {rate}x {rate === 1 && "(Normal)"}
                          </span>
                          {playbackRate === rate && (
                            <svg
                              className="w-4 h-4 text-primary"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Quality Submenu */}
                  {settingsTab === "quality" && (
                    <div className="py-1">
                      <button
                        onClick={() => setSettingsTab("main")}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-content/60 hover:bg-white/10 transition-colors border-b border-white/10"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Quality
                      </button>
                      {QUALITY_OPTIONS.map((q) => (
                        <button
                          key={q.value}
                          onClick={() => changeQuality(q.value)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                            quality === q.value
                              ? "text-primary bg-primary/10 font-semibold"
                              : "text-neutral-content hover:bg-white/10"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {q.label}
                            {q.tag && (
                              <span className="text-[9px] bg-primary/20 text-primary px-1 rounded font-bold">
                                {q.tag}
                              </span>
                            )}
                          </span>
                          {quality === q.value && (
                            <svg
                              className="w-4 h-4 text-primary"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-primary transition-colors"
            >
              <HiOutlineArrowsExpand className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar - Lecture Title */}
      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-white text-sm font-medium truncate">
            {lecture?.title}
          </p>
          <div className="flex items-center gap-2">
            {quality >= 720 && (
              <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">
                HD
              </span>
            )}
            {playbackRate !== 1 && (
              <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">
                {playbackRate}x
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint (shows briefly) */}
      <div className="absolute bottom-16 left-4 text-white/0 group-hover:text-white/40 transition-colors duration-500 text-[10px] hidden lg:block">
        Space: Play/Pause • ←→: Seek • ↑↓: Volume • M: Mute • F: Fullscreen
      </div>
    </div>
  );
}