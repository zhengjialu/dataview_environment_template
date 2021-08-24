import * as React from 'react'

import MyContext from './my-content'
import Grid from './grid'

import './flexbox.styl'

const art = {
  width: window.innerWidth,
  height: window.innerHeight,
}
class Artboard extends React.Component {
  constructor(props) {
    super(props)
    const { width, height, bg, boxView, auto } = props
    const ratio = width / height
    const davaWidth = art.height * ratio
    const scaler = art.height / height
    const unitPX = auto ? art.width / 100 : 40

    this.artboard = React.createRef()
    this.container = React.createRef()

    this.width = auto ? art.width : davaWidth
    this.height = art.height
    this.background = bg || 'radial-gradient(#77787b, #130c0e)'

    art.unitPX = unitPX
    art.scaler = scaler
    art.boxView = boxView || false
    art.auto = auto

    // 遗留功能：窗口动态更新
    // window.addEventListener(
    //   'resize',
    //   () => {
    //     a()
    //   },
    //   false
    // )
  }

  render() {
    const { grid, width, height, auto } = this.props

    return (
      <React.Fragment>
        <div
          ref={this.artboard}
          style={{
            width: `${this.width}px`,
            height: `${this.height}px`,
            position: 'relative',
            backgroundImage: `${this.background}`,
            backgroundColor: `${this.background}`,
            margin: '0 auto',
            padding: 0,
          }}
        >
          <MyContext.Provider value={art}>{this.props.children}</MyContext.Provider>
          {grid ? (
            <Grid
              boxWidth={auto ? art.width : width}
              boxHeight={auto ? art.height : height}
              width={this.width}
              height={this.height}
              art={art}
            />
          ) : null}
        </div>
      </React.Fragment>
    )
  }
}

export default Artboard
