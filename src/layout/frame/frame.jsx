import React, { Component } from 'react'
import { Layout } from 'antd'
import NavMenu from './nav'

const { Header, Footer, Content } = Layout

class Frame extends Component {
  render() {
    return (
      <div className="frame">
        <Layout>
          <Header>
            <NavMenu />
          </Header>
          <Content>{this.props.children}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    )
  }
}

export default Frame
