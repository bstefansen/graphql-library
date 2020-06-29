const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mongoDB database
// mongoDB won't connect
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database 📙');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(process.env.PORT || 4000, () => {
  console.log('now listening for requests on port', process.env.PORT);
})