import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import MusicPlayer from "../../components/MusicPlayer";
import Navbar from "../../components/Navbar";
import PlaylistPreview from "../../components/PlaylistPreview";

import * as ROUTES from "../../routes";

import { userSelector } from "../../redux/user/user-selectors";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import { hasUserAllInfo } from "../../utils/utils";
import * as auth from "../../services/auth";

import { Main } from "../../styles/mainStyles";
import { Container } from "./style";

function Home() {
  const { currentUser } = useSelector(userSelector);
  const { isShuffle, queue, shuffleQueue, preQueue } = useSelector(
    playerSelector,
  );
  const [fullQueue, setFullQueue] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  useEffect(() => {
    let token;
    (async () => {
      token = await auth.getCurrentUserToken();

      fetch("http://localhost:4000/tracks/favorite/608202acaa0133516851ab13", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(({ data }) => setLikedSongs(data));
    })();
  }, []);

  useEffect(() => {
    if (isShuffle) {
      setFullQueue([...preQueue, ...shuffleQueue]);
    } else {
      setFullQueue([...preQueue, ...queue]);
    }
  }, [preQueue, isShuffle, queue, shuffleQueue]);

  console.log(currentUser);
  if (!currentUser || !hasUserAllInfo(currentUser)) {
    return <Redirect to={ROUTES.COMPLETE_SIGNUP} />;
  }

  return (
    <Main>
      <Navbar />
      <Container>
        <PlaylistPreview title="Queue" songs={fullQueue} />
        {likedSongs?.length > 0 && (
          <PlaylistPreview title="Liked Songs" songs={likedSongs} />
        )}
      </Container>
    </Main>
  );
}

export default Home;
