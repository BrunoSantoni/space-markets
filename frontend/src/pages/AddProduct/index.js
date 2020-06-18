import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { InputAdornment, TextField } from '@material-ui/core'
import NumberFormat from 'react-number-format'
import swal from 'sweetalert'

import api from '../../services/api'

import { Container, Content } from './styles'

import logo from '../../assets/logo.png'

const AddProduct = () => {
  const[produto, setProduto] = useState('')
  const[descricao, setDescricao] = useState('')
  const[preco, setPreco] = useState('')
  const productUser = false;
  const id = localStorage.getItem('id')

  const history = useHistory()

  //FUNÇÃO RESPONSÁVEL POR ADICIONAR O PRODUTO NO BANCO
  async function handleAddProduct(e) {
    e.preventDefault()

    const file = document.getElementById('product_picture').files[0]

    const data = new FormData()

    data.append('product_name', produto)
    data.append('product_description', descricao)
    data.append('product_price', preco)
    data.append('product_user', productUser) //Produto não adicionado pelo user
    data.append('product_picture', file)

    try {
      const response = await api.post('produtos', data, {
        headers: {
          auth: id,
        }
      })

      if(response.data.message === undefined) {
        await swal({
          title: 'Sucesso',
          text: 'Seu produto foi adicionado!',
          icon: 'success',
          button: 'Confirmar'})
        history.push('/perfil')
      } else {
        await swal('Algo deu errado :(', response.data.message, 'error')
      }      
    } catch(err) {
      alert('Erro ao cadastrar produto\n', err)
    }
  }
  return(
    <Container>
      <Content>
        <section>
          <img src = {logo} alt="Supermega"/>
          <h1>Cadastrar novo produto</h1>
          <p>Insira um novo produto para que todos possam ver que você possui a melhor oferta!</p>
          <Link className="back-link" to="/perfil">
            <FaArrowLeft size={16} color="#63b1b9"/>
            Voltar para a dashboard
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
      </Content>
    </Container>
  )
}

export default AddProduct