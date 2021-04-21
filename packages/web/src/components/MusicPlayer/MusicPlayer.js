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

  const handelSliderChange = useCallback((e) => {
    setCurrentTime((e.target.value / 1000) * currentSong.duration);
  }, []);

  function toggleLike() {
    setIsLiked(!isLiked);
  }

  function convertTimeToString(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }

  return (
    <SongPalyerCard>
      <Thumbnail src={currentSong.thumbnail} />
      <SongInfo>
        <div>
          <SongTitle>
            <a>{currentSong.title}</a>
          </SongTitle>
          <Artists>
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
      <Buttons>
        <Icon name="random" size="small" />
        <Icon name="previous" size="normal" />
        <Icon name="play" size="large" />
        <Icon name="next" size="normal" />
        <Icon name="list" size="small" />
      </Buttons>
      <Timer>
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
    </SongPalyerCard>
  );
}

export default MusicPlayer;
