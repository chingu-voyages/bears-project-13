const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv').config();
const app = express();

app.use(cors());

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds127944.mlab.com:27944/bears-13`, {
	useNewUrlParser: true
});
mongoose.connection.once('open', () => {
	console.log('connected to db');
});

const schema = require('./schema/schema');

const PORT = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../build/', 'index.html'));
});

app.listen(PORT, function() {
	console.error(`Listening on port: ${PORT}`);
});
