import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import cepMask from './Masks/cepMask'
import cnpjMask from './Masks/cnpjMask'

import api from '../../services/api'

import registerImg from '../../assets/register-image.jpg'

import './styles.css'

import cepPromise from 'cep-promise'
import Axios from 'axios'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      //Estados relacionados ao cepPromise
      ativo: 'inativo',
      cep: '',

      //Estados relacionados ao BD
      marca: '',
      email: '',
      senha: '',
      cnpj: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)

  }

  async handleRegister(e) {

    const { history } = this.props
    e.preventDefault()

    const data = {
      market_name: this.state.marca,
      market_mail: this.state.email,
      market_password: this.state.senha,
      market_cnpj: this.state.cnpj,
      market_street: this.state.rua,
      market_number: this.state.numero,
      market_neighborhood: this.state.bairro,
      market_city: this.state.cidade,
      market_uf: this.state.estado
    }

      try {
        const response = await api.post('cadastro', data)
  
        alert('Cadastro realizado com sucesso\nSeu ID de acesso: ' + response.data.market_id)

        history.push('/')        
      } catch(err) {
        console.log(data)
        alert(err)
      }
  }

  //Função responsável por "escutar" o Input do CEP, atualizando seu state para cada letra digitada
  handleChange({target}) {
    this.setState({
      [target.name]: target.value
    })
  }

  //Função que recebe o CEP e armazena o endereço nos states correspondentes.
  handleKeyUp(value) {
    console.log(value)
    value.length === 9 && cepPromise(this.state.cep).then(response => {
      this.setState({
        cidade: response.city,
        bairro: response.neighborhood,
        rua: response.street,
        estado: response.state
      })
    })
  }
  
  render(){
    return(
      <Fragment>  
        <div className="register-container">
          <div className="content">
            <section>
              <h1>Cadastre-se!</h1>
              <p>Faça seu cadastro e compartilhe os preços <br/>do seu mercado para toda a população.</p>
              <Link className="back-link" to="/">
                <FaArrowLeft size={15} color="#000" />
                Retornar para a home
              </Link>
              <img src={registerImg} alt=""/>
            </section>

            <form onSubmit={this.handleRegister}>
            <div>
              <input type="text" placeholder="Nome do Mercado" name="marca"
              value={this.state.marca}
              onChange={this.handleChange}/>

              <input type="email" placeholder="E-mail" name="email"
              value={this.state.email}
              onChange={this.handleChange}/>

              <input type="password" placeholder="Senha" name="senha"
              value={this.state.senha}
              onChange={this.handleChange}/>

              <input type="text" placeholder="CNPJ" name="cnpj"
              value={this.state.cnpj}
              onChange={ e => this.setState({ cnpj: cnpjMask(e.target.value) })}/>
              
              <div className="address-content">
                <input type="text" placeholder="CEP" name="cep"
                value={this.state.cep}
                onChange={ e => this.setState({ cep: cepMask(e.target.value) })}
                onKeyUp={e => this.handleKeyUp(e.target.value)}
                />
              </div>
              </div>
              <div>
              <div>
                <div className="address-content">
                  <input type="text" placeholder="Rua" name="rua"
                  value={this.state.rua}
                  onChange={this.handleChange} disabled/>

                  <input type="text" placeholder="Nº" className="input-address" name="numero"
                  value={this.state.numero}
                  onChange={this.handleChange} />
                </div>
                <input type="text" placeholder="Bairro" name="bairro"
                value={this.state.bairro}
                onChange={this.handleChange} disabled/>

                <div className="address-content">
                  <input type="text" placeholder="Cidade" name="cidade"
                  value={this.state.cidade}
                  onChange={this.handleChange} disabled/>

                  <input type="text" placeholder="UF" className="input-address" name="estado"
                  value={this.state.estado}
                  onChange={this.handleChange} disabled/>
                </div>
              </div>
              <button type="submit" className="button">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Register)