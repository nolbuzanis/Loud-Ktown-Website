const keys = require('../apis/stripe');
const stripe = require('stripe')(keys.secret);

exports.handler = (event, context, callback) => {
  // Only allow POST events
  if (event.httpMethod !== 'POST') {
    return callback(null, { statusCode: 405, body: 'Method Not Allowed' });
  }

  const data = JSON.parse(event.body);

  if (!data.token || parseInt(data.amount) < 1) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Some required fields not supplied.'
      })
    });
  }

  stripe.charges
    .create({
      amount: parseInt(data.amount),
      currency: 'cad',
      description: 'Loud KTown Speaker Rentals',
      source: data.token
    })
    .then(({ status }) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ status })
      });
    })
    .catch(err => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: `Error: ${err.message}`
        })
      });
    });
};
