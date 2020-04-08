import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AddProduct from './pages/AddProduct'

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastro" component={Register} />
        <Route path="/perfil" component={Profile} />
        <Route path="/produtos/novo" component={AddProduct} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

