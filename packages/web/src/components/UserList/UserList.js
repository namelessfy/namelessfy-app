import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

import User from "../User";

import {
  UsersContainer,
  Title,
  TitleContainer,
  Buttons,
  Container,
} from "./style";
import { Icon } from "../../styles/mainStyles";

function UserList({ users, title }) {
  const [page, setPage] = useState(1);
  const [shownUsers, setShownUsers] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const isBigScreen = useMediaQuery({ minWidth: 800 });

  useEffect(() => {
    if (isBigScreen) {
      setUsersPerPage(5);
    } else {
      setUsersPerPage(4);
    }
  }, [isBigScreen, page]);

  useEffect(() => {
    const usersToShow = users.slice(
      0 + usersPerPage * (page - 1),
      usersPerPage + usersPerPage * (page - 1),
    );
    setShownUsers(usersToShow);
  }, [users, page, usersPerPage]);

  function handleNextPage() {
    if (page < users.length / usersPerPage) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  }

  function handlePreviousPage() {
    if (page === 1) {
      setPage(Math.floor(users.length / usersPerPage) + 1);
    } else {
      setPage(page - 1);
    }
  }

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <Buttons>
          <Icon name="previous" onClick={handlePreviousPage} size="xSmall" />
          {page}/
          {users.length % usersPerPage === 0
            ? users.length / usersPerPage
            : Math.floor(users.length / usersPerPage) + 1}
          <Icon name="next" onClick={handleNextPage} size="xSmall" />
        </Buttons>
      </TitleContainer>
      <hr />
      <UsersContainer>
        {shownUsers.map((user) => (
          <User key={user._id} userInfo={user} />
        ))}
      </UsersContainer>
    </Container>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default UserList;
