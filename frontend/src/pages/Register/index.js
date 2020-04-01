import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

import api from '../../services/api'

import './styles.css'

import cep from 'cep-promise'



export default class Register extends Component {
  constructor() {
    super()
    this.state = {
      inputCep: '',
      city: '',
      neighborhood: '',
      street: '',
      uf: ''
    }

    this.returnAddress = this.returnAddress.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  //Função responsável por "escutar" o Input do CEP, atualizando seu state para cada letra digitada
  handleChange({target}) {
    this.setState({
      [target.name]: target.value
    })
  }

  //Função que recebe o CEP e armazena o endereço nos states correspondentes.
  returnAddress(e) {
    e.preventDefault()
    cep(this.state.inputCep).then(response => {
      this.setState({
        city: response.city,
        neighborhood: response.neighborhood,
        street: response.street,
        uf: response.state
      })
    })
  }
  
  render(){
    cep('18202330').then(console.log)
    return(
      <Fragment>  
        <div className="register-container">
          <div className="content">
            <section>
              <h1>Cadastro</h1>
              <p>Faça seu cadastro e compartilhe os preços do seu mercado para toda a população.</p>
              <Link className="back-link" to="/">
                <FaArrowAltCircleLeft size={15} color="#E02041" />
              </Link>
            </section>

            <form onSubmit={() => {}}>
              <input type="text" placeholder="Nome do Mercado"/>
              <input type="text" placeholder="Email"/>
              <input type="password" placeholder="Senha"/>
              <div className="address-content">
                <input name="inputCep" type="text" placeholder="CEP"
                value={this.state.inputCep}
                onChange={this.handleChange}/>
                <button type="submit" className="button" onClick={this.returnAddress}>Verificar CEP</button>
              </div>


              <div className="address-content">
                <input type="text" placeholder="Rua" value={this.state.street} disabled/>
                <input type="text" placeholder="Nº" className="input-address"/>
              </div>
              <input type="text" placeholder="Bairro" value={this.state.neighborhood} disabled/>

              <div className="address-content">
                <input type="text" placeholder="Cidade" value={this.state.city} disabled/>
                <input type="text" placeholder="Estado" className="input-address"
                value={this.state.uf} disabled/>
              </div>
              <button type="submit" className="button">Cadastrar</button>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}