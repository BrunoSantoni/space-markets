import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaPowerOff, FaUserEdit } from 'react-icons/fa'

import ProfilePicture from '../ProfilePicture'

import './styles.css'

export default function Header() {
  const marketName = localStorage.getItem('market_name')

  const history = useHistory()

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  function handleEdit() {
    history.push('/edit')
  }

  return(
    <header>
      <div className="container">
        <ProfilePicture />
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
