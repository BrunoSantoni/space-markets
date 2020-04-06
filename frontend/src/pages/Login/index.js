import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

import './styles.css'

import loginImg from '../../assets/login-image.jpg'
import logo from '../../assets/logo.png'

export default function Login() {
  return(
    <Fragment>
      <div className="login-container">
        <section className="form">
          <img src= {logo} alt="Supermega"/>
          <form onSubmit={() => {}}>

            <h1>Faça seu Login</h1>

            <input type="text"
              placeholder="Informe o ID do mercado" 
            />              

            
            <input type="password"
              placeholder="Informe a senha do mercado" 
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

        <img src= {loginImg} alt="Supermega"/>
      </div>
    </Fragment>
  )
}