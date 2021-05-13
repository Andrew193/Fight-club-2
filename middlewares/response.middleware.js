const responseMiddleware = (err, req, res, next) => {
   // TODO: Implement middleware that returns result of the query
   if (err && err.message && err.message !== "") {
      res.error=true;
      res.status(400);
      res.json(err);
   } else if (res.data) {
      if (res.data.length > 0) {
         res.status(200);
         res.json(res.data);
      } else {
         res.status(404);
         res.json(res.data);
      }
   }
   res.status(res.statusCode);
   next();
}

exports.responseMiddleware = responseMiddleware;