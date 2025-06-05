const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
    }

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
    users: [User]
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

input BookInput {
    bookId: String!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
}



type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookInput: BookInput!): User
    removeBook(bookId: String!): User
}
`;

export default typeDefs;