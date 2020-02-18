import React from 'react';
import { Global, jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import normalize from "normalize.css";

/** @jsx jsx */

const Text = styled.p`
  color: ${props => props.color};
`;

const App = () => {
  return (
    <React.Fragment>
      <Global styles={css`${normalize}`} />

      <Text color="firebrick">FreeStyling</Text>
    </React.Fragment>
  );
};

export default App;
