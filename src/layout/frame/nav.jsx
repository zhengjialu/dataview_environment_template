import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import routeUrl from '../../router'

const { SubMenu } = Menu

class Nav extends Component {
  menuMap = (routes) => {
    return routes.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.menuMap(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            <a href={item.url}>{item.title}</a>
          </Menu.Item>
        )
      }
    })
  }

  render() {
    return <Menu mode="horizontal">{this.menuMap(routeUrl)}</Menu>
  }
}

export default Nav
