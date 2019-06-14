const User = require('../data/user.data');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

const usertype = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(usertype),
      resolve: (_, args) => {
        return User.getAllUser();
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

exports.schema = schema;
