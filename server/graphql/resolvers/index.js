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
