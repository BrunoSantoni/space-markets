import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 108px;
  height: 108px;
  border-radius: 8px;
  overflow: hidden;
  object-fit: cover;

  img {
    max-width: 100%;
    width: auto;
    height: auto;
    
  }
`

export const EditImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  transition: all .2s;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }

  button {
    background: transparent;
    height: 25px;
    width: 25px;
    border: 0;
  }
`