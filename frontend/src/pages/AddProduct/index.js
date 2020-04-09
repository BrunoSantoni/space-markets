import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.png'

const AddProduct = () => {
  const[produto, setProduto] = useState('')
  const[descricao, setDescricao] = useState('')
  const[preco, setPreco] = useState()
  const marketId = localStorage.getItem('id')

  const history = useHistory()

  //FUNÇÃO RESPONSÁVEL POR ADICIONAR O PRODUTO NO BANCO
  async function handleAddProduct(e) {
    e.preventDefault()

    const file = document.getElementById('product_picture').files[0]

    const data = new FormData()

    data.append("product_name", produto)
    data.append("product_description", descricao)
    data.append("product_price", preco)
    data.append("product_picture", file)

    try {
      await api.post('produtos/novo', data, {
        headers: {
          auth: marketId,
        }
      })

      alert('Produto adicionado com sucesso!');

      history.push('/perfil');
    } catch(err) {
      alert('Erro ao cadastrar produto', err);
    }
    }
    return(
      <div className="add-product-container">
          <div className="content">
            <section>
              <img src = {logo} alt="Be The Hero"/>

                <h1>Cadastrar novo produto</h1>
                <p>Insira um novo produto para que todos possam ver que você possui a melhor oferta!</p>
                <Link className="back-link" to="/perfil">
                    <FaArrowLeft size={16} color="#E02041"/>
                    Voltar para o perfil
                </Link>
            </section>

            <form onSubmit={handleAddProduct}>
              <input
              type="text"
              placeholder="Nome do Produto"
              value={produto}
              onChange={e => setProduto(e.target.value)}/>

              <textarea
              type="text"
              placeholder="Breve descrição"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}/>

              <input
              type="text"
              placeholder="Valor em R$"
              value={preco}
              onChange={e => setPreco(parseFloat(e.target.value))}/>

              <input type="file" name="product_picture" id="product_picture"/>
              <button className="button" type="submit">Cadastrar</button>
            </form>
          </div>
      </div>
    )
}

export default AddProduct