import React, { useCallback, useState } from "react";

import {
  SongPalyerCard,
  Thumbnail,
  Icon,
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

function MusicPlayer() {
  const currentSong = {
    title: "Go Solo",
    url:
      "https://res.cloudinary.com/namelessfy/video/upload/v1619002291/tracks/Zwette_feat._Tom_Rosenthal_-_Go_Solo_Official_Lyric_Video_vf7kpp.mp3",
    thumbnail:
      "https://res.cloudinary.com/namelessfy/image/upload/v1619002680/thumbnail/81IROWku2ML._SS500__un7y47.jpg",
    duration: 191,
    rating: 9.1,
    genre: "Chill House",
    authorId: "",
    artistId: [{ userName: "Zwette" }, { userName: "Tom Rosenthal" }],
    likedBy: [
      { userName: "janpc" },
      { userName: "Tom Rosenthal" },
      { userName: "Zwette" },
      { userName: "Tom Rosenthal" },
      { userName: "Zwette" },
      { userName: "Tom Rosenthal" },
      { userName: "Zwette" },
      { userName: "Tom Rosenthal" },
    ],
  };

  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCard, setIsCard] = useState(true);

  const handelSliderChange = useCallback(
    (e) => {
      setCurrentTime((e.target.value / 1000) * currentSong.duration);
    },
    [currentSong.duration],
  );

  function toggleLike() {
    setIsLiked(!isLiked);
  }

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
      {isCard ? (
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
                <Icon name="random" size="small" />
                <Icon name="previous" size="normal" />
                <Icon name="play" size="large" />
                <Icon name="next" size="normal" />
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
          <SongPalyer onClick={handleSongPlayerClick} id="SongPalyerBackground">
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
                {currentSong.artistId.map((artist, index) => {
                  return <span key={artist.userName}>{artist.userName}</span>;
                })}
              </Artists>
            </SongInfo>

            <Buttons>
              <Icon name="random" size="xSmall" />
              <Icon name="previous" size="small" />
              <Icon name="play" size="normal" />
              <Icon name="next" size="small" />
              <Icon name="list" size="xSmall" />
            </Buttons>
            <Timer id="songTimer">
              {convertTimeToString(currentTime)} /{" "}
              {convertTimeToString(currentSong.duration)}
            </Timer>
          </SongPalyer>
        </>
      )}
    </>
  );
}

export default MusicPlayer;
