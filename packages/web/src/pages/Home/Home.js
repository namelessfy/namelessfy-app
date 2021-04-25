import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import MusicPlayer from "../../components/MusicPlayer";
import Navbar from "../../components/Navbar";
import PlaylistPreview from "../../components/PlaylistPreview";

import * as ROUTES from "../../routes";

import { authSelector } from "../../redux/auth/auth-selectors";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import { hasUserAllInfo } from "../../utils/utils";

import { Main } from "../../styles/mainStyles";
import { Container } from "./style";

function Home() {
  const { currentUser } = useSelector(authSelector);
  const { isShuffle, queue, shuffleQueue, preQueue } = useSelector(
    playerSelector,
  );
  const [fullQueue, setFullQueue] = useState([]);

  useEffect(() => {
    if (isShuffle) {
      setFullQueue([...preQueue, ...shuffleQueue]);
    } else {
      setFullQueue([...preQueue, ...queue]);
    }
  }, [preQueue, isShuffle, queue, shuffleQueue]);

  if (!hasUserAllInfo(currentUser)) {
    return <Redirect to={ROUTES.COMPLETE_SIGNUP} />;
  }

  return (
    <Main>
      <Navbar />
      <MusicPlayer />
      <Container>
        <PlaylistPreview title="Queue" songs={fullQueue} />
      </Container>
    </Main>
  );
}

export default Home;
