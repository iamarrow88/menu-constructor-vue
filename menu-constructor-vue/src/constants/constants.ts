const URL = 'http://localhost:5000';

const endpoints = {
  'receipts': `${URL}/receipts`,
  'tags': `${URL}/tags`,
}

const headers = {
  'ContentType': 'application/json;charset=utf-8'
}

const methods = {
  'POST': 'POST',
  'GET': 'GET',
  'PUT': 'PUT',
  'DELETE': 'DELETE',
}

export {endpoints, headers, methods};
