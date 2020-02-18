import React, { useState } from 'react';
import { Global, jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import normalize from 'normalize.css';

import correctImage  from './images/modal-correct.png';
import incorrectImage  from './images/modal-incorrect-font-colour.png';

/** @jsx jsx */

const base = css`
  body {
    box-sizing: border-box;
    background: hsl(0, 0%, 18%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 100%;
    line-height: 1.2;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const Cyan = css`hsl(194, 98%, 54%)`;
const Pink = css`hsl(320, 90%, 60%)`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 750px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 16px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${Cyan};
  margin: 0;
`;

const Score = styled.p`
  color: white;
  background: ${Pink};
  margin: 0;
  padding: 4px 8px;
  border-radius: 8px;
`;

const Text = styled.p`
  color: white;
  margin: 0;
`;

const Comparison = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  img {
    display: block;
    max-width: 45%;
  }
`;

const Progress = styled.progress`
  appearance: none;
  width: 80%;
  &::-webkit-progress-bar {
    background-color: black;
    border-radius: 16px;
  }
  &::-webkit-progress-value {
    background-color: ${Pink};
    border-radius: 16px;
  }
`;

const formatScore = score => {
  return score.toString().padStart(6, '0');
};

const App = () => {
  const [score, setScore] = useState(0);

  return (
    <React.Fragment>
      <Global styles={css`
        ${normalize}
        ${base}
      `} />

      <Wrapper>
        <Header>
          <Title>FreeStyling</Title>
          <Score>{formatScore(score)}</Score>
        </Header>

        <Comparison>
          <img src={require('./images/modal-correct.png')} />
          <img src={require('./images/modal-incorrect-font-colour.png')} />
        </Comparison>

        <Text>Which design is correct? Click to choose.</Text>

        <Progress max="4" value="1"></Progress>
      </Wrapper>
    </React.Fragment>
  );
};

export default App;
