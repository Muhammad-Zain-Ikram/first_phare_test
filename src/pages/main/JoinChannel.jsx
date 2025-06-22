import { useTranslation } from "react-i18next";
import { LanguageSelection } from "../../components";
function JoinChannel() {
  const { t } = useTranslation();
  const date = new Date("2025-03-12").toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 overflow-hidden px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="w-full flex justify-end items-start px-4 py-4 sm:px-6 lg:px-8">
          <LanguageSelection />
        </header>

        {/* Background Effects */}
        <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 top-[-4rem] left-[-4rem] z-0" />
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 bottom-[-5rem] right-[-6rem] z-0" />

        {/* Card */}
        <div className="relative z-10 w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t("join.title")}
          </h2>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
            {t("join.description", { date })}
          </p>

          <a
            href="https://www.whatsapp.com/channel/0029VbALYAG7Noa9ZOlDo13h"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 w-full sm:w-auto inline-block text-center shadow-lg"
          >
            🚀 {t("join.button")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default JoinChannel;
