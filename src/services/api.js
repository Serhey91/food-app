const BASE_URL = process.env.REACT_APP_BASE_URL;
const REST_SOURCES = Object.freeze({
  orders: 'orders',
  meals: 'meals',
});

const defaultHeaders = (overrides = {}) => ({
  headers: {
    'Content-Type': 'application/json',
    ...overrides,
  },
});
const api = async (source, method = 'GET', body = {}, headers = {}) => {
  const url = [[BASE_URL, source].join('/'), 'json'].join('.');
  const response = await fetch(url, {
    method,
    ...body,
    ...headers,
  });
  return response.json();
}

const fetchOrders = async () => {
  const response = await api(REST_SOURCES.orders) || {};
  return Object.entries(response).map(([id, {title, releaseDate, openingText}]) => ({
    id,
  }));
}

const fetchMeals = async () => {
  const response = await api(REST_SOURCES.meals) || {};
  return Object.entries(response).map(([id, {description, name, price}]) => ({
    id,
    name,
    price,
    description,
  }));
}
const addOrder = async (order) => {
  const {name} = await api(
    REST_SOURCES.orders,
    'POST',
    {body: JSON.stringify(order)},
    defaultHeaders(),
  );

  return {
    ...order,
    id: name,
  };
}

export {
  BASE_URL,
  REST_SOURCES,
  fetchOrders,
  addOrder,
  fetchMeals,
}
