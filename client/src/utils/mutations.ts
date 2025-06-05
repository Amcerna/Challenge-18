import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      bookCount
      username
    }
  }
}`;

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
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
      _id
    }
  }
}`;

export const SAVE_BOOK = gql`
mutation Mutation($bookInput: BookInput!) {
  saveBook(bookInput: $bookInput) {
    bookCount
    _id
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

export const REMOVE_BOOK = gql`
mutation Mutation($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
    username
    bookCount
  }
}`;