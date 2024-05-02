import express from 'express';
import {graphqlHTTP} from "express-graphql";
import schema from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import connectDB from "./config/db.js";

const app = express();

async function startServer() {
    try {
        // Connect to MongoDB
        await connectDB();

        // GraphQL endpoint
        app.use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: resolvers,
            graphiql: true,
        }));

        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error('Failed to connect to MongoDB server not started', error);
    }
}

await startServer();
