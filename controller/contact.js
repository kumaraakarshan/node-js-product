exports.getcontact = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'contact.html'));
  }

exports.postcontact =(req, res, next) => {

    res.redirect('/');
  }
