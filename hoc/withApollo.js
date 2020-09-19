import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import moment from 'moment'

export default withApollo(
    ({ initialState, headers }) => {
        return new ApolloClient({
            request: (operation) => {
                operation.setContext({
                    fetchOptions: {
                        credentials: 'include',
                    },
                    headers,
                })
            },
            uri: 'http://localhost:3000/graphql',
            cache: new InMemoryCache().restore(initialState || {}),
            resolvers: {
                Portfolio: {
                    daysOfExperience(data, args, { cache }) {
                        let now = moment().unix()
                        if (data.endDate) {
                            now = data.endDate / 1000
                        }
                        const result = moment
                            .unix(now)
                            .diff(moment.unix(data.startDate / 1000), 'days')

                        return result
                    },
                },
            },
        })
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            )
        },
    }
)
