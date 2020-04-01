import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FaLock, FaUser, FaIdCard } from 'react-icons/fa'

import './styles.css'

import splashImg from '../../assets/supermarket.png'

export default function Login() {
  return(
    <Fragment>
      <div className="login-container">
        <section className="form">
          <form onSubmit={() => {}}>
            <h1>Faça seu Login</h1>

            <div className="input-text">
              <FaUser size={25} color="#E02041" id="login-icon" />
              <input type="text"
              placeholder="Informe o ID do mercado" />              
            </div>

            <div className="input-text">
              <FaLock size={25} color="#E02041" id="login-icon"/>
              <input type="password"
              placeholder="Informe a senha do mercado" />
            </div>
            

            <button type="submit" className="button">Entrar</button>

            <Link className="back-link" to="/cadastro">
              <FaIdCard size={16} color="#E02041" />
              Cadastre seu mercado agora mesmo!
            </Link>
          </form>
        </section>

        <img src= {splashImg} alt="Supermega"/>
      </div>
    </Fragment>
  )
}