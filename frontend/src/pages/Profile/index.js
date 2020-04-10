import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaPowerOff, FaTrash, FaEdit } from 'react-icons/fa'

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
    })
  }, [marketId])

  //Busca os produtos já cadastrados
  useEffect(() => {
    api.get('produtos', {
      headers: {
        auth: id
      }
    }).then(res => {
      setProducts(res.data)
    })
  }, [id])

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  async function handleDelete(prod_id) {
    try {
      await api.delete(`produtos/${prod_id}`, {
        headers: {
          auth: id
        }
      })
      setProducts(products.filter(product => product._id !== prod_id))
    } catch(err) {
      alert(err)
    }    
  }

  return(
    <>
      <div className="profile-container">
        <header>
          <img src={picture} alt="Foto de perfil" />
          <span>Bem vindo, {marketName}</span>
          <Link className="button" to="/produtos/novo">Cadastrar novo produto</Link>
          <button onClick={handleLogout} type="button">
            <FaPowerOff size={18} color="#C7342A" />
          </button>
          </header>

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
              <p>R$ {product.product_price}</p>

              <button onClick={() => {}} type="button" id="edit-button">
                  <FaEdit size={20} color="#FFD86E" />
              </button>
              <button onClick={() => handleDelete(product._id)} type="button" id="delete-button">
                  <FaTrash size={20} color="#C7342A" />
              </button>
            </li>
            )))}
          </ul>
      </div>      
    </>
  )
}
