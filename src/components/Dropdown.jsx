const Dropdown = ({ id, label, register, options, error }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      className="w-full h-12 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
      {...register}
      defaultValue=""
    >
      <option value="" disabled>
        -- Select --
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-sm text-red-500">{error}</p>
    )}
  </div>
);

export default Dropdown