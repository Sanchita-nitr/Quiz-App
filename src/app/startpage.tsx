"use client";
import { Trophy } from "lucide-react";
import React from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface StartPageProps {
  questions: Question[];
  onStartQuiz: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ questions, onStartQuiz }) => {
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
            onClick={onStartQuiz}
            className="bg-gradient-to-t font-serif from-lime-400 to-yellow-300 hover:from-lime-500 hover:to-yellow-300 text-cyan-900 md:text-2xl sm:text-xl text-lg font-semibold md:py-4 md:px-8 py-3 px-5 rounded-2xl shadow-lg hover:shadow-xl"
          >
            Start Quiz Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;