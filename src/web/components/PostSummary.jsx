import Link from "@/web/components/Link.jsx"

const PostSummary = (props) => {
  const {
    post: { _id, title, content, tags, publishedAt },
  } = props

  const summary = content.split(/\n+/)[0].slice(0, 100)

  return (
    <article className="flex flex-col gap-2">
      <header>
        <h1 className="text-lg font-semibold">
          <Link href={`/posts/${_id}`}>{title}</Link>
        </h1>
        <p className="text-sm italic text-neutral-500">
          Published on {publishedAt}
        </p>
      </header>
      <div>{summary.length < 100 ? summary : `${summary.trim()}...`}</div>
      {tags.length !== 0 && (
        <p className="flex gap-1.5 text-sm">
          {tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
      )}
    </article>
  )
}

export default PostSummary
