import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom' //Lib que redireciona e adiciona links
import { FaArrowLeft } from 'react-icons/fa' //Lib dos ícones
import { BingProvider } from 'leaflet-geosearch' //Lib que pega latitude e longitude do Bing.
import { TextField } from '@material-ui/core'
import NumberFormat from 'react-number-format'

import { validateUser, validateMail,
  validatePassword, validateCnpj, validateCep } from '../../helpers/Validators'

import api from '../../services/api'
import cepPromise from 'cep-promise'

import registerImg from '../../assets/register-image.png'

import './styles.css'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      //Estados relacionados ao cepPromise
      cep: '',
      cepError: '',
      //Estados relacionados ao BD
      marca: '',
      marcaError: '',
      email: '',
      emailError: '',
      senha: '',
      senhaError: '',
      cnpj: '',
      cnpjError: '',
      rua: '',
      numero: '',
      numeroError: '',
      bairro: '',
      cidade: '',
      estado: '',

      mostrarSenha: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this)    
  }

  async handleRegister(e) {
    e.preventDefault()


      //Variável que redireciona
      const { history } = this.props

      //Pegando a imagem que o usuário enviou.
      const file = document.getElementById('market_picture').files[0]

      //Passando a key para pesquisar no Bing.
      const provider = new BingProvider({ 
        params: {
          key: 'ApJOHkrHOc22p53qpw8drsNahv1selmPw_yq-xR72HESwtP35o8gYq7Nvwi_EF2N'
        },
      })

      //Passando o endereço para a API do Bing retornar a latitude e a longitude para adicionar no map.
      const latLng = await provider.search({
        query: `${this.state.rua},${this.state.numero},${this.state.bairro},
        ${this.state.cidade},${this.state.estado}`})

      const latitude = latLng[0].y
      const longitude = latLng[0].x

      //Arrumando os dados para enviar ao banco
      const data = new FormData()

      data.append("market_name", this.state.marca)
      data.append("market_mail", this.state.email)
      data.append("market_password", this.state.senha)
      data.append("market_cnpj", this.state.cnpj)
      data.append("market_cep", this.state.cep)
      data.append("market_street", this.state.rua)
      data.append("market_number", this.state.numero)
      data.append("market_neighborhood", this.state.bairro)
      data.append("market_city", this.state.cidade)
      data.append("market_uf", this.state.estado)
      data.append("market_latitude", latitude)
      data.append("market_longitude", longitude)
      data.append("market_picture", file, file.name)

      //Fazendo a inserção no banco.
      try {
        const response = await api.post('cadastro', data)

        if(response.data._id === undefined) {
          alert(response.data.message)
        } else {
          alert('Cadastro realizado com sucesso. Seja muito bem-vindo!')

          history.push('/') 
        }             
      } catch(err) {
        alert(err)
      }   
  }

  //Função responsável por "escutar" os inputs, atualizando os states
  handleChange({target}) {
    this.setState({
      [target.name]: target.value
    })
  }

  //Função que recebe o CEP e armazena o endereço nos states correspondentes.
  handleKeyUp(value) {
    value.length === 9 && cepPromise(this.state.cep).then(response => {
      this.setState({
        cidade: response.city,
        bairro: response.neighborhood,
        rua: response.street,
        estado: response.state
      })
    })
  }

  handleClickShowPassword() {
    this.setState({
      mostrarSenha: !this.mostrarSenha})
  }

  handleMouseDownPassword(e) {
    e.preventDefault()
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
                <FaArrowLeft size={15} color="#74a2d6" />
                Retornar para a home
              </Link>
              <img src={registerImg} alt=""/>
            </section>

            <form method="post" encType="multipart/form-data" onSubmit={this.handleRegister}>
            <div>
              <TextField name="marca"
              label="Nome do mercado"
              required={true}
              error= {this.state.marcaError !== ''}
              value={this.state.marca}
              onChange={this.handleChange}
              onBlur={() => this.setState({
                marcaError: validateUser(this.state.marca)})}
              helperText={this.state.marcaError === '' ? '' : this.state.marcaError}/>

              <TextField type="email" name="email"
              label="E-mail"
              required={true}
              error= {this.state.emailError !== ""}
              value={this.state.email}
              onChange={this.handleChange}
              onBlur={() => this.setState({
                emailError: validateMail(this.state.email)
              })}
              helperText={this.state.emailError === '' ? '' : this.state.emailError}/>

              <TextField type="password" name="senha"
              label="Senha"
              required={true}
              error= {this.state.senhaError !== ""}
              value={this.state.senha}
              onChange={this.handleChange}
              onBlur={() => this.setState({
                senhaError: validatePassword(this.state.senha)
              })}
              helperText={this.state.senhaError === '' ? '' : this.state.senhaError}/>

              <NumberFormat type="text" name="cnpj"
              label="CNPJ"
              required={true}
              error= {this.state.cnpjError !== ""}
              value={this.state.cnpj}
              onChange={ e => this.setState({ cnpj: e.target.value })}
              onBlur={() => this.setState({
                cnpjError: validateCnpj(this.state.cnpj)
              })}
              helperText={this.state.cnpjError === '' ? '' : this.state.cnpjError}
              customInput={TextField}
              format="##.###.###/####-##"/>
              
              <div className="address-content">
                <NumberFormat type="text" name="cep"
                label="CEP"
                required={true}
                error= {this.state.cepError !== ""}
                value={this.state.cep}
                onChange={ e => this.setState({ cep: e.target.value })}
                onBlur={() => this.setState({
                  cepError: validateCep(this.state.cep)
                })}
                helperText={this.state.cepError === '' ? '' : this.state.cepError}
                onKeyUp={e => this.handleKeyUp(e.target.value)}
                customInput={TextField}
                format="#####-###"/>
              </div>
              </div>
              <div>
              <div>
                <div className="address-content">
                  <TextField type="text" name="rua"
                  label="Rua"
                  required={true}
                  value={this.state.rua}
                  onChange={this.handleChange} disabled/>

                  <TextField type="text" className="input-address" name="numero"
                  label="Nº"
                  required={true}
                  value={this.state.numero}
                  onChange={this.handleChange} />
                </div>
                <TextField type="text" name="bairro"
                label="Bairro"
                required={true}
                value={this.state.bairro}
                onChange={this.handleChange} disabled/>

                <div className="address-content">
                  <TextField type="text" name="cidade"
                  label="Cidade"
                  required={true}
                  value={this.state.cidade}
                  onChange={this.handleChange} disabled/>

                  <TextField type="text" className="input-address" name="estado"
                  label="UF"
                  required={true}
                  value={this.state.estado}
                  onChange={this.handleChange} disabled/>
                </div>

                <input type="file" name="market_picture" id="market_picture" required/>
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