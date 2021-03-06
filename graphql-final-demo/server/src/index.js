const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => 'This is an awesome API',
    users: (root, args, context, info) => {
      return context.prisma.users()
    }
  },
  Mutation: {
    createUser: (root, args, context) => {
      return context.prisma.createUser({
        name: args.name
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {prisma}
})
server.start(() => console.log(`Server is running on http://localhost:4000`))