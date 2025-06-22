import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronUpIcon, ChevronDownIcon, ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSelection from "../../components/LanguageSelection";

const FAQPage = memo(() => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const faqs = t("faqs", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(null);
  const dir = i18n.language === "ur" ? "rtl" : "ltr";

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Bar: Back + Language Selector */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          {t("buttons.back")}
        </button>

        <div className="rounded-full">
          <LanguageSelection />
        </div>
      </div>

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-slate-900 text-center">
        {t("titles.faq_title")}
      </h1>

      {/* FAQs */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={idx} className="bg-white shadow-sm rounded-lg transition hover:shadow-md">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-desc-${idx}`}
                className="w-full p-4 flex justify-between items-center text-left"
              >
                <span className="font-medium text-slate-800">{faq.question}</span>
                {isOpen ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {isOpen && (
                <div id={`faq-desc-${idx}`} className="px-4 pb-4 text-sm text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default FAQPage;
