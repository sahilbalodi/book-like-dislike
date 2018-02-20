const https = require('https');
const BufferList = require('bl');

function getData() {
  let dataAboutBooks = '';
  const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
  const promise1 = new Promise((fulfill) => {
    https.get(url, (response) => {
      response.pipe(BufferList((error, data) => {
        if (error) { console.log(error); } else {
          dataAboutBooks = (data.toString());
          fulfill(dataAboutBooks);
        }
      }));
    });
  });
  return promise1;
}
module.exports = getData;
