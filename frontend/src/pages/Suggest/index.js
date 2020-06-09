import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa'

import '../Profile/styles.css'

import emptyImage from '../../assets/empty-image.png'

import Header from '../Header'

import api from '../../services/api'

const id = localStorage.getItem('id')

export default function Suggest() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    api.get('sugestao', {
      headers: {
        auth: id
      }
    }).then(res => {
      setSuggestions(res.data)
    })
  }, [])

  async function handleAccept(suggestId, name, description, price, url, key, suggestUser) {
    const data = {
      suggest_id: suggestId,
      product_name: name,
      product_description: description,
      product_price: price,
      product_picture_url: url,
      product_picture_key: key,
      product_user: suggestUser
    }

    try {
      const response = await api.post('produtosugestao', data, {
        headers: {
          auth: id,
        }
      })

      if(response.data.message === undefined) {
        alert('Produto adicionado com sucesso!')
      } else {
        alert(response.data.message)
        setSuggestions(suggestions.filter(suggestion => suggestion._id !== suggestId))
      }
    } catch(err) {
      alert('Erro\n' + err)
    }
  }

  async function handleDelete(suggestId) {
    try {
      await api.delete(`sugestao/${suggestId}`, {
        headers: {
          auth: id
        }
      })
      setSuggestions(suggestions.filter(suggestion => suggestion._id !== suggestId))
    } catch(err) {
      alert(err)
    }    
  }

  const suggestionsList = suggestions.map(suggestion => ((
    <li key={suggestion._id}>
      <section>
        <img src={suggestion.suggest_picture_url} alt="Foto do produto" />
      </section>
      <div>
        <p><strong>PRODUTO:</strong>{suggestion.suggest_name}</p>

        <p><strong>DESCRIÇÃO:</strong> {suggestion.suggest_description}</p>

        <p><strong>VALOR:</strong>R$ {suggestion.suggest_price}</p>

        <button onClick={() => handleAccept(suggestion._id, suggestion.suggest_name,
          suggestion.suggest_description, suggestion.suggest_price, suggestion.suggest_picture_url,
          suggestion.suggest_picture_key, suggestion.suggest_user)} type="button" className="edit-button">
            <FaCheck size={22} color="#FFF" />
        </button>
        <button type="button" className="delete-button">
            <FaTimes  onClick={() => handleDelete(suggestion._id)} size={22} color="#FFF" />
        </button>
      </div>
    </li>
  )))

  return(
    <>
        <div className="profile-container">  
          <Header />
          <div className="product-container">
            <Link className="button" to='/perfil'>Produtos cadastrados</Link>
            <Link className="button" to='/avaliar'>Sugestões recebidas</Link>
            {!suggestions.length ? 
            <div className="div-empty">
              
              <h1>Ainda não há produtos para avaliar!</h1>
              <img src={emptyImage}/>
              <h2> Parece que ainda não há sugestões :( </h2>
            </div> :
            <>
              <ul>{suggestionsList}</ul>
            </>
            }
          </div>
        </div>      
      </>
  )
}