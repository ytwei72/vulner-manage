import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
  {
    title: '仪表盘',
    icon: 'bulb',
    key: '/home'
  },
  {
    title: '漏洞库',
    icon: 'bulb',
    key: '/home/repository'
  },
  {
    title: '显示组件',
    icon: 'desktop',
    key: '/home/display',
    subs: [
      {key: '/home/display/table', title: '表格', icon: ''},
    ]
  },
  {
    title: '关于',
    icon: 'info-circle-o',
    key: '/home/about'
  }
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        <div style={styles.logo}></div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

export default SiderNav