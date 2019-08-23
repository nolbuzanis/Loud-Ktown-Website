const { secretKey } = require('../apis/stripe');
const stripe = require('stripe')(secretKey);

export function handler(event, context, callback) {
  // Only allow POST req
  if (event.httpMethod !== 'POST') {
    return callback(null, { statusCode: 405, body: 'Method not allowed' });
  }

  const data = JSON.parse(event.body);

  if (!data.token || parseInt(data.amount) < 1) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Some required fields were not supported.'
      })
    });
  }

  stripe.charges
    .create({
      amount: parseInt(data.amount),
      currency: 'CAD',
      description: 'LOUD Speaker Rentals',
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
}
