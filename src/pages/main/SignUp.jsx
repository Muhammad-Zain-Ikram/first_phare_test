import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import authService from "../../appwrite/auth";
import services from "../../appwrite/config";
import { LanguageSelection, FormField, Dropdown } from "../../components";

function SignUp() {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isUserAgree, setIsUserAgree] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) navigate("/survey");
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const dir = language === "ur" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
  }, [language]);

  const onSubmit = async (data) => {
    setSubmitError("");

    if (!isUserAgree) {
      setError("terms", { type: "manual", message: t("errors.terms") });
      return;
    }

    try {
      const user = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (user) {
        await services.addData({
          gender: data.gender,
          user_class: data.class,
          user_id: user.$id,
          language,
          phone: data.phone,
          institute: data.institute,
        });
        navigate("/survey");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const message = err?.message || t("errors.generic");
      setSubmitError(message);

      if (err?.code === 409 || message.includes("already")) {
        setError("email", {
          type: "manual",
          message: t("errors.emailTaken"),
        });
      }
    }
  };

  return (
    <div
      dir={language === "ur" ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center px-4 py-6"
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
        <header className="flex justify-end items-center px-4 py-3 border-b border-slate-200">
          <LanguageSelection />
        </header>

        <div className="text-center p-5 space-y-2">
          <div className="mx-auto w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {t("signup.title")}
          </h1>
          <p className="text-gray-600 text-base">{t("signup.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
          <FormField
            id="name"
            label={t("signup.fullName")}
            placeholder={t("signup.fullNamePlaceholder")}
            register={register("name", {
              required: t("errors.nameRequired"),
              minLength: { value: 2, message: t("errors.nameLength") },
            })}
            error={errors.name?.message}
          />

          <FormField
            id="email"
            type="email"
            label={t("signup.email")}
            placeholder={t("signup.emailPlaceholder")}
            register={register("email", {
              required: {
                value: true,
                message: t("errors.emailRequired"),
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("errors.emailPattern"),
              },
            })}
            error={errors.email?.message}
          />

          <FormField
            id="password"
            label={t("signup.password")}
            placeholder={t("signup.passwordPlaceholder")}
            register={register("password", {
              required: t("errors.passwordRequired"),
              minLength: {
                value: 8,
                message: t("errors.passwordLength"),
              },
            })}
            error={errors.password?.message}
            isPassword
            isShowPassword={isShowPassword}
            togglePasswordVisibility={() => setIsShowPassword(!isShowPassword)}
          />
          <FormField
            id="phone"
            type="tel"
            label={t("signup.phone")}
            placeholder={t("signup.phonePlaceholder")}
            register={register("phone")}
            error={errors.phone?.message}
          />

          <Dropdown
            id="class"
            label={t("signup.class")}
            register={register("class", {
              required: t("errors.classRequired"),
            })}
            options={[
              { value: "ics", label: "ICS" },
              { value: "fsc", label: "FSc" },
              { value: "icom", label: "ICom" },
            ]}
            error={errors.class?.message}
          />

          <Dropdown
            id="gender"
            label={t("signup.gender")}
            register={register("gender", {
              required: t("errors.genderRequired"),
            })}
            options={[
              { value: "male", label: t("gender.male") },
              { value: "female", label: t("gender.female") },
            ]}
            error={errors.gender?.message}
          />

          <Dropdown
            id="institute"
            label={t("signup.institute")}
            register={register("institute", {
              required: t("errors.instituteRequired"),
            })}
            options={[
              { value: "public", label: t("institute.public") },
              { value: "private", label: t("institute.private") },
            ]}
            error={errors.institute?.message}
          />

          <div className="flex items-center gap-3 ">
            <input
              type="checkbox"
              id="terms"
              checked={isUserAgree}
              onChange={(e) => setIsUserAgree(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-700 leading-5">
              <Trans i18nKey="signup.termsFull">
                <span>I agree to the </span>
                <Link
                  to="/terms-and-conditions"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Terms & Conditions
                </Link>
              </Trans>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500 -mt-3">{errors.terms.message}</p>
          )}

          {submitError && (
            <div className="text-red-600 text-sm text-center">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isUserAgree}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md shadow-md hover:scale-105 transition-all disabled:opacity-50"
          >
            {isSubmitting ? t("signup.loading") : t("signup.button")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
