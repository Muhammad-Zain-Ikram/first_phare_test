import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import services from "../../appwrite/config";
import { Button } from "../../components";
import { Globe, Check } from "lucide-react";


function LanguageSelector() {
  const navigate = useNavigate();
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  
  const languages = [
    { code: "en", labelKey: "English" },
    { code: "ur", labelKey: "Urdu" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [totalResponse, setTotalResponse] = useState(null);

  useEffect(() => {
    const fetchTotalResponses = async () => {
      try {
        const res = await services.getData();
        const total = res?.documents?.length || 0;
        setTotalResponse(total);

        if (total >= 500) {
          localStorage.setItem("isCompleted", "true");
        }
      } catch (err) {
        console.error("Error fetching responses:", err);
        setTotalResponse(0);
      }
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(fetchTotalResponses);
    } else {
      setTimeout(fetchTotalResponses, 250);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      selectedLanguage === "ur" ? "rtl" : "ltr"
    );
  }, [selectedLanguage]);

  const handleLanguageSelect = (code) => {
    setSelectedLanguage(code);
    changeLanguage(code);
  };

  const handleContinue = () => {
    navigate("/welcome");
  };

  const isUrdu = selectedLanguage === "ur";

  if (totalResponse >= 500) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
        <p className="text-green-700 bg-green-100 border border-green-300 rounded-md px-6 py-3 text-center text-sm sm:text-base font-medium shadow">
          {t("messages.complete")}
        </p>
      </div>
    );
  }

  const showEnrolledMessage = totalResponse >= 200;
 const message = t("messages.cta_message", {
    count: totalResponse,
    total: 500,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-6">

        {showEnrolledMessage && (
          <div className="text-center">
            <p className="inline-block bg-yellow-100 text-yellow-800 text-sm sm:text-base font-medium px-4 py-2 rounded-full border border-yellow-300 shadow-sm animate-pulse">
              🚀 {message}
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Globe className="w-11 h-11 text-white" />
          </div>
        </div>

        <div className={`${isUrdu ? "text-right" : "text-center"} space-y-1`}>
          <h1 className="text-2xl font-bold text-slate-900">
            {t("titles.selectLanguage")}
          </h1>
          <p className="text-slate-600 text-sm">
            {t("descriptions.chooseLanguage")}
          </p>
        </div>

        <div className="space-y-3">
          {languages.map(({ code, labelKey }) => {
            const isSelected = selectedLanguage === code;
            return (
              <button
                key={code}
                onClick={() => handleLanguageSelect(code)}
                className={`w-full p-4 rounded-lg border-2 flex items-center justify-between transition duration-200 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <span
                  className={`font-medium ${
                    isSelected ? "text-blue-700" : "text-slate-700"
                  }`}
                >
                  {t(labelKey)}
                </span>
                {isSelected && <Check className="w-5 h-5 text-blue-500" />}
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-200 shadow-lg hover:shadow-xl"
        >
          {t("buttons.continue")}
        </Button>
      </div>
    </div>
  );
}

export default LanguageSelector;
