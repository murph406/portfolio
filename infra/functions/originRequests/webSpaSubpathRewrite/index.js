// Why: lets SiteDistribution showcase other SPAs (from this repo or not) under one-level subroutes.
// Intended use, not wired up yet:
// - SPA apps only, at /<prefix>, never nested prefixes
// - Each app has its own S3 origin, with its files at the bucket root
// - Each app sets its router basename and build base to /<prefix>
// - Attach only to that prefix's cache behaviors, never the default: the first path segment is always stripped
exports.handler = async (event) => {
  const request = event.Records[0].cf.request
  let uri = request.uri.replace(/^\/[^/]+/, '') || '/' // "/<prefix>/a/b.js" -> "/a/b.js"

  if (!uri.split('/').pop().includes('.')) uri = '/index.html'
  request.uri = uri
  
  return request
}