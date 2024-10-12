import React, { useState, useEffect } from 'react';
import './App.css'
import { RotatingLinesVSD } from '../../components/rotatinglines'

const App = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [fadeOut, setFadeOut] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setResponseMessage('Por favor, insira um email válido.');
      return;
    }
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setResponseMessage('Email enviado com sucesso!');
        setFadeOut(false); // Resetar o estado fadeOut antes de iniciar o timer
        setTimeout(() => setFadeOut(true), 3000);
        setTimeout(() => {
          setResponseMessage('');
          setFadeOut(false); // Resetar o estado fadeOut
        }, 5000);
      }

      else {
        setResponseMessage('Falha ao enviar email.');
      }

    } catch (error) {
      setResponseMessage('Ocorreu um erro.');
    }

    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!responseMessage) {
      setFadeOut(false); // Resetar o estado fadeOut quando não há mensagem
    }
  }, [responseMessage]);


  return (
    <div className='dashboard'>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />


        <div className='button'>
          <button type="submit">
            <span className='button-text'>{loading ? 'Enviando...' : 'Enviar'} </span>
          </button>
          <div className='loader'>
            {loading && <RotatingLinesVSD />}
          </div>
        </div>

      </form>

      <div className='message'>
        {message && <p>{message}</p>}
      </div>

      {responseMessage && (
        <p className={`message ${fadeOut ? 'fade-out' : ''}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default App;
