let chatroom = {
    messages: []
};

const resolvers = {
    Query: {
        chatroom: () => chatroom,
    },
    Mutation: {
        sendMessage: (parent, args, context, info) => {
            const { timestamp, contents, from } = args;
            const newMessage = { timestamp, contents, from };
            chatroom.messages.push(newMessage);
            context.pubsub.publish("NEW_MESSAGE", newMessage);
            return newMessage;
        }
    },
    Subscription: {
        newMessage: {
            subscribe: (parent, args, context, info) => context.pubsub.asyncIterator("NEW_MESSAGE"),
            resolve: (payload) => payload
        }
    }
};

module.exports = resolvers;