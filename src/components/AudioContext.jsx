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

  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentEpisode]);

  const playEpisode = (episode, seasonImg, podcast) => {
    setCurrentEpisode(episode);
    setCurrentSeasonImg(seasonImg);
    setCurrentPodcast(podcast);
  };

  return (
    <AudioContext.Provider value={{ currentEpisode, playEpisode, audioRef }}>
      {children}
      {currentEpisode ? (
        <div className=" fixed bottom-0 left-0 w-[60vw] border-t-2 border-gray-400 bg-gray-100 px-4 py-1  font-serif   h-20">
          <div className="flex  ">
            <img
              className="w-14 h-full  rounded-xl mr-2"
              src={currentSeasonImg}
              alt="season cover"
            />
            <div>
              <h4 className=" font-bold text-md">
                Episode Title - {currentEpisode.title}
              </h4>
              <p className="text-secondary-font-color text-sm">
                {currentPodcast.title}
              </p>
            </div>
          </div>

          <audio
            ref={audioRef}
            controls
            className="fixed bottom-0 right-0 w-[40vw] bg-gray-100 border-t-2 border-gray-400  text-white z-50 h-20 "
          >
            {currentEpisode && (
              <source src={currentEpisode.file} type="audio/mpeg" />
            )}
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : null}
    </AudioContext.Provider>
  );
}
