import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { BingProvider } from 'leaflet-geosearch'

import Header from '../Header'

import { cepMask } from '../Register/masks'
import api from '../../services/api'
import cepPromise from 'cep-promise'

import registerImg from '../../assets/register-image.png'

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
    console.log(marketInfo)
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
      await api.put(`edit/${id}`, data, {
        headers: {
          auth: id,
        }
      })

      alert('Informações alteradas com sucesso!')
      history.push('/perfil')
    } catch(err) {
      alert('Erro ao alterar informações', err)
    }    
  }

  return (
    <Fragment>
      <Header />
      <div className="register-container">
        <div className="content">
          <section>
            <h1>Altere seus dados!</h1>
            <p>Mudou de endereço? Tem um e-mail novo? <br/>Divida essa novidade com todos.</p>
            <Link className="back-link" to="/perfil">
              <FaArrowLeft size={15} color="#000" />
              Retornar para o seu perfil
            </Link>
            <img src={registerImg} alt=""/>
          </section>

          <form method="post">
          <div>

            <input type="email" placeholder="E-mail" name="email"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}/>

            <input type="password" placeholder="Senha" name="senha"
            defaultValue={senha}
            onChange={e => setSenha(e.target.value)}/>
            
            <div className="address-content">
              <input type="text" placeholder="CEP" name="cep"
              defaultValue={cep}
              onChange={e => setCep(cepMask(e.target.value))}
              onKeyUp={e => handleKeyUp(e.target.value)}
              />
            </div>
            </div>
            <div>
            <div>
              <div className="address-content">
                <input type="text" placeholder="Rua" name="rua"
                defaultValue={rua}
                onChange={e => setRua(e.target.value)} disabled/>

                <input type="text" placeholder="Nº" className="input-address" name="numero"
                defaultValue={numero}
                onChange={e => setNumero(e.target.value)} />
              </div>
              <input type="text" placeholder="Bairro" name="bairro"
              defaultValue={bairro}
              onChange={e => setBairro(e.target.value)} disabled/>

              <div className="address-content">
                <input type="text" placeholder="Cidade" name="cidade"
                defaultValue={cidade}
                onChange={e => setCidade(e.target.value)} disabled/>

                <input type="text" placeholder="UF" className="input-address" name="estado"
                defaultValue={estado}
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

