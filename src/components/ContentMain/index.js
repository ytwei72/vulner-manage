import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

const Home = LoadableComponent(() => import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分
const DashBoard = LoadableComponent(() => import('../../routes/DashBoard/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

//显示组件Demo
const TableDemo = LoadableComponent(() => import('../../routes/Display/TableDemo/index'))

//关于
const About = LoadableComponent(() => import('../../routes/About/index'))

@withRouter
class ContentMain extends React.Component {
  render() {
    return (
      <div style={{ padding: 16, position: 'relative' }}>
        <Switch>
          <PrivateRoute exact path='/home' component={DashBoard} />
          <PrivateRoute exact path='/home/repository' component={Home} />

          <PrivateRoute exact path='/home/display/table' component={TableDemo} />

          <PrivateRoute exact path='/home/about' component={About} />

          <Redirect exact from='/' to='/home' />
        </Switch>
      </div>
    )
  }
}

export default ContentMain