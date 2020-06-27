const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mongoDB database
// mongoDB won't connect
mongoose.connect('mongodb+srv://bstefansen:testing1234@cluster0-mbz6o.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
})