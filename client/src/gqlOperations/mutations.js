import {gql} from '@apollo/client'
export const SIGNUP_USER = gql`
    mutation createUser($userNew:UserInput!){
        user:signupUser(userNew:$userNew){ 
           firstName
        }
    }
`

export const LOGIN_USER = gql`
    mutation SigninUser($userSignin:UserSigninInput!){
        user:signinUser(userSignin:$userSignin){ 
           token
    }
  }
`

export const CREATE_QUOTE = gql`
    mutation createQuote($name:String!){
        quote:createQuote(name:$name)
  }
`

export const DELETE_QUOTE = gql`
    mutation deleteQuote($_id: ID!) {
        quote: deleteQuote(_id: $_id){
        _id
    }
  }
`;

export const UPDATE_QUOTE = gql`
  mutation updateQuote($_id: ID!, $name: String!) {
    quote:updateQuote(_id: $_id, name: $name) {
      _id
      name
    }
  }
`;