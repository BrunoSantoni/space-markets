import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;  /* Largura máxima */
  height: 100vh; /* Faz com que ocupe a página toda */
  margin: 0 auto; /* Faz com que o conteúdo fique centralizado */
  position: relative;

  display: flex; /* FlexBox, por padrão a flexbox alinha os itens um ao lado do outro */
  align-items: center; /* Alinha os itens verticalmente ao centro */
  justify-content: center; /* Alinha os itens horizontalmente ao centro */
`

export const Content = styled.div`
  position: relative;
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  /* 0 e 0 são o eixo X e Y, 100px de blur e o rgba pegou a cor preta com 10% de opacidade */
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  /* Isso jogará a section para a esquerda, o formulário para a direita e colocará um espaço entre eles */
  align-items: center;

  section {
    width: 100%;
    max-width: 380px;

    img {
      position: absolute;
      top: 20px;
    }

    h1 {
      font-size: 28px;
      margin-bottom: .5rem;
    }

    p {
      font-size: 18px;
      color: #737380;
      line-height: 32px;
    }
  }

  form {
    width: 100%;
    max-width: 450px;

    .lbl-file {
      margin-top: 8px;
    }
  }
`