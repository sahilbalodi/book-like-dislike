const https = require('https');
const BufferList = require('bl');

function getRating(book) {
  const url = `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${book.id}`;
  const promise2 = new Promise((fulfill) => {
    https.get(url, (response) => {
      response.pipe(BufferList((error, data) => {
        if (error) { console.log(error); } else {
          book.rating = (JSON.parse(data.toString()).rating);
          fulfill(book);
        }
      }));
    });
  });
  return promise2;
}
module.exports = getRating;
