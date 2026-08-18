import React, { useEffect, useRef, useState } from "react";
import { Volume2, Clock } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function InteractivePlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmuteButton, setShowUnmuteButton] = useState(false);
  const [duration, setDuration] = useState(58); // Fallback ~58s for Shorts SCnZQHCFUKE
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<any>(null);
  const maxWatchedTimeRef = useRef<number>(0);

  useEffect(() => {
    let playerInstance: any = null;
    let isMounted = true;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player || !document.getElementById("youtube-player")) {
        return;
      }

      try {
        playerInstance = new window.YT.Player("youtube-player", {
          videoId: "SCnZQHCFUKE",
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            enablejsapi: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            disablekb: 1,
            origin: typeof window !== "undefined" ? window.location.origin : "",
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              playerRef.current = event.target;

              // Step 1: Attempt autoplay with sound on ready
              try {
                event.target.unMute();
                event.target.setVolume(100);
                event.target.playVideo();
              } catch (err) {
                console.warn("Unmuted autoplay attempt failed:", err);
              }

              // Step 2: Verify if autoplay with sound succeeded or was blocked
              setTimeout(() => {
                if (!isMounted) return;
                try {
                  const state = event.target.getPlayerState();
                  const muted = typeof event.target.isMuted === "function" ? event.target.isMuted() : true;

                  // If video is not playing (1 = YT.PlayerState.PLAYING) or is muted, trigger muted autoplay
                  if (state !== 1 || muted) {
                    event.target.mute();
                    event.target.playVideo();
                    setIsMuted(true);
                    setShowUnmuteButton(true);
                  } else {
                    setIsMuted(false);
                    setShowUnmuteButton(false);
                    setIsPlaying(true);
                  }
                } catch {
                  // Fallback to muted autoplay on error
                  try {
                    event.target.mute();
                    event.target.playVideo();
                  } catch {}
                  setIsMuted(true);
                  setShowUnmuteButton(true);
                }
              }, 400);
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
                if (typeof event.target.isMuted === "function" && event.target.isMuted()) {
                  setIsMuted(true);
                  setShowUnmuteButton(true);
                }
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
            onError: (event: any) => {
              console.warn("YouTube Player error encountered:", event.data);
              // Ensure video plays muted if error occurred
              if (!isMounted) return;
              try {
                event.target.mute();
                event.target.playVideo();
                setIsMuted(true);
                setShowUnmuteButton(true);
              } catch {}
            },
          },
        });
      } catch (e) {
        console.error("Failed to initialize YT Player:", e);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Load YouTube IFrame API script dynamically
      const existingScript = document.getElementById("youtube-iframe-api-script");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
      }

      const prevAPIReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevAPIReady) prevAPIReady();
        if (isMounted) initPlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerInstance && typeof playerInstance.destroy === "function") {
        try {
          playerInstance.destroy();
        } catch {}
      }
    };
  }, []);

  // Sync duration, current time and enforce anti-fast-forward
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        try {
          const dur = playerRef.current.getDuration();
          if (dur && dur > 0) {
            setDuration(dur);
          }

          const cur = playerRef.current.getCurrentTime();
          if (typeof cur === "number") {
            // Anti-fast-forward guard: prevent skipping ahead
            if (cur > maxWatchedTimeRef.current + 2.5 && maxWatchedTimeRef.current > 0) {
              playerRef.current.seekTo(maxWatchedTimeRef.current, true);
            } else {
              maxWatchedTimeRef.current = Math.max(maxWatchedTimeRef.current, cur);
              setCurrentTime(cur);
            }
          }
        } catch {}
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Global user interaction listener to enable sound if still muted
  useEffect(() => {
    const enableAudioOnUserInteraction = () => {
      if (playerRef.current) {
        try {
          playerRef.current.unMute();
          playerRef.current.setVolume(100);
          playerRef.current.playVideo();
        } catch {}
      }
      setIsMuted(false);
      setShowUnmuteButton(false);
      setIsPlaying(true);
    };

    window.addEventListener("click", enableAudioOnUserInteraction, { once: true });
    window.addEventListener("touchstart", enableAudioOnUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", enableAudioOnUserInteraction);
      window.removeEventListener("touchstart", enableAudioOnUserInteraction);
    };
  }, []);

  const handleUnmute = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (playerRef.current) {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        playerRef.current.playVideo();
      } catch (err) {
        console.error("Error unmuting player:", err);
      }
    }
    setIsMuted(false);
    setShowUnmuteButton(false);
    setIsPlaying(true);
  };

  const handleContainerClick = () => {
    if (isMuted) {
      handleUnmute();
      return;
    }
    if (playerRef.current) {
      try {
        if (isPlaying) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch {}
    }
  };

  const remainingTime = Math.max(0, Math.ceil(duration - currentTime));

  const formatTime = (totalSeconds: number) => {
    const secs = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSecs
      .toString()
      .padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md mx-auto px-4 mt-1">
      <div
        id="video-player-container"
        className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black border-2 border-emerald-500/40 animate-border-blink"
      >
        {/* YouTube IFrame API Target Element */}
        <div className="w-full h-full rounded-3xl overflow-hidden [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 [&_iframe]:pointer-events-none">
          <div id="youtube-player" className="w-full h-full" />
        </div>

        {/* Transparent Full Shield for click interaction */}
        <div
          className="absolute inset-0 z-20 bg-transparent cursor-pointer select-none"
          onClick={handleContainerClick}
        />

        {/* Unmute Button Overlay */}
        {showUnmuteButton && (
          <button
            onClick={handleUnmute}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-emerald-600/95 hover:bg-emerald-500 active:scale-95 text-white font-extrabold px-5 py-3 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.7)] backdrop-blur-md text-xs sm:text-sm animate-pulse-gentle transition-all duration-300 cursor-pointer border border-white/30 whitespace-nowrap select-none"
          >
            <Volume2 className="w-5 h-5 text-white animate-bounce shrink-0" />
            <span className="tracking-wide uppercase font-black drop-shadow-md text-dark-stroke">
              🔊 CLIQUE AQUI PARA OUVIR O VÍDEO
            </span>
          </button>
        )}

        {/* Bottom Countdown & Loading Bar Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/85 to-transparent backdrop-blur-md pointer-events-none flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 drop-shadow">
            <Clock className="w-4 h-4 animate-pulse text-emerald-400 shrink-0" />
            <span>Falta para terminar: {formatTime(remainingTime)}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-800/90 h-2 sm:h-2.5 rounded-full overflow-hidden border border-zinc-700/60 p-0.5 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 rounded-full transition-all duration-300 ease-linear shadow-[0_0_12px_rgba(16,185,129,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
