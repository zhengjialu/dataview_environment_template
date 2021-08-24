import * as React from 'react'
import * as d3 from 'd3'

class Grid extends React.Component {
  componentDidMount() {
    const { boxWidth, boxHeight, art } = this.props
    const { auto, unitPX } = art
    const svg = d3.select('.container').append('svg')
    svg.attr('viewBox', `0,0,${boxWidth}, ${boxHeight}`)

    this.auto = auto

    const xUnits = auto ? 100 : boxWidth / unitPX
    const yUnits = boxHeight / unitPX
    const isDoubleXUnit = xUnits % 2 === 0
    const isDoubleYUnit = yUnits % 2 === 0
    let xTranslate = 0
    let xRangeStart = 0
    let xRangeEnd = 0
    let yRangeStart = 0
    let yRangeEnd = 0
    let yTranslate = 0

    if (isDoubleXUnit) {
      xRangeStart = (-1 * xUnits) / 2
      xRangeEnd = 1 + xUnits / 2
      xTranslate = boxWidth / 2
    } else {
      xRangeStart = -1 * Math.ceil(xUnits / 2) - 1
      xRangeEnd = 1 + Math.ceil(xUnits / 2)
      xTranslate = boxWidth / 2 + unitPX / 2
    }

    if (isDoubleYUnit) {
      yRangeStart = (-1 * yUnits) / 2
      yRangeEnd = 1 + yUnits / 2
      yTranslate = boxHeight / 2
    } else {
      yRangeStart = -1 * Math.ceil(yUnits / 2) - 1
      yRangeEnd = 1 + Math.ceil(yUnits / 2)
      yTranslate = boxHeight / 2 + unitPX / 2
    }

    // 刻度线
    const lineG = svg
      .append('g')
      .attr('transform', `translate(${xTranslate}, ${yTranslate})`)
      .classed('wave-wave-grid-lines', true)
    // 刻度尺
    const marksG = svg.append('g').classed('wave-wave-grid-marks', true)

    // 横向刻度线
    this.drawXLine(lineG, boxHeight, xRangeStart, xRangeEnd, unitPX, isDoubleXUnit)
    // X轴刻度尺
    this.drawXText(marksG, xUnits, unitPX)
    // 纵向刻度线
    this.drawYLine(lineG, boxWidth, yRangeStart, yRangeEnd, unitPX, isDoubleYUnit)
    // Y轴刻度尺
    if (!this.auto) {
      this.drawYText(marksG, yUnits, unitPX)
    }
  }

  drawXLine(lineG, boxHeight, xRangeStart, xRangeEnd, unitPX, isDoubleXUnit) {
    const xGroup = lineG.append('g')

    const hLine = xGroup
      .selectAll('line.wave-wave-grid-h-line')
      .data(d3.range(xRangeStart, xRangeEnd)) // [0, n-1] 横向格子数量
      .enter()
      .append('line')
      .attr('class', (d) => `wave-grid-h-line wave-grid-h-line${d}`)
      .attr('x1', (d) => d * unitPX)
      .attr('y1', (-1 * boxHeight) / 2 - (isDoubleXUnit ? 0 : unitPX / 2))
      .attr('x2', (d) => d * unitPX)
      .attr('y2', boxHeight)
      .attr('opacity', (d) => {
        if (isDoubleXUnit || d >= 0) {
          return d % 5 === 0 ? 0.4 : 0.2
        }
        return (d + 1) % 5 === 0 ? 0.4 : 0.2
      })

    this.commonLineStyle(hLine)
  }

  drawXText(marksG, xUnits, unitPX) {
    const { art } = this.props
    const xGroup = marksG.append('g')
    const hText = xGroup
      .selectAll('text')
      .data(d3.range(1, xUnits + 1))
      .enter()
      .append('text')
      .attr('fill', '#fff')
      .attr('font-size', 8)
      .attr('x', (d) => (d - 1) * unitPX)
      .attr('y', this.auto ? 0 : 10)
      .text((d) => d)

    this.commonTextStyle(hText)
  }

  drawYLine(lineG, boxWidth, yRangeStart, yRangeEnd, unitPX, isDoubleYUnit) {
    const yGroup = lineG.append('g')

    const vLine = yGroup
      .selectAll('line.wave-wave-grid-v-line')
      .data(d3.range(yRangeStart, yRangeEnd)) // [0, n-1] 纵向28个格子需要29根线
      .enter()
      .append('line')
      .attr('class', (d) => `wave-grid-v-line wave-grid-v-line${d}`)
      .attr('x1', (-1 * boxWidth) / 2 - (isDoubleYUnit ? 0 : unitPX / 2))
      .attr('y1', (d) => d * unitPX)
      .attr('x2', boxWidth / 2)
      .attr('y2', (d) => d * unitPX)
      .attr('opacity', (d) => {
        if (isDoubleYUnit || d >= 0) {
          return d % 5 === 0 ? 0.4 : 0.2
        }
        return (d + 1) % 5 === 0 ? 0.4 : 0.2
      })

    this.commonLineStyle(vLine)
  }

  drawYText(marksG, yUnits, unitPX) {
    const yGroup = marksG.append('g')
    const vText = yGroup
      .selectAll('text')
      .data(d3.range(2, yUnits + 1))
      .enter()
      .append('text')
      .attr('fill', '#fff')
      .attr('font-size', 8)
      .attr('x', 0)
      .attr('y', (d) => (d - 1) * unitPX)
      .text((d) => d)

    this.commonTextStyle(vText)
  }

  // 刻度线通用样式
  commonLineStyle = (line) => {
    line.attr('stroke', '#fff').attr('stroke-width', 0.5).attr('stroke-dasharray', '2 3')
  }

  // 通用样式
  commonTextStyle = (text) => {
    const { art } = this.props
    text
      .attr('fill', '#fff')
      .attr('font-size', this.auto ? 8 : 20)
      .attr('font-family', 'Helvetica Neue') // 更精致的数字字体
      .attr('alignment-baseline', 'before-edge')
      .attr('text-anchor', 'start')
      .attr('opacity', 0.3)
      .text((d) => (d < 10 ? `0${d}` : d))
  }

  render() {
    const { width, height } = this.props
    return <div className="container" style={{ width: `${width}px`, height: `${height}px` }}></div>
  }
}

export default Grid
