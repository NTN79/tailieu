const formidable = require("formidable");

exports.setProduct = async (req,res,next)=>{
    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      req.body = fields;
      req.files = files;
      next();
    });
};