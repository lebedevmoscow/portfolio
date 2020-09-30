import {
    useGetTopicBySlug,
    useGetPostsByTopic,
} from './../../../apollo/actions'
import BaseLayout from './../../../layouts/BaseLayout'
import { useRouter } from 'next/router'
import withApollo from './../../../hoc/withApollo'
import { getDataFromTree } from '@apollo/react-ssr'
import PostItem from './../../../components/forum/PostItem'

const useInitialData = () => {
    const router = useRouter()
    const { slug } = router.query
    const { data: dataT } = useGetTopicBySlug({ variables: { slug } })
    const { data: dataP } = useGetPostsByTopic({ variables: { slug } })

    const posts = (dataP && dataP.postsByTopic) || {}
    const topic = (dataT && dataT.topicBySlug) || {}

    return { topic, posts }
}

const Posts = () => {
    const { topic, posts } = useInitialData()
    console.log('posts', posts)
    return (
        <BaseLayout>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>{topic.title}</h1>
                    </div>
                </div>
            </section>
            <section>
                <div className="fj-post-list">
                    {topic._id && (
                        <PostItem post={topic} className="topic-post-lead" />
                    )}
                    {posts.length > 0 &&
                        posts.map((post) => {
                            return (
                                <div className="row">
                                    <div className="col-md-9">
                                        <PostItem key={post._id} post={post} />
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </section>
        </BaseLayout>
    )
}

export default withApollo(Posts, { getDataFromTree })
