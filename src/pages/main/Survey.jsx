import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelection } from "../../components";
import services from "../../appwrite/config";
import authService from "../../appwrite/auth";

const Survey = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [transition, setTransition] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = t("survey.questions", { returnObjects: true });
  const options = [
    t("survey.options.stronglyDisagree"),
    t("survey.options.disagree"),
    t("survey.options.neutral"),
    t("survey.options.agree"),
    t("survey.options.stronglyAgree"),
  ];

  useEffect(() => {
    const init = async () => {
      const user = await authService.getCurrentUser();
      const local = localStorage.getItem("isSubmit");

      if (local) return setHasSubmitted(true);

      if (user) {
        try {
          const result = await services.getDataByUserId(user.$id);
          if (result?.[0]?.responses?.length) {
            setHasSubmitted(true);
          }
        } catch (error) {
          console.error("Error checking submission:", error);
        }
      }
    };

    init();
  }, []);
  useEffect(() => {
    console.log(showPopup);
  }, [showPopup]);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    setTimerId(id);

    return () => clearInterval(id);
  }, []);

  const handleOptionClick = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = index + 1;
    setAnswers(updatedAnswers);

    setTransition(true);
    setTimeout(() => {
      setTransition(false);
      if (current < questions.length - 1) {
        setCurrent((prev) => prev + 1);
      }
    }, 250);
  };
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  const prevQuestion = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    clearInterval(timerId);

    const timeTaken = formatTime(elapsed);
    setIsSubmitting(true);
    const user = await authService.getCurrentUser();

    if (user) {
      try {
        const success = await services.updateData(user.$id, answers, timeTaken);
        if (success) {
          localStorage.setItem("isSubmit", "true");
          navigate("/join");
        } else {
          alert(t("errors.generic"));
        }
      } catch (error) {
        console.error("Submit error:", error);
        alert(t("errors.generic"));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const progress = ((current + 1) / questions.length) * 100;

  if (hasSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto animate-bounce">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {t("survey.submitted.title")}
          </h2>
          <p className="text-gray-600 text-base">
            {t("survey.submitted.description")}
          </p>
          <button
            onClick={() => navigate("/join")}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
          >
            {t("survey.submitted.button")}
          </button>
        </div>
      </div>
    );
  }
  if (showPopup) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {t("survey.popup.title")}
          </h2>
          <p className="text-gray-600">{t("survey.popup.description")}</p>
          <button
            onClick={() => setShowPopup(false)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {t("survey.popup.continue")}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <header className="flex justify-end border-b border-slate-300 pb-4">
          <LanguageSelection />
        </header>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          className={`transition-opacity duration-300 ${
            transition ? "opacity-0" : "opacity-100"
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            {current + 1}. {questions[current]}
          </h2>

          <div className="grid gap-4">
            {options.map((option, index) => {
              const selected = answers[current] === index + 1;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={`w-full px-5 py-3 rounded-xl border text-left font-medium transition-all duration-200 ${
                    selected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6">
          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-white font-semibold disabled:opacity-50"
          >
            {t("survey.navigation.back")}
          </button>

          {answers.length - 1 === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50"
            >
              {isSubmitting
                ? t("survey.navigation.loading")
                : t("survey.navigation.submit")}
            </button>
          ) : (
            <span className="invisible px-6 py-2">Next</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Survey;
