import { action, observable, runInAction } from 'mobx'
import { message } from 'antd'
import io from './io'

class Store {
  @observable content = ''

  @action testIo = async () => {
    try {
      const { content } = await io.testIo({
        ':id': 11,
      })
      runInAction(() => {
        this.content = content.name
      })
    } catch (e) {
      message.error(e.message)
    }
  }
}

export default Store
