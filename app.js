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
mongoose.connect('mongodb+srv://bstefansen:fartblossom1234@cluster0-mbz6o.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database 📙');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}

app.listen(process.env.PORT || 4000, () => {
  console.log('now listening for requests on port', process.env.PORT);
})