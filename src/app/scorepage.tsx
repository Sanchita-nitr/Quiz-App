"use client";
import { Award, RotateCcw } from "lucide-react";
import React from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface ScorePageProps {
  questions: Question[];
  score: number;
  bonusScore: number;
  newHighScore: boolean;
  timeTaken: number | null;
  onRestart: () => void;
}

const ScorePage: React.FC<ScorePageProps> = ({
  questions,
  score,
  bonusScore,
  newHighScore,
  timeTaken,
  onRestart,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
          onClick={onRestart}
          className=" font-serif bg-gradient-to-t from-lime-400 to-yellow-300 hover:from-lime-500 hover:to-yellow-300 text-cyan-900 md:text-2xl sm:text-xl text-lg font-semibold md:py-4 md:px-8 py-3 px-5 rounded-2xl shadow-lg hover:shadow-xl inline-flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default ScorePage;