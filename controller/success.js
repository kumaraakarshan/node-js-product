exports.success=(req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'success.html'));
  }