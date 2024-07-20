"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Vortex } from "~/ui/vortex";

const amount = 100;
const secondAmount = 10;

export default function HomePage() {
  const [page, setPage] = useState(0);

  const [answers, setAnswers] = useState<string[]>([]);

  function answerQuestion(answer: string, index: number) {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });
  }

  function changePage(page: number) {
    setPage(page);
  }

  useEffect(() => {
    if (answers.length === 3) {
      if (answers[2] == "No") {
        setPage(4);
      } else {
        setPage(5);
      }
    }
  }, [answers]);

  const pages = [
    <SurveyPage0
      key={0}
      changePage={changePage}
      answerQuestion={answerQuestion}
    />,
    <SurveyPage1
      key={1}
      changePage={changePage}
      answerQuestion={answerQuestion}
    />,
    <SurveyPage2
      key={2}
      changePage={changePage}
      answerQuestion={answerQuestion}
    />,
    <SurveyPage3
      key={3}
      changePage={changePage}
      answerQuestion={answerQuestion}
    />,
    <SurveyPageBad key={4} />,
    <SurveyPageGood key={5} />,
  ];

  return (
    <main className="mx-auto h-screen w-[calc(100%-4rem)] overflow-hidden rounded-md">
      <Image
        src="/logo.png"
        alt="Flare Logo"
        width={898 / 5}
        height={437 / 5}
        priority
        className="absolute left-5 top-5 z-10"
      />
      <Suspense
        fallback={
          <Vortex
            rangeY={800}
            particleCount={500}
            baseHue={325}
            className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10"
          >
            <span className="loading loading-lg loading-dots"></span>
          </Vortex>
        }
      >
        {pages[page]}
      </Suspense>
    </main>
  );
}

type PageProps = {
  changePage: (page: number) => void;
  answerQuestion: (answer: string, index: number) => void;
};

function SurveyPage0({ changePage }: PageProps) {
  const searchParams = useSearchParams();
  const person = searchParams.get("person") ?? "";

  return (
    <Vortex
      rangeY={800}
      particleCount={500}
      baseHue={325}
      className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10"
    >
      <h2 className="text-center text-2xl font-bold text-black md:text-6xl">
        Hello{person}!
      </h2>
      <p className="mt-6 max-w-xl text-center text-sm text-black md:text-2xl">
        Before booking the meeting for your{" "}
        <span className="text-accent">${amount}</span> Amazon gift card, we need
        you to fill out a quick survey.
      </p>
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
        <button
          className="btn btn-accent btn-lg text-white"
          onClick={() => changePage(1)}
        >
          Start survey
        </button>
      </div>
    </Vortex>
  );
}

