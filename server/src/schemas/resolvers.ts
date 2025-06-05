import { User } from '../models/index.js';
import { signToken } from '../services/auth.js';

const resolvers = {
    Query: {
        users: async () => {
            try {
                return await User.find().populate('savedBooks');
            }
            catch (err) {
                console.error(err);
                throw new Error('Failed to fetch users');
            }
        },
        me: async (_parent:unknown, _args:unknown, context:any) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
                return userData;
            }
            throw new Error('Not logged in');
        }
    },
    
    Mutation:{
        addUser: async (_parent:unknown, args:unknown) => {
            const user = await User.create(args);
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        login: async (_parent:unknown, { email, password }:any) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error('Incorrect credentials');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        saveBook: async (_parent:unknown, {bookInput}:any, context:any) => {
            console.log( "bookdata", bookInput);
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookInput } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new Error('Not logged in');
        },
        removeBook: async (_parent:unknown, { bookId }:any, context:any) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new Error('Not logged in');
        }
    }
}

export default resolvers;