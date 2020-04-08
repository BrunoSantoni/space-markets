import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaPowerOff, FaTrash } from 'react-icons/fa'

import './styles.css'

import api from '../../services/api'

export default function Profile() {

  const [products, setProducts] = useState([])

  const [picture, setPicture] = useState('')
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
      setProducts(res.data)
    })
  }, [marketId])

  //Busca os produtos já cadastrados
  useEffect(() => {
    api.get('perfil/produtos', {
      headers: {
        auth: id
      }
    }).then(res => {
      setProducts(res.data)
    })
  }, [marketId])

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return(
    <>
      <div className="profile-container">
        <header>
          <img src={picture} alt="Foto de perfil" />
          <span>Bem vindo, {marketName}</span>
          <Link className="button" to="/produtos/novo">Cadastrar novo produto</Link>
          <button onClick={handleLogout} type="button">
            <FaPowerOff size={18} color="#E02041" />
          </button>
          </header>

        <h1>Profile</h1>
        <h1>Produtos Cadastrados</h1>
          <ul>
            {products.map(product => ((
            <li key={product._id}>
              <strong>IMAGEM:</strong>
              <img src={product.product_picture_url} alt="Foto do produto" />

              <strong>PRODUTO:</strong>
              <p>{product.product_name}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{product.product_description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.product_price)}</p>

              <button onClick={() => {}} type="button">
                  <FaTrash size={20} color="#A8A8B3" />
              </button>
            </li>
            )))}
          </ul>
      </div>      
    </>
  )
}
