import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;  /* Largura máxima */
  height: 100vh; /* Faz com que ocupe a página toda */
  margin: 0 auto; /* Faz com que o conteúdo fique centralizado */

  display: flex; /* FlexBox, por padrão a flexbox alinha os itens um ao lado do outro */
  align-items: center; /* Alinha os itens verticalmente ao centro */
  justify-content: center; /* Alinha os itens horizontalmente ao centro */

  .button {
    margin-top: 8px;
    height: 50px;
  }

  :disabled {
    cursor: not-allowed;
  }

  .back-link {
    color: #000;
    margin: 0;
  }
`

export const Content = styled.div`
  width: 100%;
  max-width: 850px;
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.1);
  padding: 80px 0;
  /* 0 e 0 são o eixo X e Y, 100px de blur e o rgba pegou a cor preta com 10% de opacidade */
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Isso jogará a section para a esquerda, o formulário para a direita e colocará um espaço entre eles */
  align-items: center;

  section {
    width: 100%;
    max-width: 665px;
    border-radius: 8px;
    color: #0092d5;
    position: relative;
    margin-bottom: 1rem;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    h1 {
      font-size: 40px;
      color: #74a2d6;
    }

    p {
      font-size: 18px;
      line-height: 32px;
      color: black;
      margin: 10px 0;
    }

    img {
      position: absolute;
      width: 40%;
      bottom: -10px;
      left: 0;
      border-radius: 8px;
    }
  }
`

export const Form = styled.form`
  width: 100%;
  max-width: 665px;
  margin-top: 2rem;

  display: flex;
  justify-content: space-between;

  div {
    width: 100%;
    max-width: 320px;
    margin-bottom: 5px;
  }

  input {
    margin-top: 8px;
    font-size: 16px;
  }

  .address-content {
    display: flex !important;
    align-items: center !important;
    margin-bottom: 0 !important;

    .input-address-number-and-uf {
      width: 20% !important;
      margin-left: 7px !important;
    }
  }
`