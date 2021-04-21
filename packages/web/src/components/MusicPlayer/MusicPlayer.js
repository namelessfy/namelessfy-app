import React, { useState } from "react";

import {
  SongPalyerCard,
  Thumbnail,
  Icon,
  Buttons,
  SongInfo,
  SongTitle,
  Artists,
} from "./style";

function MusicPlayer() {
  const actualSong = {
    title: "Go solo",
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

  const [isLiked, setisLiked] = useState(false);

  function toggleLike() {
    setisLiked(!isLiked);
  }

  return (
    <SongPalyerCard>
      <Thumbnail src={actualSong.thumbnail} />
      <SongInfo>
        <div>
          <SongTitle>
            <a>{actualSong.title}</a>
          </SongTitle>
          <Artists>
            {actualSong.artistId.map((artist, index) => {
              return <a key={artist.name}> {artist.userName}</a>;
            })}
          </Artists>
        </div>
        <Icon
          name={isLiked ? "heartFull" : "heartEmpty"}
          onClick={toggleLike}
        />
      </SongInfo>
      <Buttons>
        <Icon name="random" />
        <Icon name="previous" />
        <Icon name="play" />
        <Icon name="next" />
        <Icon name="list" />
      </Buttons>
    </SongPalyerCard>
  );
}

export default MusicPlayer;
