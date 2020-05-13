/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type PutPostMutationVariables = {
  id: string,
  title: string,
};

export type PutPostMutation = {
  // Put a single value of type 'Post'.
  // If an item exists it's updated. If it does not it's created.
  putPost:  {
    __typename: "Post",
    id: string,
    title: string,
  } | null,
};

export type SinglePostQueryVariables = {
  id: string,
};

export type SinglePostQuery = {
  // Get a single value of type 'Post' by primary key.
  singlePost:  {
    __typename: "Post",
    id: string,
    title: string,
  } | null,
};
