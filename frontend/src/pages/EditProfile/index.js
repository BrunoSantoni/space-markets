import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { BingProvider } from 'leaflet-geosearch'
import { TextField } from '@material-ui/core'

import Header from '../Header'

import { cepMask } from '../../helpers/masks'
import api from '../../services/api'
import cepPromise from 'cep-promise'

import editImg from '../../assets/edit-image.png'

import './styles.css'

export default function EditProfile(){
  const [cep, setCep] = useState('')

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  const [marketInfo, setMarketInfo] = useState([])

  const id = localStorage.getItem('id')

  const history = useHistory()

  useEffect(() => {
    api.get('edit', {
      headers: {
        auth: id
      }
    }).then(res => {
      setMarketInfo(res.data[0])
      setEmail(res.data[0].market_mail)
      setSenha(res.data[0].market_password)
      setRua(res.data[0].market_street)
      setCep(res.data[0].market_cep)
      setNumero(res.data[0].market_number)
      setBairro(res.data[0].market_neighborhood)
      setCidade(res.data[0].market_city)
      setEstado(res.data[0].market_uf)
    })
  }, [id])

  function handleKeyUp(value) {
    value.length === 9 && cepPromise(cep).then(response => {
      setCidade(response.city)
      setBairro(response.neighborhood)
      setRua(response.street)
      setEstado(response.state)
    })
  }  

  async function handleUpdate() {
    const provider = new BingProvider({ 
      params: {
        key: 'ApJOHkrHOc22p53qpw8drsNahv1selmPw_yq-xR72HESwtP35o8gYq7Nvwi_EF2N'
      },
    })
    
    //Passando o endereço para a API do Bing retornar a latitude e a longitude para adicionar no map.
    const latLng = await provider.search({
      query: `${rua},${numero},${bairro},
      ${cidade},${estado}`})

    const market_latitude = latLng[0].y
    const market_longitude = latLng[0].x

    //As 3 variáveis abaixo receberão de uma que possui valor.
    const market_mail = email === '' ? marketInfo.market_mail : email
    const market_password = senha === '' ? marketInfo.market_password : senha
    const market_cep = cep === '' ? marketInfo.market_cep : cep
    const market_street = rua === '' ? marketInfo.market_street : rua
    const market_number = numero === '' ? marketInfo.market_number : numero
    const market_neighborhood = bairro === '' ? marketInfo.market_neighborhood : bairro
    const market_city = cidade === '' ? marketInfo.market_city : cidade
    const market_uf = estado === '' ? marketInfo.market_uf : estado

    const data = {
      market_mail,
      market_password,
      market_cep,
      market_street,
      market_number,
      market_neighborhood,
      market_city,
      market_uf,
      market_latitude,
      market_longitude
    }   
    
    try {
      const response = await api.put(`edit/${id}`, data, {
        headers: {
          auth: id,
        }
      })

      if(response.data.message === undefined) {
        alert('Informações alteradas com sucesso!')
        history.push('/perfil')
      } else {
        alert(response.data.message)
      }
    } catch(err) {
      alert('Erro ao alterar informações', err)
    }    
  }

  return (
    <Fragment>
      <div className="edit-container">
        <div className="content">
          <section>
            <h1>Altere seus dados!</h1>
            <p>Mudou de endereço? Tem um e-mail novo? <br/>Divida essa novidade com todos.</p>
            <Link className="back-link" to="/perfil">
              <FaArrowLeft size={15} color="#63b1b9" />
              Retornar para o seu perfil
            </Link>
            <img src={editImg} alt=""/>
          </section>

          <form method="post">
          <div>

            <TextField type="email" name="email"
            label="E-mail"
            defaultValue={email}
            key={`${Math.floor((Math.random() * 1000))}-min` /* Usado para dar re-render a atualizar o valor do state */}
            onChange={e => setEmail(e.target.value)}/>

            <TextField type="password" name="senha"
            label="Senha"
            defaultValue={senha}
            onChange={e => setSenha(e.target.value)}/>
            
            <div className="address-content">
              <TextField type="text" name="cep"
              label="CEP" 
              defaultValue={cep}
              key={`${Math.floor((Math.random() * 1000))}-min`}
              onChange={e => setCep(cepMask(e.target.value))}
              onKeyUp={e => handleKeyUp(e.target.value)}
              />
            </div>
            </div>
            <div>
            <div>
              <div className="address-content">
                <TextField type="text" label="Rua" name="rua"
                defaultValue={rua}
                key={`${Math.floor((Math.random() * 1000))}-min`}
                onChange={e => setRua(e.target.value)} disabled/>

                <TextField type="text" label="Nº" className="input-address" name="numero"
                defaultValue={numero}
                key={`${Math.floor((Math.random() * 1000))}-min`}
                onChange={e => setNumero(e.target.value)} />
              </div>
              <TextField type="text" label="Bairro" name="bairro"
              defaultValue={bairro}
              key={`${Math.floor((Math.random() * 1000))}-min`}
              onChange={e => setBairro(e.target.value)} disabled/>

              <div className="address-content">
                <TextField type="text" label="Cidade" name="cidade"
                defaultValue={cidade}
                key={`${Math.floor((Math.random() * 1000))}-min`}
                onChange={e => setCidade(e.target.value)} disabled/>

                <TextField type="text" label="UF" className="input-address" name="estado"
                defaultValue={estado}
                key={`${Math.floor((Math.random() * 1000))}-min`}
                onChange={e => setEstado(e.target.value)} disabled/>
              </div>
            </div>
            </div>
          </form>
          <button type="submit" className="button" onClick={handleUpdate}>Atualizar</button>
        </div>
      </div>
    </Fragment>
  )
}

