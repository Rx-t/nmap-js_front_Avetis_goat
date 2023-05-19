import clsx from "clsx"

import NextLink from "next/link.js"

const Link = (props) => {
  const { className, ...otherProps } = props

  return (
    <NextLink className={clsx("hover:underline", className)} {...otherProps} />
  )
}

export default Link
