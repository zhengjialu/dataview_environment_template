import * as React from 'react'
import * as d3 from 'd3'

class Grid extends React.Component {
  componentDidMount() {
    const { width, height, art } = this.props
    const { xUnitsNum, yUnitsNum } = art

    const svg = d3
      .select('.container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'absolute')

    const xScale = d3.scaleLinear().domain([0, xUnitsNum]).range([0, width])
    const yScale = d3.scaleLinear().domain([yUnitsNum, 0]).range([height, 0])

    this.drawXLine(svg, yScale)
    this.drawYLine(svg, xScale)
  }

  drawXLine(svg, scale) {
    const { xUnits, xUnitsNum, yUnitsNum } = this.props.art

    const data = Array.from({ length: xUnitsNum }, (v, i) => i)
    const xGroup = svg.append('g')

    xGroup
      .selectAll('line.grid-x-line')
      .data(data)
      .enter()
      .append('line')
      .attr('class', (d) => `grid-x-line grid-x-line${d}`)
      .attr('x1', (d) => d * xUnits)
      .attr('y1', scale(yUnitsNum))
      .attr('x2', (d) => d * xUnits)
      .attr('y2', 0)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('opacity', 0.3)

    xGroup
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('fill', '#fff')
      .attr('font-size', 8)
      .attr('x', (d) => d * xUnits)
      .attr('y', 10)
      .text((d) => d)
  }

  drawYLine(svg, scale) {
    const { xUnitsNum, yUnitsNum, yUnits, auto } = this.props.art
    const data = Array.from({ length: yUnitsNum }, (v, i) => i)
    const yGroup = svg.append('g')

    yGroup
      .selectAll('line.grid-y-line')
      .data(data)
      .enter()
      .append('line')
      .attr('class', (d) => `grid-y-line grid-y-line${d}`)
      .attr('x1', scale(xUnitsNum))
      .attr('y1', (d) => d * yUnits)
      .attr('x2', 0)
      .attr('y2', (d) => d * yUnits)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('opacity', 0.3)

    if (!auto) {
      yGroup
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('fill', '#fff')
        .attr('font-size', 8)
        .attr('x', 0)
        .attr('y', (d) => d * yUnits)
        .text((d) => d)
    }
  }

  render() {
    return <div className="container h100"></div>
  }
}

export default Grid
