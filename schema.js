import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import Db from './db.js';

const Person = new GraphQLObjectType({
    name : 'Person',
    description : 'This represts a person',
    fields : ()=> {
        return {
            id : {
                type : GraphQLInt,
                resolve(person) {
                    return person.id
                }
            },
            firstName : {
                type : GraphQLString,
                resolve(person) {
                    return person.firstName
                }
            },
            lastName : {
                type : GraphQLString,
                resolve(person) {
                    return person.lastName
                }
            },
            email : {
                type : GraphQLString,
                resolve(person) {
                    return person.email
                }
            },
            posts : {
                type : new GraphQLList(Post),
                resolve(person){
                    return person.getPosts();
                }
            }
        }
    }
})

const Post = new GraphQLObjectType({
    name : "Post",
    description : "Represtation of the Post",
    fields : () => ({
        id : {
            type : GraphQLInt,
            resolve(person) {
                return person.id
            }
        },
        title : {
            type : GraphQLString,
            resolve (post) {
                return post.title
            }
        },
        content : {
            type : GraphQLString,
            resolve (post) {
                return post.content
            }
        },
        person :{
            type : Person,
            resolve(post) {
                return post.getPerson();
            }
        }

    })
})

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    description : "Functions to create stuff",
    fields : () => {
        return {
            addPerson : {
                type : Person,
                args : {
                    firstName : {type : new GraphQLNonNull(GraphQLString) },
                    lastName : {type : new GraphQLNonNull(GraphQLString)},
                    email : {type : new GraphQLNonNull(GraphQLString)}
                },
                resolve(_, args) {
                    return Db.models.person.create({
                        firstName : args.firstName,
                        lastName : args.lastName,
                        email : args.email.toLowerCase()
                    });
                }
            },
            addPost : {
                type : Post,
                args : {
                    title : {type : new GraphQLNonNull(GraphQLString) },
                    content : {type : new GraphQLNonNull(GraphQLString) },
                },
                resolve(_, args) {
                    return Db.models.post.create({
                        title : args.title,
                        content : args.content
                    })
                }
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name : 'Query',
    description : 'This is the root query',
    fields : () => {
        return {
            people : {
                type : new GraphQLList(Person),
                args : {
                    id : { type : GraphQLInt},
                    email : {type : GraphQLString},
                },
                resolve(root, args){
                    return Db.models.person.findAll({
                        where : args
                    })
                }
            },
            posts : {
                type : new GraphQLList(Post),
                args : {
                    id : { type : GraphQLInt },
                    title : {type : GraphQLString},
                    content : {type : GraphQLString},
                },
                resolve(root, args) {
                    return Db.models.post.findAll({
                        where : args
                    })
                }

            }
        }
    }
})

const Schema = new GraphQLSchema ({
    query : Query,
    mutation : Mutation
})

export default Schema;
