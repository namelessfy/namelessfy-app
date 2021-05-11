import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EditUserForm from "../../components/EditUserForm";
import Navbar from "../../components/Navbar";
import { userSelector } from "../../redux/user/user-selectors";
import { Main } from "../../styles/mainStyles";
import { haveUsersSameInfo } from "../../utils/utils";

import * as ROUTES from "../../routes";

function EditUser() {
  const history = useHistory();
  const { currentUser } = useSelector(userSelector);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user === null) {
      setUser(currentUser);
    } else if (!haveUsersSameInfo(user, currentUser)) {
      history.push(`${ROUTES.USER_PAGE}/${currentUser.userName}`);
    }
  }, [currentUser]);

  return (
    <Main marginBottom>
      <EditUserForm />
    </Main>
  );
}

export default EditUser;
