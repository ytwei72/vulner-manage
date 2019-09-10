import React, { Component } from 'react';
import PrivateRoute from './components/PrivateRoute'
import { Route, Switch } from 'react-router-dom'
import Login from './routes/Login/index'
// import Login from './routes/Login2/index'
import Index from './routes/Index/index'
import './App.css'
import './assets/font/iconfont.css'
// import './my-theme.less'
// import { Button } from 'antd'

// import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
// import Checkbox from '@material-ui/core/Checkbox';
// import Buttons from '@material-ui/core/Button';
// import { green, orange, red, purple } from '@material-ui/core/colors';
// const outerTheme = createMuiTheme({
//   palette: {
//     primary: {
//       main: red[500],
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//       border: 0,
//       borderRadius: 3,
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//       height: 48,
//       padding: '0 30px',
//     },
//     secondary: {
//       main: red[500],
//       color: red[1000],
//     },
//   },
// });

// const innerTheme = createMuiTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//       color: red[1000],
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//       border: 0,
//       borderRadius: 3,
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//       height: 48,
//       padding: '0 30px',
//     },
//     secondary: {
//       main: green[500],
//     },
//   },
// });
class App extends Component {
  render() {
    return (
      // <ThemeProvider theme={outerTheme}>
      //   <Checkbox defaultChecked title="defaultChecked" />
      //   <Button>Button</Button>
      //   <Buttons color="primary" >Buttons</Buttons>
      //   <ThemeProvider theme={innerTheme}>
      //     <Checkbox defaultChecked />
      //     <Buttons color="primary" >Buttons</Buttons>
      //   </ThemeProvider>
      // </ThemeProvider>
      <Switch>
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/' component={Index}/>
      </Switch>
    )
  }
}

export default App;
