import {buildSchema} from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Note {
        id: ID!
        title: String!
        content: String!
    }

    type Query {
        notes: [Note]
        noteById(id: ID!): Note
    }
    
    type Mutation {
        createNote(title: String!, content: String!): Note
        updateNote(id: ID!, title: String, content: String): Note
        deleteNote(id: ID!): Boolean
    }
`);

export default schema