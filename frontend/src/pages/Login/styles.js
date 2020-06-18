import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;  /* Largura máxima */
  height: 100vh; /* Faz com que ocupe a página toda */
  margin: 0 auto; /* Faz com que o conteúdo fique centralizado */

  display: flex; /* FlexBox, por padrão a flexbox alinha os itens um ao lado do outro */
  align-items: center; /* Alinha os itens verticalmente ao centro */
  justify-content: space-between; /* Coloca um espaço entre a section e a img */

  section {
    width: 100%;
    max-width: 450px;
    margin-right: 30px;
    position: relative;
    margin-top: 5.7rem;

    img {
      position: absolute;
      top: -120px;
      left: 50px;
      border-radius: 8px;
    }
  }

  .login-image {
    width: 600px;
  }
`

export const Form = styled.form`
  border-radius: 20px;
  padding: 40px;

  h1 {
    font-size: 32px;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }

  input + input {
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .back-link {
    p {
      display: flex;
      align-items: center;
    }
  }
`