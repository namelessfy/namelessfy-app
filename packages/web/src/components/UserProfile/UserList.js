import React, { useState } from "react";
import PropTypes from "prop-types";

import Song from "../Song";

import { ButtonContainer, MediaContainer, AddSongButton } from "./styles";

function UserList({ button, content }) {
  return (
    <div>
      <ButtonContainer>
        <AddSongButton onClick={button.function}>Add Song</AddSongButton>
      </ButtonContainer>
      <MediaContainer>
        {/* content.type === "song" &&
          content.elements.map((element) => <Song></Song>) */}
      </MediaContainer>
    </div>
  );
}

UserList.propTypes = {
  button: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
};

export default UserList;
