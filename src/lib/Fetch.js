const Qs = require('./querystring')
function buildOptions(url, params, options) {
  options = Object.assign({}, options)
  if (typeof options.body === 'object') {
    options.body = JSON.stringify(options.body)
  }
  if (params) {
    url += '?' + Qs(params)
  }
  return { url, options }
}

function Fetch(_url, params, _options) {
  let { url, options } = buildOptions(_url, params, _options)
  const _fetch = fetch
  return _fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else if (response.status === 0) {
        const err = new Error('网络无法访问，请检查网络设置')
        err.network = true
        return Promise.reject(err)
      } else {
        return response.text().then(text => {
          const err = new Error(text)
          err.msg = text
          err.status = response.status
          return Promise.reject(err)
        })
      }
    })
    .then(resp => {
      return resp
    })
    .catch(e => {
      if (e.message === 'Failed to fetch') {
        e.message = e.msg = '请检查网络'
      }
      return Promise.reject(e)
    })
}

Fetch.handleError = function() {}

function merge(a, b) {
  return b ? Object.assign(a, b) : a
}

Fetch.GET = function(url, params, options, timeout) {
  return timeout_fetch(Fetch(
    url,
    params,
    merge(
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      },
      options
    )
  ), timeout)
}
Fetch.POST = function(url, params, options, timeout) {
  return timeout_fetch(Fetch(
    url,
    params,
    merge(
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      },
      options
    )
  ),timeout)
}

/**
 * 请求超时
 * @param {*} fetch_promise 
 * @param {*} timeout 
 */
function timeout_fetch(fetch_promise, timeout = 10000) {
  let timeout_fn = null;
  let timeout_promise =  new Promise(function(resolve, reject) {
    timeout_fn = function() {
      reject('timeout request.')
    }
  })

  let abortable_promise = Promise.race([fetch_promise, timeout_promise])

  setTimeout(function() {
    timeout_fn()
  }, timeout)

  return abortable_promise
}

export default Fetch
