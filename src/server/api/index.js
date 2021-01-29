import express from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import resolver from './resolver';

export default graphqlHTTP({
    schema: buildSchema(schema),
    rootValue: resolver,
    graphiql: process.env.NODE_ENV === 'development' ? true : false
});
