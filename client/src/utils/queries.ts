import { gql } from '@apollo/client';

  export const GET_ME = gql`
    query Query {
     me {
      _id
      bookCount
      email
      password
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }`;