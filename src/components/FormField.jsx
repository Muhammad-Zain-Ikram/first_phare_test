const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  isPassword = false,
  isShowPassword,
  togglePasswordVisibility
}) => {
  const inputType = isPassword ? (isShowPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2 relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        className="w-full h-12 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        {...register}
      />
      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-9 right-3 text-sm text-gray-500 hover:text-gray-800"
        >
          {isShowPassword ? "🙈" : "👁️"}
        </button>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormField;
