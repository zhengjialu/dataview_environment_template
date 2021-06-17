import axios from 'axios'

// <---------------------jia--------------------->
// 发起异步请求 --- 「2020/10/28-10:46:36」星期三
// <---------------------lux--------------------->

class requestIO {
  /**
   * 处理配置项 --- 家璐「2020/10/28-10:43:32」星期三
   * @description 提交配置项到 Ajax，返回请求结果
   * @param {key: object{}}
   * @returns {options{}}
   */
  createIo(name, ioContent) {
    // 追加自定义请求项
    const request = this.request({
      headers: {}, // 自定义请求头信息
    })
    // 请求集合
    const content = {}
    Object.keys(ioContent).forEach((key) => {
      // 请求配置项
      content[key] = (options = {}) => {
        options = {
          data: options,
        }
        const option = { ...ioContent[key], ...options }
        return request(option)
      }
    })
    return content
  }

  /**
   * 发起 Ajax 请求 --- 家璐「2020/10/28-10:54:54」星期三
   * @description 接收处理好的配置项进行 Ajax 请求
   * @param {options{}}
   * @returns {message, content, code, success: boolean}
   */
  request(option) {
    return async (defineOptions) => {
      const options = {
        url: '',
        method: 'GET',
        timeout: option.timeout || 60 * 1000,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...option.headers,
        },
        ...defineOptions,
      }

      // 常规请求处理
      if (options.data) {
        // :id 参数处理
        Object.keys(options.data).forEach((key) => {
          if (key[0] === ':' && options.data) {
            options.url = options.url.replace(key, encodeURIComponent(options.data[key]))
            delete options.data[key]
          }
        })

        if ((options.method || '').toLowerCase() === 'get') {
          options.query = Object.assign(options.data, options.query)
        } else {
          options.body = Object.assign(options.data, options.body)
        }
      }

      // :id 参数处理
      if (typeof options.params === 'object') {
        Object.keys(options.params).forEach((key) => {
          if (key[0] === ':' && options.params) {
            options.url = options.url.replace(key, encodeURIComponent(options.params[key]))
          }
        })
      }
      // query 参数处理
      if (options.query) {
        const paramsArray = []
        Object.keys(options.query).forEach((key) => {
          if (options.query[key] !== undefined) {
            paramsArray.push(`${key}=${encodeURIComponent(options.query[key])}`)
          }
        })
        if (options.url.search(/\?/) === -1) {
          options.url += `?${paramsArray.join('&')}`
        } else {
          options.url += `&${paramsArray.join('&')}`
        }
      }

      if (
        options.headers['Content-Type'] === 'application/json' &&
        options.body &&
        typeof options.body !== 'string'
      ) {
        options.body = JSON.stringify(options.body)
      }

      // 处理 mock 数据
      let retData = {}
      if (options.mock) {
        retData = await new Promise((resolve) => resolve(options.mockData))
      } else {
        try {
          const opts = {
            url: options.url,
            baseURL: options.baseURL,
            params: options.params,
            method: options.method,
            headers: options.headers,
            data: options.body,
            timeout: options.timeout,
          }
          const { data } = await axios(opts)
          retData = data
        } catch (err) {
          retData.success = false
          retData.message = err.message
          if (err.response) {
            retData.status = err.response.status
            retData.content = err.response.data
            retData.message = `浏览器请求非正常返回: 状态码 ${retData.status}`
          }
        }
      }

      return retData
    }
  }
}

// <--------------------------------------------->
// ﹡﹡﹡﹡﹡﹡﹡﹡﹡﹡﹡﹡End﹡﹡﹡﹡﹡﹡﹡﹡﹡﹡﹡﹡
// <--------------------------------------------->

export default new requestIO()
