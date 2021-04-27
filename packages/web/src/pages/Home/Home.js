import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "../../components/Navbar";
import PlaylistPreview from "../../components/PlaylistPreview";

import * as ROUTES from "../../routes";

import { userSelector } from "../../redux/user/user-selectors";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import { hasUserAllInfo } from "../../utils/utils";

import { Main } from "../../styles/mainStyles";
import { Container } from "./style";
import { getFavorites, getMySongs } from "../../redux/user/user-actions";

function Home() {
  const dispatch = useDispatch();
  const { currentUser, favorites, mySongs } = useSelector(userSelector);
  const { isShuffle, queue, shuffleQueue, preQueue } = useSelector(
    playerSelector,
  );
  const [fullQueue, setFullQueue] = useState([]);
  const [hasAllInfo, setHasAllInfo] = useState(false);
  const [hasMySongs, setHasMySongs] = useState(false);

  useEffect(() => {
    if (hasAllInfo && !hasMySongs) {
      dispatch(getMySongs());
    }
  }, [hasAllInfo, hasMySongs]);

  useEffect(() => {
    if (mySongs) {
      setHasMySongs(true);
    }
  }, [mySongs]);

  useEffect(() => {
    if (hasAllInfo) {
      dispatch(getFavorites());
    }
  }, [hasAllInfo]);

  useEffect(() => {
    setHasAllInfo(hasUserAllInfo(currentUser));
  }, [currentUser]);

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
      <Container>
        {/* <PlaylistPreview title="Queue" songs={fullQueue} /> */}
        {favorites?.length > 0 && (
          <PlaylistPreview title="Liked Songs" songs={favorites} />
        )}
        {mySongs?.length > 0 && (
          <PlaylistPreview title="My Songs" songs={mySongs} />
        )}
      </Container>
    </Main>
  );
}

export default Home;
