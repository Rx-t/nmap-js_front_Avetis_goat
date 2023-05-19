import clsx from "clsx"

import { useField } from "formik"

const FormField = ({
  className,
  name,
  label,
  placeholder,
  square = false,
  ...otherProps
}) => {
  const [field, { error, touched }] = useField({ name })

  return (
    <label className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <span className="text-sm font-semibold text-neutral-700">{label}</span>
      )}
      <input
        {...field}
        className={clsx(
          "border-2 px-3 py-1.5 outline-none focus:border-blue-600",
          {
            "rounded-lg": !square,
          }
        )}
        placeholder={placeholder || label}
        {...otherProps}
      />
      {touched && error && (
        <span className="text-sm font-semibold text-red-500">{error}</span>
      )}
    </label>
  )
}

export default FormField
