const { posts } = require('../../fakeDb/data')

exports.portfolioQueries = {
    portfolio: (root, args, ctx) => {
        return ctx.models.Portfolio.getById(args.id)
    },
    portfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAll()
    },

    userPortfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAllByUser()
    },
}

exports.portfolioMutations = {
    createPortfolio: async (root, { input }, ctx) => {
        const createdPortfolio = await ctx.models.Portfolio.create(input)
        return createdPortfolio
    },

    updatePortfolio: async (root, { id, input }, ctx) => {
        const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(
            id,
            input
        )
        return updatedPortfolio
    },

    deletePortfolio: async (root, { id }, ctx) => {
        const deleted = await ctx.models.Portfolio.findAndDelete(id)
        return deleted._id
    },
}

exports.userMutations = {
    signUp: async (root, args, ctx) => {
        const registeredUser = await ctx.models.User.signUp(args.input)
        return registeredUser._id
    },

    signIn: (root, args, ctx) => {
        return ctx.models.User.signIn(args.input, ctx)
    },

    signOut: (root, args, ctx) => {
        return ctx.models.User.signOut(ctx)
    },
}

exports.userQueries = {
    user: (root, args, ctx) => {
        return ctx.models.User.getAuthUser(ctx)
    },
}

exports.forumQueries = {
    forumCategories: (root, args, ctx) => {
        return ctx.models.ForumCategory.getAll()
    },

    topicsByCategory: async (root, { category }, ctx) => {
        const forumCategory = await ctx.models.ForumCategory.getBySlug(category)
        if (forumCategory) {
            return ctx.models.Topic.getAllByCategory(forumCategory._id)
        }
    },
    topicBySlug: (root, { slug }, ctx) => {
        return ctx.models.Topic.getBySlug(slug)
    },

    postsByTopic: async (root, { slug }, ctx) => {
        const topic = await ctx.models.Topic.getBySlug(slug)
        const posts = await ctx.models.Post.getAllByTopic(topic)

        return posts
    },
}

exports.forumMutations = {
    createTopic: async (root, { input }, ctx) => {
        const category = await ctx.models.ForumCategory.getBySlug(
            input.forumCategory
        )
        input.forumCategory = category._id
        const topic = await ctx.models.Topic.create(input)
        return topic
    },

    createPost: async (root, { input }, ctx) => {
        const post = await ctx.models.Post.create(input)
        return post
    },
}
