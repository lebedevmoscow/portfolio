import BaseLayout from './../../../layouts/BaseLayout'
import {
    useGetTopicsByCategory,
    useGetUser,
    useCreateTopic,
} from './../../../apollo/actions'
import withApollo from './../../../hoc/withApollo'
import { useRouter } from 'next/router'
import { getDataFromTree } from '@apollo/react-ssr'
import Replier from './../../../components/shared/Replier'
import { useState } from 'react'

const useInitialData = () => {
    const router = useRouter()
    const { slug } = router.query
    const { data: dataT } = useGetTopicsByCategory({
        variables: { category: slug },
    })
    const { data: dataU } = useGetUser()
    const topicsByCategory = (dataT && dataT.topicsByCategory) || []
    const user = (dataU && dataU.user) || null
    return { topicsByCategory, user, slug }
}

const Topics = () => {
    const [isReplierOpen, setReplierOpen] = useState(false)
    const { topicsByCategory, user, slug } = useInitialData()
    const [createTopic] = useCreateTopic()

    const handleCreateTopic = async (topicData, done) => {
        topicData.forumCategory = slug
        createTopic({ variables: topicData }).then(() => {
            setReplierOpen(false)
            done()
        })
    }

    return (
        <BaseLayout>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>Select a topic</h1>
                        {user && (
                            <button
                                disabled={!user}
                                className="btn btn-primary"
                                onClick={() => setReplierOpen(true)}>
                                Create Topic
                            </button>
                        )}
                    </div>
                </div>
            </section>
            <section className="fj-topic-list">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Topic</th>
                            <th scope="col">Category</th>
                            <th scope="col">Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topicsByCategory.map((topic) => {
                            return (
                                <tr key={topic._id}>
                                    <th>{topic.title}</th>
                                    <td className="category">
                                        {topic.forumCategory.title}
                                    </td>
                                    <td>{topic.user.username}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
            <Replier
                isOpen={isReplierOpen}
                onClose={() => setReplierOpen(false)}
                closeBtn={() => {
                    return (
                        <a
                            onClick={() => setReplierOpen(false)}
                            className="btn py-2 ttu gray-10">
                            Cancel
                        </a>
                    )
                }}
                onSubmit={handleCreateTopic}
            />
        </BaseLayout>
    )
}

export default withApollo(Topics, { getDataFromTree })
