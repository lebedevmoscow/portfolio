import {
    GET_PORTFOLIOS,
    CREATE_PORTFOLIO,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    SIGN_IN,
    GET_USER,
} from './../queries/index'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useLazyQuery } from 'react-apollo'

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS)
export const useCreatePortfolio = () =>
    useMutation(CREATE_PORTFOLIO, {
        // Updating the Apollo Cache
        update(cache, { data: { createPortfolio } }) {
            // Getting already existing data from cache
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS })
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: {
                    portfolios: [...portfolios, createPortfolio],
                },
            })
        },
    })

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO)
export const useDeletePortfolio = () =>
    useMutation(DELETE_PORTFOLIO, {
        update(cache, { data: { deletePortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS })
            const newPortfolios = portfolios.filter(
                (p) => p._id !== deletePortfolio
            )
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: newPortfolios },
            })
        },
    })

// Auth actions

export const useSignIn = () => {
    return useMutation(SIGN_IN, {
        update(cache, { data: { signIn: signedInUser } }) {
            cache.writeQuery({
                query: GET_USER,
                data: { user: signedInUser },
            })
        },
    })
}

export const useLazyGetUser = () => {
    return useLazyQuery(GET_USER)
}

export const useSignOut = () => useMutation(SIGN_OUT)
export const useGetUser = () => useQuery(GET_USER)
