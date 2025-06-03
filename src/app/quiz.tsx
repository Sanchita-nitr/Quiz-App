"use client";
import { Award, Clock, RotateCcw, Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const Quiz: React.FC = () => {
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

  const getCurrentElapsedTime = () => {
    if (startTime && currentTime) {
      return Math.floor((currentTime - startTime) / 1000);
    }
    return 0;
  };

  const calculateBonusScore = (correctAnswers: number, timeTaken: number) => {
    if (timeTaken === 0) {
      return 0;
    }
    return Math.floor((correctAnswers * 1000) / timeTaken);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) {
      return "text-green-600";
    }
    if (percentage >= 60) {
      return "text-blue-600";
    }
    if (percentage >= 40) {
      return "text-yellow-600";
    }
    return "text-red-600";
  };

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 90) {
      return "🏆";
    }
    if (percentage >= 80) {
      return "🎉";
    }
    if (percentage >= 70) {
      return "👏";
    }
    if (percentage >= 60) {
      return "👍";
    }
    return "💪";
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-lime-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-lg shadow-lime-900 p-8 md:p-12 max-w-2xl w-full text-center border border-slate-200">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-lime-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10" />
            </div>
            <h1 className="md:text-4xl text-2xl font-serif font-bold bg-gradient-to-b from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Quiz Challenge
            </h1>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className=" gap-4 text-sm">
              <div className="text-center justify-center items-center">
                <div className="font-bold md:text-4xl text-2xl text-cyan-800 font-serif">
                  {questions.length}
                </div>
                <div className="text-slate-600 ">Questions</div>
              </div>
            </div>
          </div>
          <div className="transition-all duration-300 transform hover:scale-105">
            <button
              onClick={startQuiz}
              className="bg-gradient-to-t font-serif from-lime-400 to-yellow-300 hover:from-lime-500 hover:to-yellow-300 text-cyan-900 md:text-2xl sm:text-xl text-lg font-semibold md:py-4 md:px-8 py-3 px-5 rounded-2xl shadow-lg hover:shadow-xl"
            >
              Start Quiz Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const timeTaken = calculateTimeTaken();
    const totalScore = score + bonusScore;
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-lime-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-md shadow-lime-900 p-8 md:p-12 max-w-2xl w-full text-center border border-slate-200">
          <div className="mb-8">
            <div className="text-6xl mb-4">{getScoreEmoji(percentage)}</div>
            <h1 className="md:text-4xl text-3xl font-bold bg-gradient-to-r font-serif from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Quiz Completed!
            </h1>
            {newHighScore && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white md:px-6 md:py-3 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
                <Award className="w-5 h-5" />
                <span className="font-semibold">New High Score!</span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Correct Answers</span>
                  <span
                    className={`font-bold text-xl ${getScoreColor(percentage)}`}
                  >
                    {score} / {questions.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Accuracy</span>
                  <span
                    className={`font-bold text-xl ${getScoreColor(percentage)}`}
                  >
                    {percentage}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Bonus</span>
                  <span className="font-bold text-xl text-cyan-700">
                    {bonusScore}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Score</span>
                  <span className="font-bold text-2xl text-cyan-800">
                    {totalScore}
                  </span>
                </div>
                {timeTaken && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Time Taken</span>
                    <span className="font-bold text-xl text-slate-700">
                      {formatTime(timeTaken)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Avg. per Question</span>
                  <span className="font-bold text-lg text-slate-700">
                    {timeTaken
                      ? formatTime(Math.floor(timeTaken / questions.length))
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className=" font-serif bg-gradient-to-t from-lime-400 to-yellow-300 hover:from-lime-500 hover:to-yellow-300 text-cyan-900 md:text-2xl sm:text-xl text-lg font-semibold md:py-4 md:px-8 py-3 px-5 rounded-2xl shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen p-4">
      <div>
        {/* Header */}
        <div className=" rounded-2xl p-6 mb-6 ">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-amber-400 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 font-serif">
                  Challenging Quiz
                </h1>
                <div className="text-slate-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">
                  {formatTime(getCurrentElapsedTime())}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-600 via-yellow-400 to-lime-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200 p-6 my-10 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Question Navigator
          </h3>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
                  index === currentQuestionIndex
                    ? "bg-red-600 text-white"
                    : answeredQuestions[index]
                    ? "bg-green-100 text-green-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl overflow-hidden border-t border-slate-200 border-l border-r">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b  border-slate-200">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed ">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                    selectedOption === option
                      ? "border-lime-500 bg-yellow-50 shadow-md"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${
                        selectedOption === option
                          ? "border-lime-500 bg-yellow-50"
                          : "border-slate-300 text-slate-500"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center mt-8 font-serif transition-all duration-300 transform hover:scale-105">
              <button
                onClick={handleNextQuestion}
                disabled={!selectedOption}
                className={`px-8 py-4 mt-6 rounded-xl font-semibold ${
                  selectedOption
                    ? "bg-gradient-to-t font-serif from-lime-400 to-yellow-300 hover:from-lime-500 hover:to-yellow-300 text-cyan-900 md:text-2xl sm:text-xl text-lg hover:shadow-lg hover:shadow-lime-200"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {currentQuestionIndex + 1 === questions.length
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
