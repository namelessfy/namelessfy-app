import React from "react";

import EditUserForm from "../../components/EditUserForm";

import { Main } from "../../styles/mainStyles";
import { Title, Separation } from "./style";

function CompleteSignUP() {
  return (
    <Main>
        <section>
          <Title>Complete Sign Up</Title>
          <Separation />
          <EditUserForm />
        </section>
    </Main>
  );
}

export default CompleteSignUP;
