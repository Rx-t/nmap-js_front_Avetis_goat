import Loader from "@/web/components/Loader.jsx"

import Page from "@/web/components/Page.jsx"

import api from "@/web/services/api.js"

import { useEffect, useState } from "react"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      postId: params.postId,
    },
  },
})

const PostPage = (props) => {
  const [post, setPost] = useState(null)

  const { postId } = props.params

  useEffect(() => {
    ;

(async () => {
      const {
        data: { result },
      } = await api(`/posts/${postId}`)

      setPost(result)
    })()
  }, [postId])

  return <Page>{post ? <></> : <Loader />}</Page>
}

export default PostPage
