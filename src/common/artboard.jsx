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
    const unitPX = 40
    this.width = auto ? art.width : davaWidth
    this.height = art.height
    this.background = bg || 'radial-gradient(#77787b, #130c0e)'

    art.xUnits = unitPX / 2
    art.yUnits = unitPX / 2
    art.xUnitsNum = this.width / art.xUnits + 1
    art.yUnitsNum = this.height / art.yUnits + 1

    art.boxView = boxView || false
    art.auto = auto
  }

  render() {
    const { grid } = this.props

    return (
      <React.Fragment>
        <div
          style={{
            width: `${this.width}px`,
            height: `${this.height}px`,
            position: 'relative',
            backgroundImage: `${this.background}`,
            backgroundColor: `${this.background}`,
            margin: '0 auto',
          }}
        >
          <MyContext.Provider value={art}>{this.props.children}</MyContext.Provider>
          {grid ? <Grid width={this.width} height={this.height} art={art} /> : null}
        </div>
      </React.Fragment>
    )
  }
}

export default Artboard
