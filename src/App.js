import { useState } from 'react';
import axios from 'axios';
import CGLogo from './chatGPT.png';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Prompt cannot be empty");
      return;
    }
    setLoading(true);

    // Post the input value 'prompt' to API endpoint
    axios
      .post("http://localhost:5555/chat", { prompt })
      .then((res) => setResponse(res.data))
      .catch((err) => {
        console.error(err);
        setError("Something went wrong, please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
    if (error) setError(null); // Clear error on change
  };

  return (
    <div className="wrapper">
      <h1>React ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <img src={CGLogo} alt="ChatGPT logo" className={loading ? 'cg-logo loading' : 'cg-logo'} />
        <input
          type="text"
          value={prompt}
          onChange={handleChange}
          placeholder="Ask anything... "
        />
        <button type="submit" disabled={loading}>Ask</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="response-area">
        {loading ? 'Loading...' : response}
      </p>
    </div>
  );
}

export default App;
