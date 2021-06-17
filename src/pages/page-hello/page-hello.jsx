import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import Frame from '../../layout/frame'
import Store from './store'
import { Button } from 'antd'

import Artboard from '../../common/artboard'
import Box from '../../common/box'

const store = new Store()

@observer
class Hello extends Component {
  componentDidMount() {
    store.testIo()
  }

  @action onClick() {
    store.content = 'hello world !!!'
  }

  render() {
    return (
      <Artboard boxView grid width={12280} height={2280}>
        <Box className="fbv" width={60} height={10} x={10} y={5}>
          <div>111</div>
        </Box>
      </Artboard>
    )
  }
}

export default Hello
