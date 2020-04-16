import React, { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

import api from '../../services/api'

import './styles.css'

import loginImg from '../../assets/login-image.png'
import logo from '../../assets/logo.png'

export default function Login() {

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()
    
    try {
      const res = await api.post('login', { id, password })

      localStorage.setItem('market_id', id)
      localStorage.setItem('market_name', res.data.market_name)
      localStorage.setItem('id', res.data._id)

      history.push('/perfil')
    } catch(err) {
      alert('ID ou senha incorretos!')
    }
  }


  return(
    <Fragment>
      <div className="login-container">
        <section className="form">
          <img src= {logo} alt="Supermega"/>
          <form onSubmit={handleLogin}>

            <h1>Seja bem-vindo!</h1>

            <input type = "text"
              placeholder = "Informe o ID do mercado" 
              value = {id}
              onChange = {e => setId(e.target.value)}
            />              

            
            <input type="password"
              placeholder="Informe a senha do mercado" 
              value = {password}
              onChange = {e => setPassword(e.target.value)}
            />
            
            <button type="submit" className="button">Entrar</button>

            <Link className="back-link" to="/cadastro">
              <p>
                <FaArrowRight size={16} color="000"/>
                Não possui cadastro? Cadastre-se já!
              </p>  
            </Link>
          </form>
        </section>

        <img src={loginImg} alt="Supermega" className="login-image"/>
      </div>
    </Fragment>
  )
}