import rq from 'request-promise'
import querystring from 'querystring'
import cheerio from 'cheerio' // 解析Dom结构
import Iconv from 'iconv-lite' // 转码
import requestMerge from './requestMerge.js'

export function htmlStringGet(options, code = 'utf-8') {
  let _options = {
      encoding: null,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
      },
      transform: function(body) {
        body = Iconv.decode(body, code)
        return cheerio.load(body)
      }
  }
  requestMerge(_options, options)
  return rq(_options)
}

export function httpGet(options) {
	let _options = {
		method: 'GET',
		encoding: null,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
		}
	}
  requestMerge(_options, options)
  return rq(_options)
}

export function ajaxHttpGet(options) {
	let _options = {
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Connection: 'keep-alive',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
  }
  requestMerge(_options, options)
  return rq(_options)
}

export function httpPost(options) {
   let data = querystring.stringify(options.data)
   let _options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      'Content-Length': Buffer.byteLength(data) // 返回字符串实际占据的字节长度
    }
  }
 requestMerge(_options, options)
  return rq(options)
}

export function moblieHttpGet(options) {
	let _options = {
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
    }
  }
  requestMerge(_options, options)
  return rq(_options)
}
