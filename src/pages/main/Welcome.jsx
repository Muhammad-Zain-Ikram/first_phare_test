import { Link, useNavigate } from "react-router-dom";
import { Button, LanguageSelection } from "../../components";
import Career from "../../assets/career.svg";
import { useTranslation } from "react-i18next";

function Welcome() {
  const navigate = useNavigate();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const handleContinue = () => {
    navigate("/signup");
  };

  return (
    <div
      dir={language === "ur" ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col"
    >
      {/* Header with Language Selector */}
      <header className="w-full flex justify-around items-center px-4 py-4 sm:px-6 lg:px-8 border-b border-slate-300">
         <Link to="/faqs" className="block text-center group">
  <span className="inline-block bg-blue-600 text-white text-sm sm:text-base font-semibold px-5 py-2 rounded-full border border-blue-700 shadow-md transition-all duration-300 ease-in-out group-hover:bg-blue-700 group-hover:shadow-lg group-active:scale-95">
    FAQs
  </span>
</Link>
        <div className="rounded-full p-1">
          <LanguageSelection />
        </div>
      </header>

      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-center mt-2 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="w-full max-w-md mx-auto space-y-6 sm:space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              {t("titles.part1")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                {t("titles.part2")}
              </span>
            </h1>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center px-4 py-6">
            <div className="max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-xl mx-auto relative">
              <img
                src={Career}
                alt={t("imageAlt")}
                className="relative z-10 transition-transform duration-500 ease-in-out transform hover:scale-105 object-cover w-xs h-auto"
                loading="eager"
              />
            </div>
          </div>

          {/* Description */}
          <div className="text-center px-2">
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
              {t("descriptions.part1")}
              <span className="font-medium text-slate-800">
                {" "}
                {t("descriptions.part2")}
              </span>
              .
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {t("buttons.continue")}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 pt-4 opacity-70">
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{t("messages.quizTime")}</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-slate-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{t("messages.personalized")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