function SurveyPage1({ answerQuestion, changePage }: PageProps) {
  const searchParams = useSearchParams();
  const [answer, setAnswer] = useState<string>("");

  const company = searchParams.get("company") ?? "your company";
  const answerIndex = 0;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 py-4 transition-all duration-300 md:px-10">
      <h2 className="text-center text-sm text-black md:text-2xl">
        Question 1 of 3
      </h2>
      <p className="mt-2 max-w-xl text-center text-sm font-semibold text-black md:text-2xl">
        Does {company} currently have an outbound sales process?
      </p>
      <div className="mt-6 flex items-center gap-4">
        <button
          className="btn btn-lg btn-outline border-2"
          onClick={() => setAnswer("Yes")}
          style={{
            backgroundColor: answer === "Yes" ? "#222222" : undefined,
            color: answer === "Yes" ? "white" : undefined,
          }}
        >
          Yes
        </button>
        <button
          className="btn btn-lg btn-outline border-2"
          onClick={() => setAnswer("No")}
          style={{
            backgroundColor: answer === "No" ? "#222222" : undefined,
            color: answer === "No" ? "white" : undefined,
          }}
        >
          No
        </button>
      </div>
      {answer && (
        <div className="animate-fadeIn mt-6 flex flex-col items-center gap-4 transition-all sm:flex-row">
          <button
            className="btn btn-accent btn-lg text-white"
            onClick={() => {
              answerQuestion(answer, answerIndex);
              changePage(2);
            }}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
function SurveyPage2({ answerQuestion, changePage }: PageProps) {
  const [answer, setAnswer] = useState<string>("");
  const answerIndex = 1;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 py-4 transition-all duration-300 md:px-10">
      <h2 className="text-center text-sm text-black md:text-2xl">
        Question 2 of 3
      </h2>
      <p className="mt-2 max-w-xl text-center text-sm font-semibold text-black md:text-2xl">
        Please list all the software (if any) you are using for prospecting and
        lead generation?
      </p>
      <div className="mt-6 flex w-1/2 items-center justify-center gap-4">
        <input
          type="text"
          className="input input-bordered border-neutral w-3/4 border-2"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        ></input>
      </div>
      {answer && (
        <div className="animate-fadeIn mt-6 flex flex-col items-center gap-4 transition-all sm:flex-row">
          <button
            className="btn btn-accent btn-lg text-white"
            onClick={() => {
              answerQuestion(answer, answerIndex);
              changePage(3);
            }}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
function SurveyPage3({ answerQuestion }: PageProps) {
  const searchParams = useSearchParams();
  const [answer, setAnswer] = useState<string>("");

  const company = searchParams.get("company") ?? "your company";
  const [loading, setLoading] = useState(false);
  const answerIndex = 2;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 py-4 transition-all duration-300 md:px-10">
      <h2 className="text-center text-sm text-black md:text-2xl">
        Question 3 of 3
      </h2>
      <p className="mt-2 max-w-xl text-center text-sm font-semibold text-black md:text-2xl">
        Are you a key decision maker for {company} in regards to buying sales
        software?
      </p>
      <div className="mt-6 flex items-center gap-4">
        <button
          className="btn btn-lg btn-outline border-2"
          onClick={() => setAnswer("Yes")}
          style={{
            backgroundColor: answer === "Yes" ? "#222222" : undefined,
            color: answer === "Yes" ? "white" : undefined,
          }}
        >
          Yes
        </button>
        <button
          className="btn btn-lg btn-outline border-2"
          onClick={() => setAnswer("No")}
          style={{
            backgroundColor: answer === "No" ? "#222222" : undefined,
            color: answer === "No" ? "white" : undefined,
          }}
        >
          No
        </button>
      </div>
      {answer && (
        <div className="animate-fadeIn mt-6 flex flex-col items-center gap-4 transition-all sm:flex-row">
          <button
            className="btn btn-accent btn-lg text-white"
            onClick={() => {
              setLoading(true);
              answerQuestion(answer, answerIndex);
            }}
          >
            {loading ? <span className="loading"></span> : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}

function SurveyPageBad() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10">
      <h1 className="mt-6 max-w-xl text-center text-sm text-black md:text-2xl">
        Based on you answers, it doesn&#39;t look seem like you would be a good
        fit.
      </h1>
      <h1 className="mt-6 max-w-xl text-center text-sm text-black md:text-2xl">
        Thanks for filling out the survey though and please check out our
        website!
      </h1>
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
        <a
          className="btn btn-accent btn-lg text-white"
          href="https://flaregift.cc"
        >
          Visit our website
        </a>
      </div>
    </div>
  );
}
function SurveyPageGood() {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10">
        <h1 className="mt-6 max-w-xl text-center text-sm text-black md:text-2xl">
          It&#39;s time to come clean... we are a bootstrapped startup that
          cannot yet afford a ${amount} gift card.
        </h1>
        <h1 className="mt-6 max-w-xl text-center text-sm text-black md:text-2xl">
          We made this demo because we wanted to show you how Flare would work
          if you used it to reach a key customer.
        </h1>
        <h2 className="mt-6 max-w-xl text-center text-sm text-black md:text-2xl">
          We&#39;re sorry for the trickery, and want to offer you a{" "}
          <span className="text-accent">${secondAmount}</span> Amazon gift card,
          to discuss how Flare can help you book more meetings!
        </h2>
        <p className="mt-6 max-w-xl text-center text-xs text-black md:text-xl">
          I mean, you&#39;re already this far 🥺
        </p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="btn btn-accent btn-lg text-white"
            href="https://cal.com/flare/15min"
          >
            Book a meeting
          </a>
        </div>
      </div>
    </>
  );
}
