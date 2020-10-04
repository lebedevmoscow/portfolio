const uniqueSlug = require('unique-slug')
const moment = require('moment')

class Post {
    constructor(model, user) {
        this.Model = model
        this.user = user
    }

    getAllByTopic(topic) {
        return this.Model.find({ topic })
            .sort('fullSlug')
            .populate('topic')
            .populate('user')
            .populate({ path: 'parent', populate: 'user' })
    }

    async create(post) {
        if (!this.user) {
            throw new Error('You must me signed in to create a post')
        }

        post.user = this.user

        const createdAt = moment().toISOString()
        const slugPart = uniqueSlug()
        const fullSlugPart = createdAt + ':' + slugPart

        if (post.parent) {
            const parent = await this.Model.findById(post.parent)
            post.slug = parent.slug + '/' + slugPart
            post.fullSlug = parent.fullSlug + '/' + fullSlugPart
        } else {
            post.slug = slugPart
            post.fullSlug = fullSlugPart
        }

        console.log('post', post)
        const createdPost = await this.Model.create(post)
        console.log('created', createdPost)
        return this.Model.findById(createdPost._id)
            .populate('topic')
            .populate('user')
            .populate({ path: 'parent', populate: 'user' })
    }
}

module.exports = Post
