"use client";
import React, { useEffect, useState } from "react";
import StartPage from "./startpage";
import QuizPage from "./quizpage";
import ScorePage from "./scorepage";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const QuizApp: React.FC = () => {
  const questions: Question[] = [
    {
      question:
        "Which AI chatbot, launched by OpenAI, became widely popular in 2023?",
      options: ["Blackbox", "Bard", "ChatGPT", "Claude"],
      answer: "ChatGPT",
    },
    {
      question:
        "What is the primary programming language used to train machine learning models in TensorFlow?",
      options: ["Python", "Java", "C#", "JavaScript"],
      answer: "Python",
    },
    {
      question:
        "Which AI model architecture is commonly used in natural language processing tasks?",
      options: ["CNN", "RNN", "Transformer", "GAN"],
      answer: "Transformer",
    },
    {
      question: "What does the term 'generative AI' refer to?",
      options: [
        "AI that can generate new content like text, images, or music",
        "AI that only classifies data",
        "AI that operates without training data",
        "AI used in hardware manufacturing",
      ],
      answer: "AI that can generate new content like text, images, or music",
    },
    {
      question:
        "Which of the following is a popular AI image generation model?",
      options: ["YOLO", "Stable Diffusion", "BERT", "Keras"],
      answer: "Stable Diffusion",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [bonusScore, setBonusScore] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !endTime) {
      interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, endTime]);

  const startQuiz = () => {
    const now = Date.now();
    setStartTime(now);
    setCurrentTime(now);
    setQuizStarted(true);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestionIndex + 1 >= questions.length) {
      const end = Date.now();
      setEndTime(end);
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setStartTime(0);
    setEndTime(null);
    setBonusScore(0);
    setNewHighScore(false);
    setShowResult(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setQuizStarted(false);
    setCurrentTime(0);
  };

  const calculateTimeTaken = () => {
    if (startTime && endTime) {
      return Math.floor((endTime - startTime) / 1000);
    }
    return null;
  };

  const calculateBonusScore = (correctAnswers: number, timeTaken: number) => {
    if (timeTaken === 0) {
      return 0;
    }
    return Math.floor((correctAnswers * 1000) / timeTaken);
  };

  useEffect(() => {
    if (endTime) {
      const timeTaken = calculateTimeTaken();
      if (timeTaken) {
        const bonus = calculateBonusScore(score, timeTaken);
        setBonusScore(bonus);

        const totalScore = score + bonus;
        const storedHighScore = Number(
          JSON.parse(localStorage.getItem("highestScore") || "0")
        );

        if (totalScore > storedHighScore) {
          localStorage.setItem("highestScore", JSON.stringify(totalScore));
          setNewHighScore(true);
        }
      }
    }
  }, [endTime, score]);

  // Show Start Page
  if (!quizStarted) {
    return <StartPage questions={questions} onStartQuiz={startQuiz} />;
  }

  // Show Result Page
  if (showResult) {
    const timeTaken = calculateTimeTaken();
    return (
      <ScorePage
        questions={questions}
        score={score}
        bonusScore={bonusScore}
        newHighScore={newHighScore}
        timeTaken={timeTaken}
        onRestart={handleRestart}
      />
    );
  }
  
  return (
    <QuizPage
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      score={score}
      selectedOption={selectedOption}
      answeredQuestions={answeredQuestions}
      startTime={startTime}
      currentTime={currentTime}
      onOptionClick={handleOptionClick}
      onNextQuestion={handleNextQuestion}
    />
  );
};

export default QuizApp;