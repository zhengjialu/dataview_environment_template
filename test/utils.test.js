const assert = require('assert')

import { add } from '../src/common/utils'

describe('utils 测试', function () {
  it('add 函数 1 + 2 是否等于 3', function () {
    assert.equal(add(1, 2), 3)
  })
})
