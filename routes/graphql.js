/**
 * 
 */
 const express = require("express")
 const router = express.Router()
 const Company = require("../models/company") //importing model for database documents
 const db = require("../database/db.js") //database variable
 const graphql = require('graphql')
 const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql
 const{graphqlHTTP} = require('express-graphql')
  
const CompanyType = new GraphQLObjectType({ //company object type
    name: "Company",
    fields: () => ({
        compId: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        owner: {type: GraphQLString},
        phoneNumber: {type: GraphQLString},
        location: {type: GraphQLString}
    })
})

 const RootQuery = new GraphQLObjectType ({
    name: "RootQueryType",
    fields: {
        getAllCompanies: {
            type: new GraphQLList(CompanyType),
            args: { id: {type: GraphQLString}}, //THERE COULD BE POTENTIAL ISSUES WITH THIS LINE OF CODE HEADS UP
            resolve(parent,args) {
                return Company.find() //await might cause some issues
            }
        }
        
    }
 })

 const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createCompany: {
            type: CompanyType,
            args: {
                compId: {type: GraphQLString},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                owner: {type: GraphQLString},
                phoneNumber: {type: GraphQLString},
                location: {type: GraphQLString}
            },
            resolve(parent,args) {
                const company = new Company({ //creating new company document
                    compId: args.compId,
                    name: args.name,
                    email: args.email,
                    owner: args.owner,
                    phoneNumber: args.phoneNumber,
                    location: args.location,
                })
                const newCompany =  company.save() //used to have await
                return args
            }
           
        }
    }
 })

 const schema = new graphql.GraphQLSchema({query: RootQuery, mutation: Mutation})

 router.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
 }))

 module.exports = {router,schema}
 