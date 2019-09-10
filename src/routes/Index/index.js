import React from 'react'
import { Layout } from 'antd'
import SiderNav from '../../components/SiderNav'
import ContentMain from '../../components/ContentMain'
import HeaderBar from '../../components/HeaderBar'
import SystemImage from '../../resources/image/bug3_sys_icon.png'

const { Sider, Header, Content, Footer } = Layout

const systemTitle = 'CNVD漏洞库';

class Index extends React.Component {
  state = {
    collapsed: false,
    siderTitle: systemTitle
  }

  toggle = () => {
    const { collapsed } = this.state;
    let siderTitle = (!collapsed) ? '' : systemTitle;
    // console.log(this)  状态提升后，到底是谁调用的它
    this.setState({
      collapsed: !collapsed,
      siderTitle
    })
  }

  render() {
    const { siderTitle } = this.state;

    // 设置Sider的minHeight可以使左右自适应对齐
    return (
      <div id='page'>
        <Layout>
          <Sider collapsible
            trigger={null}
            collapsed={this.state.collapsed}
          >
            <div style={styles.logo}>
              <img alt="systemicon" style={{ width: '32px', height: '32px', marginLeft: 8, marginBottom: 4, marginRight: 16, }} src={SystemImage} />
              {siderTitle}
            </div>
            <SiderNav />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
              <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle} />
            </Header>
            <Content>
              <ContentMain />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}


const styles = {
  logo: {
    height: '36px',
    lineHeight: '36px', // 内容垂直居中
    background: 'rgba(255, 255, 255, .3)',
    color: 'rgba(255, 255, 255, 1)',
    margin: '16px',
    // textAlign: 'center',
    fontSize: 16,
    // marginTop: '16px',
  }
}

export default Index