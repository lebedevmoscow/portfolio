import moment from 'moment'

export const formatDate = (data) => {
    return moment.unix(data / 1000).format('DD/MM/YY')
}
