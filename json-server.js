const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./public/trademark-portfolio.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/api/trademarks', (req, res) => {
  res.jsonp(router.db.getState());
});

// Add CORS headers
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Use default router
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Access trademarks at http://localhost:${PORT}/api/trademarks`);
});
