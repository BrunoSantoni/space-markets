import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font: 400 15px Roboto, sans-serif;
    background: #EBEDF3;
    -webkit-font-smoothing: antialiased;
  }

  input, button, textarea {
    font: 400 18px Ubuntu, sans-serif;
  }

  input::-webkit-input-placeholder {
    font-weight: 100;
    font-size: 15px;
  }

  button {
    cursor: pointer;
  }

  form input {
    width: 100%;
    height: 50px;
    color: #333;
    border: 0;
    border-bottom: 1px solid black;
    padding: 0 12px;
    background: transparent;
  }

  form textarea {
    width: 100%;
    min-height: 140px;
    color: #333;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    padding: 16px 24px;
    line-height: 24px;
    margin-top: 12px;
    resize: vertical;
  }

  .button {
    width: 100%;
    height: 60px;
    background: #63b1b9;
    border: 0;
    border-radius: 8px; /* Deixa as bordas arredondadas */
    color: #fff;
    font-weight: bold;
    margin-top: 16px;
    
    display: inline-block;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    line-height: 50px;
    transition: filter 0.2s; /* Tempo para escurecer a tela*/
  }

  .button:hover { /* Hover é o efeito de quando passamos o mouse por cima */
    filter: brightness(90%); /* Efeito que diminuirá o brilho em 10% */
  }

  .back-link {
    display: flex;
    align-items: center; /* Fez isso para o texto e o ícone ficarem alinhados */
    margin-top: 40px;
    color: #000;
    font-size: 18px;
    text-decoration: none; /* Tira o sublinhado do link */
    font-weight: 500;
  }

  .back-link svg { /* Colocando margem no ícone */
    margin-right: 8px;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  /* Escondendo o input */
  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    transition: background-color 0.2s;
  }

  input[type="file"]:focus + .lbl-file,
  input[type="file"] + .lbl-file:hover {
    background-color: #dcdce6;
  }

  .lbl-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    font-size: 18px;
    transition: background-color 0.2s;

    svg {
      margin-bottom: 8px;
    }
    
    cursor: pointer;
  }
`