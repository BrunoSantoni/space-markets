import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  span {
    font-size: 1.5rem;
    margin-left: 24px;
  }

  #btn-cadastro {
    width: 260px;
    margin-left: auto;
    /* vai fazer o botão ficar automaticamente na direita,
    pois ela coloca o máximo possível de margem na esquerda */
    margin-top: 0;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    justify-content: center;
  }

  .btn-header {
    height: 60px;
    width: 60px;
    border-radius: 4px;
    border: 1px solid #dcdce6;
    background: transparent;
    margin-left: 16px;
    transition: border-color 0.2s;
  }

  button:hover {
    border-color: #999;
  }
`
