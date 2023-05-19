import { clsx } from "clsx"

const variants = {
  primary: "bg-blue-600 text-white",
}

const sizes = {
  md: "px-3 py-1.5 text-lg font-medium",
}

const Button = (props) => {
  const {
    className,
    variant = "primary",
    size = "md",
    square = false,
    ...otherProps
  } = props

  return (
    <button
      className={clsx(
        variants[variant],
        sizes[size],
        {
          "rounded-lg": !square,
        },
        className
      )}
      {...otherProps}
    />
  )
}

export default Button
