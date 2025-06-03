"use client";
import { Clock, Trophy } from "lucide-react";
import React from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedOption: string | null;
  answeredQuestions: boolean[];
  startTime: number;
  currentTime: number;
  onOptionClick: (option: string) => void;
  onNextQuestion: () => void;
}

const QuizPage: React.FC<QuizProps> = ({
  questions,
  currentQuestionIndex,
  selectedOption,
  answeredQuestions,
  startTime,
  currentTime,
  onOptionClick,
  onNextQuestion,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentElapsedTime = () => {
    if (startTime && currentTime) {
      return Math.floor((currentTime - startTime) / 1000);
    }
    return 0;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-lime-50 to-yellow-50 p-4">
      <div>
        {/* Header */}
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
                    ? "border-lime-500 bg-yellow-50 shadow-md text-slate-700"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                }`}
                onClick={() => onOptionClick(option)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${
                      selectedOption === option
                        ? "border-lime-500 bg-yellow-50"
                        : "border-slate-300"
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
              onClick={onNextQuestion}
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
  );
};

export default QuizPage;