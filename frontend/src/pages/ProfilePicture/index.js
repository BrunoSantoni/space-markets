import React, { useState, useEffect } from 'react'

import { FaImage } from 'react-icons/fa'

import api from '../../services/api'

export default function ProfilePicture(){
  const [picture, setPicture] = useState('')
  /* imgHash é usado para a imagem aparecer imediamente após o usuário trocar */
  const [imgHash, setImgHash] = useState('')
  const marketId = localStorage.getItem('id')

  /* Busca a imagem de perfil do mercado */
  useEffect(() => {
    api.get('perfil', {
      headers: {
        auth: marketId
      }
    }).then(res => {
      setPicture(res.data[0].market_picture_url)
    })
  }, [marketId, imgHash])

  function handleImgEdit(e) {
    e.preventDefault()
    document.getElementById('market_new_picture').click()
  }

  const uploadImage = async () => {
    const file = document.getElementById('market_new_picture').files[0]
    const data = new FormData()

    data.append('market_new_picture', file, file.name)

    try {
      await api.put(`perfil/${marketId}`, data, {
        headers: {
          auth: marketId,
        }
      })

      alert('Foto de perfil alterada com sucesso\nAgora todos podem ver seu novo logotipo!')

      setImgHash(Date.now())  
    } catch(err) {
      alert(err)
    }   
  }

  return(
    <>
      <img src={`${picture}?${imgHash}`} alt="Foto de perfil" />
        <div className="edit">
        <input id="market_new_picture" name="market_new_picture" type="file" onInput={uploadImage} hidden/>
          <button onClick={handleImgEdit} type="button" id="btn-edit-pic">
            <FaImage size={25} color="#FFF" />
          </button>
      </div>
    </>
  )
}