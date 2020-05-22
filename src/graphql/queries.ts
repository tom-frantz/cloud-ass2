/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const temperature = /* GraphQL */ `
    query Temperature {
        temperature
    }
`;
export const getUser = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            username
            email
        }
    }
`;
export const me = /* GraphQL */ `
    query Me {
        me {
            id
            username
            email
        }
    }
`;
export const listUsers = /* GraphQL */ `
    query ListUsers($filter: TableUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                username
                email
            }
            nextToken
        }
    }
`;
