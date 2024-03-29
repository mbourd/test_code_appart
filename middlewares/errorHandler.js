export function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.send({ titleExc: err.title, message: err.message, extra: err.extraData });
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
}

export function handleErrorRoute(func) {
  return async (req, res, next) => {
    try { await func(req, res, next); }
    catch (error) { next(error); }
  };
  // return (req, res, next) => {
  //   func(req, res, next).catch((error) => next(error));
  // }
}
