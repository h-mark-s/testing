'use strict';

const server = require('./server/server');
const port = 4500;

server.listen(port, () => {
	console.log(`Server is running on port ${port}!`);
});
