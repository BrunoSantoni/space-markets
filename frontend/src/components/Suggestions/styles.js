import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 32px auto; /* Alinhou */

  section {
    display: flex;
    justify-content: space-between;

    svg {
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.5;
      }
    }
  }
`

export const Content = styled.div`
  background: #FFF;
  margin-top: 2rem;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  overflow: hidden;
  overflow-x:scroll;

  transition: max-height 1s ease-in-out;
  max-height: ${props => (props.isHidden ? '0px' : '250px')};

  .div-empty {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 15px;
    }

    img {
      margin: 10px 0;
      width: 125px;
    }
  }

  .button {
    width: 300px;
    height: 50px;

    font-size: 20px;
    background: transparent;
    color:#000;

    margin-top: 0;
    margin-left: 150px;

    border: solid 2px;
    border-radius: 8px;
    border-color: #63b1b9;
  }

  .button:first-child {
    margin-right: 10px;
  }
`

export const ProductList = styled.ul`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  height: 250px;
  

  li {
    position: relative;
    width: 516px;
    height: 198px;
    background: #FFF;
    padding: 24px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all .15s ease-in-out;

    margin-left: 24px;

    &:hover {
      transform: scale(1.005);
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    &:last-child {
      margin-right: 24px;
    }

    section {
      img {
        max-width: 150px;
        height: 150px;
        border-radius: 8px;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:last-child p {
        display: flex;
      }

      input {
        /* Resetando propriedades do global */
        height: 21px;
        padding: 0 .5rem;
        border: 0;

        /* Setando propriedades */
        color: black;
        line-height: 21px;
        font-size: 14px;
        margin-top: 5px;
        
        border-bottom: 1px solid;
      }

      p {
        color: #737380;
        font-size: 14px;
        margin: 0 0 1rem 1rem;
        font-family: 'Roboto', sans-serif;
        text-align: left;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      strong {
        display: block;
        color: #41414D;

        &:not(:first-child) {
          margin-top: 32px;
        }
      }
    }
    button {
      position: absolute; /* posição absoluta deixa o elemento "solto", flutuando pelo layout */
      right: 24px;
      top: 24px;
      border: 0;
      background: #63b1b9;
      padding: 8px;
      border-radius: 8px;
      transition: all .2s;

      display: flex;
      justify-content: center;
      align-items: center;

        &:hover {
          opacity: .8;
        }
      }

    .edit-button {
      position: absolute;
      right: 70px;
      top: 24px;
    }
  }
`