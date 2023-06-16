exports.errorHandler = (err, req, res) => {
res.render('/404',{error:err.message})
}