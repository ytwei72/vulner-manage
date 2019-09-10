import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
  {
    title: '仪表盘',
    icon: 'dashboard',
    key: '/home'
  },
  {
    title: '漏洞库',
    icon: 'alert',
    key: '/home/repository'
  },
  // {
  //   title: '显示组件',
  //   icon: 'desktop',
  //   key: '/home/display',
  //   subs: [
  //     {key: '/home/display/table', title: '表格', icon: ''},
  //   ]
  // },
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
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

export default SiderNav