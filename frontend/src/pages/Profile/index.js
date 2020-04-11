import React, { useEffect, useState } from 'react'
import { FaTrash, FaPen, FaSave } from 'react-icons/fa'

import './styles.css'

import api from '../../services/api'

import Header from '../Header'

export default function Profile() {

  const[produto, setProduto] = useState('')
  const[descricao, setDescricao] = useState('')
  const[preco, setPreco] = useState('')

  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [showDiv, setShowDiv] = useState(false)

  const id = localStorage.getItem('id')

  //Busca os produtos já cadastrados
  useEffect(() => {
    api.get('produtos', {
      headers: {
        auth: id
      }
    }).then(res => {
      setProducts(res.data)
    })
  }, [showDiv])

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

  /* Troca o condicional component, muda o id do produto para ser alterado e reseta alguns states */
  function handleChange(id) {
    setProductId(id)
    setProduto('')
    setDescricao('')
    setPreco('')
    showDiv ? setShowDiv(false) : setShowDiv(true) 
  }

  //Faz a alteração do produto
  async function handleUpdate(prod_id, name, description, price) {
    console.log(produto, descricao, preco)

    //As 3 variáveis abaixo receberão de uma que possui valor.
    const product_name = produto === '' ? name : produto
    const product_description = descricao === '' ? description : descricao
    const product_price = preco === '' ? price : preco

    const data = {
      product_name,
      product_description,
      product_price    
    }   

    console.log(data)
    try {
      await api.post(`produtos/${prod_id}`, data, {
        headers: {
          auth: id,
        }
      })

      alert('Produto alterado com sucesso!')
      handleChange()
    } catch(err) {
      alert('Erro ao alterar produto', err)
      handleChange()
    }    
  }

  if(!showDiv) {
    return(
      <>
        <div className="profile-container">  
          <Header />
          <h1>Produtos Cadastrados</h1>
            <ul>
              {products.map(product => ((
              <li key={product._id}>
                <section>
                  <img src={product.product_picture_url} alt="Foto do produto" />
                </section>
                <div>
                  <p><strong>PRODUTO:</strong>{product.product_name}</p>

                  <p><strong>DESCRIÇÃO:</strong> {product.product_description}</p>

                  <p><strong>VALOR:</strong>R$ {product.product_price}</p>

                  <button onClick={() => handleChange(product._id)} type="button" id="edit-button">
                      <FaPen size={26} color="#737380" />
                  </button>
                  <button onClick={() => handleDelete(product._id)} type="button" id="delete-button">
                      <FaTrash size={26} color="#C7342A" />
                  </button>
                </div>
              </li>
              )))}
            </ul>
        </div>      
      </>
    )
  } else {
    return(
      <>
      <div className="profile-container">
        <Header />
        <h1>Produtos Cadastrados</h1>
        <ul>
          {products.map(product => ((
            <li key={product._id}>
              <strong>IMAGEM:</strong>
              <img src={product.product_picture_url} alt="Foto do produto" />

              <strong>PRODUTO:</strong>
              {productId == product._id ?
              <input type="text" defaultValue={product.product_name}
              onChange={e => setProduto(e.target.value)}/> : <p>{product.product_name}</p>}

              <strong>DESCRIÇÃO:</strong>
              {productId == product._id ?
              <input type="text" defaultValue={product.product_description}
              onChange={e => setDescricao(e.target.value)}/> : <p>{product.product_description}</p>}

              <strong>VALOR:</strong>
              {productId == product._id ?
              <input type="text" defaultValue={product.product_price}
              onChange={e => setPreco(e.target.value)}/> : <p>R$ {product.product_price}</p>}

              {productId == product._id ?
              <button onClick={() => 
              handleUpdate(product._id, product.product_name, product.product_description, product.product_price)}
              type="button" id="confirm-button">
                <FaSave size={20} color="#13C0F0" />
              </button> : null}
            </li>
          )))}
        </ul>
      </div> 
      </>
    )
  }
}
