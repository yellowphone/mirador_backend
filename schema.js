const { gql } = require('apollo-server');

const typeDefs = gql`
scalar DateTime

type Mutation {
    createUser(email: String!, username: String!, password: String!, firstname: String, lastname: String): User!
    followUser(user_following: Int!, user_followed: Int!): Follower!
    unfollowUser(pkfollower: Int!): Follower!
    deleteUser(pkuser: Int!): User!
    createAdventure(title: String, pkuser: Int!, lat: Float!, lng: Float!): Adventure!
    saveAdventure(saving_user: Int!, saving_adventure: Int!): Saved_Adventure!
    unsaveAdventure(pksaved_adventure: Int!): Saved_Adventure!
    visitAdventure(visiting_user: Int!, visiting_adventure: Int!): Visited_Adventure
    unvisitAdventure(pkvisited_adventure: Int!): Visited_Adventure
    deleteAdventure(pkadventure: Int!): Adventure!
    createBlog(title: String, pkuser: Int!): String!
    deleteBlog(pkblog: Int!): Blog!
    createItinerary(title: String): Itinerary!
    addUserToItinerary(adding_user: Int!, adding_itinerary: Int!): User_Itinerary!
    deleteUserFromItinerary(pkuser_itinerary: Int!): Itinerary
    deleteItinerary(pkitinerary: Int!): Itinerary!
}

type Query {
    findUser(pkuser: Int!): User!
    findManyUsers(firstName: String!): [User!]!
    findAdventureById(pkadventure: Int!): Adventure
    findBlogById(pkblog: Int!): Blog
    findItineraryById(pkitinerary: Int!): Itinerary
}

type User {
    pkuser: Int!
    username: String!
    email: String!
    password: String!
    firstname: String
    lastname : String
    bio: String
    created_on: DateTime
    adventures: [Adventure]
    blogs: [Blog]
    followers_followers_user_followedTousers: [Follower]
    followers_followers_user_followingTousers: [Follower]
    saved_adventures: [Saved_Adventure]
    visited_adventures: [Visited_Adventure]
    user_itineraries: [User_Itinerary]
}

type Follower {
    pkfollower: Int!
    user_following: Int!
    user_followed: Int!
    created_on: DateTime
    users_followers_user_followedTousers: User
    users_followers_user_followingTousers: User
}

type Adventure {
    pkadventure: Int!
    title: String!
    summary: String
    created_on: DateTime
    fk_user_adventure: Int!
    locations: Location
}

type Saved_Adventure {
    pksaved_adventure: Int!
    created_on: DateTime
    saving_user: Int!
    saving_adventure: Int!
    adventures: Adventure
    users: User
}

type Visited_Adventure {
    pkvisited_adventure: Int!
    created_on: DateTime
    visiting_user: Int!
    visiting_adventure: Int!
    adventures: Adventure
    users: User
}

type Blog {
    pkblog: Int!
    title: String!
    summary: String
    created_on: DateTime
    fk_user_blog: Int!
}

type Location {
    pklocation: Int!
    lat: Float
    lng: Float
    fk_adventure_location: Int!
}

type Itinerary {
    pkitinerary: Int!
    title: String!
    summary: String
    created_on: DateTime
    user_itineraries: [User_Itinerary]
}

type User_Itinerary {
    pkuser_itinerary: Int!
    created_on: DateTime
    adding_user: Int!
    adding_itinerary: Int!
    itineraries: Itinerary
    users: User
}
`;

module.exports = typeDefs;
