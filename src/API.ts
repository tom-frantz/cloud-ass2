/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
    id: string;
    username: string;
    email?: string | null;
};

export type UpdateUserInput = {
    id: string;
    username?: string | null;
    email?: string | null;
};

export type DeleteUserInput = {
    id: string;
};

export type TableUserFilterInput = {
    id?: TableIDFilterInput | null;
    username?: TableStringFilterInput | null;
    email?: TableStringFilterInput | null;
};

export type TableIDFilterInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
};

export type TableStringFilterInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
};

export type CreateUserMutationVariables = {
    input: CreateUserInput;
};

export type CreateUserMutation = {
    createUser: {
        __typename: "User";
        id: string;
        username: string;
        email: string | null;
    } | null;
};

export type UpdateUserMutationVariables = {
    input: UpdateUserInput;
};

export type UpdateUserMutation = {
    updateUser: {
        __typename: "User";
        id: string;
        username: string;
        email: string | null;
    } | null;
};

export type DeleteUserMutationVariables = {
    input: DeleteUserInput;
};

export type DeleteUserMutation = {
    deleteUser: {
        __typename: "User";
        id: string;
        username: string;
        email: string | null;
    } | null;
};

export type TemperatureQuery = {
    temperature: number | null;
};

export type GetUserQueryVariables = {
    id: string;
};

export type GetUserQuery = {
    getUser: {
        __typename: "User";
        id: string;
        username: string;
        email: string | null;
    } | null;
};

export type MeQuery = {
    me: {
        __typename: "User";
        id: string;
        username: string;
        email: string | null;
    } | null;
};

export type ListUsersQueryVariables = {
    filter?: TableUserFilterInput | null;
    limit?: number | null;
    nextToken?: string | null;
};

export type ListUsersQuery = {
    listUsers: {
        __typename: "UserConnection";
        items: Array<{
            __typename: "User";
            id: string;
            username: string;
            email: string | null;
        } | null> | null;
        nextToken: string | null;
    } | null;
};

export type OnCreateUserSubscriptionVariables = {
    id?: string | null;
    username?: string | null;
    email?: string | null;
};

export type OnCreateUserSubscription = {
    onCreateUser: {
        __typename: "User";
        id: string;
        username: string;
        email: string | null;
    } | null;
};

export type OnUpdateUserSubscriptionVariables = {
    id?: string | null;
    username?: string | null;
    email?: string | null;
};

export type OnUpdateUserSubscription = {
    onUpdateUser: {
        __typename: "User";
        id: string;
        username: string;
        email: string | null;
    } | null;
};

export type OnDeleteUserSubscriptionVariables = {
    id?: string | null;
    username?: string | null;
    email?: string | null;
};

export type OnDeleteUserSubscription = {
    onDeleteUser: {
        __typename: "User";
        id: string;
        username: string;
        email: string | null;
    } | null;
};
