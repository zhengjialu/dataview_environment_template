import * as React from 'react'

import MyContext from './my-content'

class Box extends React.Component {
  render() {
    const { x, y, width, height, className } = this.props

    return (
      <MyContext.Consumer>
        {(context) => {
          return (
            <div
              className={className}
              style={{
                width: `${width * context.xUnits}px`,
                height: `${context.auto ? height : height * context.xUnits}px`,
                left: `${x * context.xUnits}px`,
                top: `${!context.auto ? y * context.xUnits : null}px`,
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
