import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isIdInList } from "../utils/utils";

import {
  setNextSong,
  setPreviousSong,
  setShuffle,
  setAutoPlay,
  addSongToLastPlayed,
} from "../redux/musicPlayer/player-actions";
import { dislikeSong, likeSong } from "../redux/song/song-actions";
import { playerSelector } from "../redux/musicPlayer/player-selectors";
import { songSelector } from "../redux/song/song-selectors";

export default function usePlayer() {
  const dispatch = useDispatch();
  const { currentSong, isShuffle, autoPlay } = useSelector(playerSelector);
  const { favorites } = useSelector(songSelector);
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
  }, [isPlaying]);

  useEffect(() => {
    if (song) {
      song.pause();
      song.removeEventListener("timeupdate", handleTimeChange);
    }
    if (currentSong) {
      setSong(new Audio(currentSong.url));
    }
  }, [currentSong, setSong]);

  useEffect(() => {
    if (song) {
      song.onended = function end() {
        nextSong();
      };
      song.addEventListener("timeupdate", handleTimeChange);
      if (isPlaying || autoPlay) {
        song.onloadeddata = play();
        dispatch(setAutoPlay(false));
      }
    }
  }, [song]);

  useEffect(() => {
    if (favorites && currentSong) {
      setIsLiked(isIdInList(currentSong._id, favorites));
    }
  }, [favorites, currentSong]);

  function handelSliderChange(e) {
    e.preventDefault();
    setCurrentTime((e.target.value / 1000) * currentSong.duration);
    song.currentTime = currentTime;
  }

  function handleTimeChange() {
    setCurrentTime(song.currentTime);
  }

  function toggleLike() {
    if (isLiked) {
      dispatch(dislikeSong(currentSong._id));
    } else {
      dispatch(likeSong(currentSong._id));
    }
  }

  function play() {
    song.play();
    setIsPlaying(true);
    dispatch(addSongToLastPlayed(currentSong));
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
    play,
    pause,
  };
}
