export default (
  url: string,
  method: string = 'GET',
  data?: any,
  headers?: any
) =>
  fetch(url, { body: JSON.stringify(data), headers, method }).then(res =>
    res.json()
  );
