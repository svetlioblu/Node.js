module.exports = function (url) {
  let contentType = 'text/plane'
  if (url.endsWith('/')) {
    contentType = 'text/html'
  } else if (url.endsWith('.ico')) {
    contentType = 'image/x-icon'
  } else if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (url.endsWith('.jpg')) {
    contentType = 'image/jpg'
  }
  return contentType
}
