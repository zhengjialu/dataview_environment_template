import * as React from 'react'

import MyContext from './my-content'

class Box extends React.Component {
  render() {
    const { x, y, width, height, className } = this.props
    return (
      <MyContext.Consumer>
        {(context) => {
          const boxTop = (y - 1) * context.unitPX
          const boxLeft = (x - 1) * context.unitPX
          const boxWidth = width * context.unitPX
          const boxHeight = height * context.unitPX
          return (
            <div
              className={className}
              style={{
                width: `${context.auto ? boxWidth : context.scaler * boxWidth}px`,
                height: `${context.auto ? height : context.scaler * boxHeight}px`,
                left: `${context.auto ? boxLeft : context.scaler * boxLeft}px`,
                top: `${!context.auto ? context.scaler * boxTop : y}px`,
                position: 'absolute',
                zIndex: '2',
                backgroundColor: `${context.boxView ? 'rgba(255, 255, 255, 0.3)' : 'none'}`,
              }}
            >
              {this.props.children}
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default Box
