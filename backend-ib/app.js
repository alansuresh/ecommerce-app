const express =require ('express');
const cors = require('cors')
const rateLimit = require('express-rate-limit');

const app =express();
app.use(cors());


app.use(express.json());
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window`
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use('/api/auth/',require('./routes/auth.routes'));
app.use('/api/users/',require('./routes/user.routes'));
// app.use('/api/products/',require('./routes/products.routes'));
// app.use('/api/orders/',require('./routes/orders.routes'));

module.exports = app;