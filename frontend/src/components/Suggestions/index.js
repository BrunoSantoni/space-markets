import React, { useState, useEffect } from 'react'
import { FaCheck, FaTimes, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa'

import { Container, Content, ProductList } from './styles'

import emptyImage from '../../assets/empty-image.png'

import api from '../../services/api'

const id = localStorage.getItem('id')

export default function Suggest() {
  const [suggestions, setSuggestions] = useState([])
  const [isHidden, setIsHidden] = useState(false)

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

  function handleArrowClick() {
    setIsHidden(!isHidden)
  }

  const suggestionsList = suggestions.map(suggestion => ((
    <li key={suggestion._id}>
      <section>
        <img src={suggestion.suggest_picture_url} alt={suggestion.suggest_name} />
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
        <Container>
          <section>
            <h1>Sugestões dos clientes ({suggestions.length})</h1>
            
            {isHidden ?
              <FaRegArrowAltCircleDown size={20} onClick={handleArrowClick} color="#63b1b9" />
              :
              <FaRegArrowAltCircleUp size={20} onClick={handleArrowClick} color="#63b1b9" />
            }
          </section>
          <Content isHidden={isHidden}>
            {!suggestions.length ? 
              <>
                <div className="div-empty">
                  <img src={emptyImage} alt="Não há produtos cadastrados"/>
                  <h2> Assim que seus clientes começarem a contribuir,
                    as sugestões aparecerão aqui! :D </h2>
                </div>
              </> :
              <>
                <ProductList>{suggestionsList}</ProductList>
              </>
            }
          </Content>
        </Container>      
      </>
  )
}