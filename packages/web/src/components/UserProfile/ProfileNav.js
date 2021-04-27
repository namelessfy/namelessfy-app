import React from "react";
import { Link } from "react-router-dom";

function ProfileNav() {
  const [click, setClick] = useSate(false);

  const handleCLick = () => setClick(!click);
  return (
    <>
      <nav>
        <Link to="/">Songs</Link>
        <Link to="/">Albums</Link>
        <Link to="/">Playlists</Link>
      </nav>
    </>
  );
}

export default ProfileNav;
