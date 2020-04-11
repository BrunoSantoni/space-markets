import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaPowerOff } from 'react-icons/fa'

import './styles.css'

import api from '../../services/api'

export default function Header() {
  const [picture, setPicture] = useState('')

  const marketId = localStorage.getItem('market_id')
  const marketName = localStorage.getItem('market_name')

  const history = useHistory()

  //Busca a imagem de perfil do mercado
  useEffect(() => {
    api.get('perfil', {
      headers: {
        auth: marketId
      }
    }).then(res => {
      setPicture(res.data[0].market_picture_url)
    })
  }, [marketId])

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return(
    <header>
      <img src={picture} alt="Foto de perfil" />
      <span>Bem-vindo, {marketName}!</span>
      <Link className="button" id="btn-cadastro" to="/produtos/novo">Cadastrar novo produto</Link>
      <button onClick={handleLogout} type="button">
        <FaPowerOff size={18} color="#C7342A" />
      </button>
    </header>
  )
}
