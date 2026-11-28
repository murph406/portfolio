'use strict'

exports.handler = async (event) => {
  const request = event.Records[0].cf.request

  if (request.uri.indexOf('.') === -1) request.uri = '/index.html'
  return request
}