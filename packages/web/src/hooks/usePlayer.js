import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerSelector } from "../redux/musicPlayer/player-selectors";
import {
  setNextSong,
  setPreviousSong,
  setShuffle,
} from "../redux/musicPlayer/player-actions";

export default function usePlayer() {
  const dispatch = useDispatch();
  const { currentSong, isShuffle } = useSelector(playerSelector);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null);

  useEffect(() => {
    return function pauseIfPlaying() {
      if (isPlaying) {
        pause();
      }
    };
  }, []);

  useEffect(() => {
    if (song) {
      song.pause();
      song.removeEventListener("timeupdate", handleTimeChange);
    }
    setSong(new Audio(currentSong.url));
  }, [currentSong]);

  useEffect(() => {
    if (song) {
      song.onended = function end() {
        nextSong();
      };
      song.addEventListener("timeupdate", handleTimeChange);
      if (isPlaying) {
        song.onloadeddata = play();
      }
    }
  }, [song]);

  function handelSliderChange(e) {
    e.preventDefault();
    setCurrentTime((e.target.value / 1000) * currentSong.duration);
    song.currentTime = currentTime;
  }

  function handleTimeChange() {
    setCurrentTime(song.currentTime);
  }

  function toggleLike() {
    setIsLiked(!isLiked);
  }

  function play() {
    song.play();
    setIsPlaying(true);
  }

  function pause() {
    song.pause();
    setIsPlaying(false);
  }

  function nextSong() {
    setCurrentTime(0);
    dispatch(setNextSong());
  }

  function previousSong() {
    setCurrentTime(0);
    dispatch(setPreviousSong());
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function toggleShuffle() {
    console.log("shuffle");
    dispatch(setShuffle());
  }

  return {
    currentSong,
    isLiked,
    currentTime,
    isPlaying,
    handelSliderChange,
    nextSong,
    previousSong,
    togglePlay,
    toggleLike,
    toggleShuffle,
    isShuffle,
  };
}
