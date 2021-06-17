import requestIO from '../../common/request-io'

const mockJson = require('../../../mock/mock-hello.json')

/**
 * IO 请求地址 --- 家璐「2020/10/28-11:20:03」星期三
 * @description 请求的后端接口地址
 * @param {key: {mock, method, url, mockUrl}}
 * @returns {}
 */
const io = requestIO.createIo('hello', {
  testIo: {
    mock: false,
    method: 'POST',
    url: '/api/v1/xxxx/path/getTypeList',
    mockData: mockJson['testIo'],
  },
})

export default io
