import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaPowerOff, FaUserEdit, FaEdit } from 'react-icons/fa'

import './styles.css'

import api from '../../services/api'

export default function Header() {
  const [picture, setPicture] = useState('')
  const [pictureKey, setPictureKey] = useState('')

  const marketId = localStorage.getItem('market_id')
  const marketName = localStorage.getItem('market_name')
  const id = localStorage.getItem('id')

  const history = useHistory()

  //Busca a imagem de perfil do mercado
  useEffect(() => {
    api.get('perfil', {
      headers: {
        auth: marketId
      }
    }).then(res => {
      setPicture(res.data[0].market_picture_url)
      setPictureKey(res.data[0].market_picture_key)
    })
  }, [pictureKey])

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  function handleEdit() {
    history.push('/edit')
  }

  function handleImgEdit() {
    document.getElementById('market_new_picture').click()

    setTimeout( async () => {
      const file = document.getElementById('market_new_picture').files[0]
    
      const data = new FormData()
  
      data.append("market_new_picture", file, file.name)
  
      try {
        const response = await api.put(`perfil/${id}`, data, {
          headers: {
            auth: id
          }
        })
  
        alert('Foto de perfil alterada com sucesso\nAgora todos podem ver seu novo logotipo!')

        setPictureKey(response.data.market_picture_key)            
      } catch(err) {
        alert(err)
      }   
    }, 3000)
  }

  return(
    <header>
      <div className="container">
        <img src={picture} alt="Foto de perfil" />
        <div className="edit">
        <input id="market_new_picture" name="market_new_picture" type="file" hidden/>
          <button onClick={handleImgEdit} type="button" id="btn-edit-pic">
            <FaEdit size={20} color="#74a2d6" />
          </button>
        </div>
      </div>      
      <span>Bem-vindo, {marketName}!</span>

      <Link className="button" id="btn-cadastro" to="/produtos/novo">Cadastrar novo produto</Link>
      <button onClick={handleEdit} type="button" className="btn-header">
        <FaUserEdit size={18} color="#74a2d6" />
      </button>
      <button onClick={handleLogout} type="button" className="btn-header">
        <FaPowerOff size={18} color="#74a2d6" />
      </button>
    </header>
  )
}
