const { gql } = require('apollo-server');

const types = gql`
    type Query {
        chatroom: Chatroom
    }

    type Mutation {
        sendMessage(timestamp: String!, contents: String!, from: String!): Message!
    }

    type Subscription {
        newMessage: Message!
    }

    type Chatroom {
        messages: [Message]
    }

    type Message {
        timestamp: String!,
        contents: String!,
        from: String!
    }
`;

module.exports = types;