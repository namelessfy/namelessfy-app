import React, { useState } from "react";
import usePlayer from "../../hooks/usePlayer";

import {
  SongPalyerCard,
  Thumbnail,
  Buttons,
  SongInfo,
  SongTitle,
  Artists,
  Slider,
  Timer,
  Background,
  Close,
  SongPalyer,
  LikeBackground,
} from "./style";

import { Icon } from "../../styles/mainStyles";

function MusicPlayer() {
  const {
    currentSong,
    isLiked,
    currentTime,
    isPlaying,
    handelSliderChange,
    toggleLike,
    togglePlay,
    previousSong,
    nextSong,
    toggleShuffle,
    isShuffle,
  } = usePlayer();

  const [isCard, setIsCard] = useState(false);

  function convertTimeToString(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }

  function handleBackgroundClick(e) {
    if (e.target.id === "SongPalyerCardBackground") {
      setIsCard(false);
    }
  }

  function handleSongPlayerClick(e) {
    if (
      e.target.id === "SongPalyerBackground" ||
      e.target.id === "SongInfo" ||
      e.target.id === "songTimer"
    ) {
      setIsCard(true);
    }
  }

  return (
    <>
      {currentSong &&
        (isCard ? (
          <>
            <Background
              onClick={handleBackgroundClick}
              id="SongPalyerCardBackground"
            >
              <SongPalyerCard>
                <Thumbnail src={currentSong.thumbnail} />
                <SongInfo card>
                  <div>
                    <SongTitle card>
                      <a>{currentSong.title}</a>
                    </SongTitle>
                    <Artists card>
                      {currentSong.artistId.map((artist, index) => {
                        return <a key={artist.name}> {artist.userName}</a>;
                      })}
                    </Artists>
                  </div>
                  <Icon
                    name={isLiked ? "heartFull" : "heartEmpty"}
                    onClick={toggleLike}
                    size="small"
                  />
                </SongInfo>
                <Buttons card>
                  <Icon
                    name={isShuffle ? "randomClicked" : "random"}
                    size="small"
                    onClick={toggleShuffle}
                  />
                  <Icon name="previous" size="normal" onClick={previousSong} />
                  <Icon
                    name={isPlaying ? "pause" : "play"}
                    size="large"
                    onClick={togglePlay}
                  />
                  <Icon name="next" size="normal" onClick={nextSong} />
                  <Icon name="list" size="small" />
                </Buttons>
                <Timer card>
                  {convertTimeToString(currentTime)} /{" "}
                  {convertTimeToString(currentSong.duration)}
                </Timer>
                <Slider
                  type="range"
                  min="0"
                  max="1000"
                  value={(currentTime * 1000) / currentSong.duration}
                  onChange={handelSliderChange}
                />
                <Close onClick={() => setIsCard(false)} />
              </SongPalyerCard>
            </Background>
          </>
        ) : (
          <>
            <SongPalyer
              onClick={handleSongPlayerClick}
              id="SongPalyerBackground"
            >
              <LikeBackground>
                <Icon
                  name={isLiked ? "heartFull" : "heartEmpty"}
                  onClick={toggleLike}
                  size="small"
                />
              </LikeBackground>

              <SongInfo id="SongInfo">
                <SongTitle>{currentSong.title}</SongTitle>
                <Artists>
                  {currentSong?.artistId?.map((artist, index) => {
                    return <span key={artist.userName}>{artist.userName}</span>;
                  })}
                </Artists>
              </SongInfo>

              <Buttons>
                <Icon
                  name={isShuffle ? "randomClicked" : "random"}
                  size="xSmall"
                  className="songButtonsRandom"
                  onClick={toggleShuffle}
                />
                <Icon
                  name="previous"
                  size="small"
                  className="songButtonsPrevious"
                  onClick={previousSong}
                />
                <Icon
                  name={isPlaying ? "pause" : "play"}
                  size="normal"
                  onClick={togglePlay}
                />
                <Icon
                  name="next"
                  size="small"
                  className="songButtonsNext"
                  onClick={nextSong}
                />
                <Icon name="list" size="xSmall" className="songButtonsList" />
              </Buttons>
              <Timer id="songTimer">
                {convertTimeToString(currentTime)} /{" "}
                {convertTimeToString(currentSong.duration)}
              </Timer>
            </SongPalyer>
          </>
        ))}
    </>
  );
}

export default MusicPlayer;
