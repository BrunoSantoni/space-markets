import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import cepMask from './Masks/cepMask'
import cnpjMask from './Masks/cnpjMask'

import api from '../../services/api'

import './styles.css'

import cepPromise from 'cep-promise'

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

    this.returnAddress = this.returnAddress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)

  }

  async handleRegister(e) {

    const { history } = this.props
    e.preventDefault()

    const data = {
      marca: this.state.marca,
      email: this.state.email,
      senha: this.state.senha,
      cnpj: this.state.cnpj,
      rua: this.state.rua,
      numero: this.state.numero,
      bairro: this.state.bairro,
      cidade: this.state.cidade,
      estado: this.state.estado
    }

      try {
        const response = await api.post('cadastro', data)


  
        alert('Cadastro realizado com sucesso\nSeu ID de acesso: ' + response.data.id)

        history.push('/')        
      } catch(err) {
        alert('Erro ao cadastrar')
      }
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
    cepPromise(this.state.cep).then(response => {
      this.setState({
        ativo: 'ativo',
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
              <h1>Cadastro</h1>
              <p>Faça seu cadastro e compartilhe os preços do seu mercado para toda a população.</p>
              <Link className="back-link" to="/">
                <FaArrowAltCircleLeft size={15} color="#6CB85D" />
                Retornar para a Home
              </Link>
            </section>

            <form onSubmit={this.handleRegister}>
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
                onChange={ e => this.setState({ cep: cepMask(e.target.value) })}/>
                <button type="submit" className="button" id="btnCep" onClick={this.returnAddress}>Verificar CEP</button>
              </div>

              <div className={this.state.ativo}>
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

                  <input type="text" placeholder="Estado" className="input-address" name="estado"
                  value={this.state.estado}
                  onChange={this.handleChange} disabled/>
                </div>
              </div>
              <button type="submit" className="button">Cadastrar</button>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Register)