import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { InputAdornment, TextField } from '@material-ui/core'
import NumberFormat from 'react-number-format'

import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.png'

const AddProduct = () => {
  const[produto, setProduto] = useState('')
  const[descricao, setDescricao] = useState('')
  const[preco, setPreco] = useState('')
  const id = localStorage.getItem('id')

  const history = useHistory()

  //FUNÇÃO RESPONSÁVEL POR ADICIONAR O PRODUTO NO BANCO
  async function handleAddProduct(e) {
    e.preventDefault()

    const file = document.getElementById('product_picture').files[0]

    const data = new FormData()

    data.append("product_name", produto)
    data.append("product_description", descricao)
    data.append("product_price", preco)
    data.append("product_user", false) //Produto não adicionado pelo user
    data.append("product_picture", file)

    try {
      await api.post('produtos', data, {
        headers: {
          auth: id,
        }
      })

      alert('Produto adicionado com sucesso!')

      history.push('/perfil')
    } catch(err) {
      alert('Erro ao cadastrar produto', err)
    }
  }
  return(
    <div className="add-product-container">
        <div className="content">
          <section>
            <img src = {logo} alt="Supermega"/>

              <h1>Cadastrar novo produto</h1>
              <p>Insira um novo produto para que todos possam ver que você possui a melhor oferta!</p>
              <Link className="back-link" to="/perfil">
                  <FaArrowLeft size={16} color="#63b1b9"/>
                  Voltar para o perfil
              </Link>
          </section>

          <form onSubmit={handleAddProduct}>
            <TextField
            type="text" name="nome"
            label="Nome do Produto"
            required={true}
            fullWidth={true}
            variant="outlined"
            value={produto}
            onChange={e => setProduto(e.target.value)}/>

            <TextField
            type="text" name="descricao"
            label="Breve descrição"
            required={true}
            multiline={true}
            fullWidth={true} /* Faz pegar a largura toda do componente */
            margin="normal"
            variant="outlined"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}/>


            <NumberFormat
            type="text" name="preco"
            label="Preço"
            required={true}
            fullWidth = {true}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>
            }}              
            variant="outlined"
            value={preco}
            onChange={e => setPreco(e.target.value)}
            customInput={TextField}
            thousandSeparator= '.'
            decimalSeparator= ','
            />

            <input type="file" name="product_picture" id="product_picture" required/>
            <button className="button" type="submit">Cadastrar</button>
          </form>
        </div>
    </div>
  )
}

export default AddProduct