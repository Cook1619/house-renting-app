import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
  } from "graphql";
  import { listings } from "./listings";


//This is defining how we think the data will be coming in because GraphQL is a 
//strongly typed language, GraphQLNonNull makes sure the value can't be null, the must be enforced or an error with be thrown
const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
      id: { type: GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLNonNull(GraphQLString) },
      image: { type: GraphQLNonNull(GraphQLString) },
      address: { type: GraphQLNonNull(GraphQLString) },
      price: { type: GraphQLNonNull(GraphQLInt) },
      numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
      numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
      numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
      rating: { type: GraphQLNonNull(GraphQLFloat) }
    }
  });
// name is the action type, fields are the data in this action type
// The resolver is what actually brings back the data when that query/mutation is executed
const query = new GraphQLObjectType({
    name: "Query",
    fields: {
      listings: {
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
        resolve: () => {
          return listings;
        }
      }
    }
  });

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      deleteListing: {
        type: GraphQLNonNull(Listing),
        args: {
          id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (_root, { id }) => {
          for (let i = 0; i < listings.length; i++) {
            if (listings[i].id === id) {
              return listings.splice(i, 1)[0];
            }
          }
  
          throw new Error("failed to deleted listing");
        }
      }
    }
  });

export const schema = new GraphQLSchema({ query, mutation });
