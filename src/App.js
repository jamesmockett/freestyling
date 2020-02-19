import React, { useState } from 'react';
import { Global, jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import normalize from 'normalize.css';

import Quiz from "./data/questions.json";

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

const Cyan = 'hsl(194, 98%, 54%)';
const Pink = 'hsl(320, 90%, 60%)';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const Footer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${Cyan};
  margin: 0;
`;

const Score = styled.p`
  font-size: 20px;
  color: white;
  background: ${Pink};
  margin: 0;
  padding: 4px 8px;
  border-radius: 8px;
`;

const Text = styled.p`
  color: white;
  margin: 0;
  text-align: center;
  font-size: ${props => props.size}px;
`;

const Comparison = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  img {
    display: block;
    max-width: 45%;
    cursor: pointer;
    transition: transform 150ms ease-in;
    &:hover {
      transform: scale(1.4);
    }
  }
`;

const Explanation = styled.div`
  position: absolute;
  left: 10%;
  top: 50%;
  width: 80%;
  transform: translateY(-50%);
  padding: 32px 64px;
  background: hsl(194, 98%, 54%, 0.9);
  pointer-events: none;
`;

const Progress = styled.progress`
  appearance: none;
  width: 80%;
  margin-top: 16px;
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
  const [explanationVisible, showExplanation] = useState(false);
  const [correctAnswer, correctAnswerSelected] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [question, setQuestion] = useState(0);
  const [levelData, setLevelData] = useState(Quiz[level]);
  const [questionData, setQuestionData] = useState(levelData.questions[question]);

  const images = require.context('./images', true);

  const nextQuestion = () => {
    if (!explanationVisible) {
      return;
    }

    showExplanation(false);

    if (question + 1 < levelData.questions.length) {
      setQuestion(question + 1);
      setQuestionData(levelData.questions[question + 1]);
    } else {
      if (level + 1 < Quiz.length) {
        setLevel(level + 1);
        setQuestion(0);
        setLevelData(Quiz[level + 1]);
        setQuestionData(Quiz[level + 1].questions[0]);
      } else {
        console.log('Quiz over');
      }
    }
  };

  const checkAnswer = (event) => {
    if (explanationVisible) {
      return false;
    }

    const selectedImage = event.target.dataset.image;

    if (selectedImage == questionData.correctImage) {
      correctAnswerSelected(true);
      setScore(score + 250);
    } else {
      correctAnswerSelected(false);
    }

    showExplanation(true);
  };

  return (
    <React.Fragment>
      <Global styles={css`
        ${normalize}
        ${base}
      `} />

      <Wrapper onClick={nextQuestion}>
        <Header>
          <Title>FreeStyling 💅</Title>
          <Score>💎{formatScore(score)}</Score>
        </Header>

        <Comparison>
          <img src={images(questionData.imageLeft)} alt="" data-image="1" onClick={checkAnswer} />
          <img src={images(questionData.imageRight)} alt="" data-image="2" onClick={checkAnswer} />
          <Explanation hidden={!explanationVisible}>
            <Text size="24">
              {correctAnswer ? '✅' : '❌'} {questionData.explanation}
            </Text>
          </Explanation>
        </Comparison>

        <Text size="24">Which design is correct? 🤔</Text>

        <Footer>
          <Text size="20">{levelData.name} — {question + 1} / {levelData.questions.length}</Text>
          <Progress max={levelData.questions.length} value={question + 1}></Progress>
        </Footer>
      </Wrapper>
    </React.Fragment>
  );
};

export default App;
