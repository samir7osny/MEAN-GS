const User = require('../data/user.data');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    Username: {
      type: GraphQLString
    },
    Password: {
      type: GraphQLString
    },
    Token: {
      type: GraphQLString
    },
    Name: {
      type: new GraphQLObjectType({
        name: 'name',
        fields: {
          FirstName: {
            type: GraphQLString
          },
          LastName: {
            type: GraphQLString
          }
        }
      })
    }
  }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: (_, args) => {
        return User.getAllUser();
      }
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        Username: {
          type: GraphQLString
        },
        Password: {
          type: GraphQLString
        },
        FirstName: {
          type: GraphQLString
        },
        LastName: {
          type: GraphQLString
        },
      },
      resolve(parent, args){
        return User.addUser({
          Username: args.Username,
          Password: args.Password,
          Name: {
            FirstName: args.FirstName,
            LastName: args.LastName
          }
        });
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

exports.schema = Schema;
