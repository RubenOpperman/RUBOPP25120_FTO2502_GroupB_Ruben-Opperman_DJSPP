import { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}

export function AudioProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [currentSeasonImg, setCurrentSeasonImg] = useState(null);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      return () => audio.removeEventListener("timeupdate", updateProgress);
    }
  }, [currentEpisode]);

  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentEpisode]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (audioRef.current && !audioRef.current.paused) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentEpisode]);

  const playEpisode = (episode, seasonImg, podcast) => {
    setCurrentEpisode(episode);
    setCurrentSeasonImg(seasonImg);
    setCurrentPodcast(podcast);
  };

  return (
    <AudioContext.Provider value={{ currentEpisode, playEpisode, audioRef }}>
      {children}
      {currentEpisode && (
        <div className="fixed bottom-0 left-0 w-full border-t-2 border-gray-400 bg-Background text-black-text px-4 py-2 font-serif h-24 flex items-center justify-between z-50">
          <div className="flex items-center gap-4">
            <img
              className="sm:w-14 sm:h-14 w-5 h-5 rounded-xl"
              src={currentSeasonImg}
              alt="season cover"
            />
            <div>
              <h4 className="font-bold text-md truncate w-40">
                {currentEpisode.title}
              </h4>
              <p className="text-secondary-font-color sm:text-sm text-xs truncate w-40">
                {currentPodcast.title}
              </p>
            </div>
          </div>

          <div className="flex-1 px-4 ">
            <audio ref={audioRef} className="hidden">
              <source src={currentEpisode.file} type="audio/mpeg" />
            </audio>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (audioRef.current.paused) {
                    audioRef.current.play();
                  } else {
                    audioRef.current.pause();
                  }
                  setIsPlaying(!audioRef.current.paused);
                }}
                className="bg-blue-500 text-white px-1 sm:px-4 py-1 rounded"
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => {
                  const value = e.target.value;
                  const duration = audioRef.current.duration || 0;
                  audioRef.current.currentTime = (duration * value) / 100;
                  setProgress(value);
                }}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </AudioContext.Provider>
  );
}
