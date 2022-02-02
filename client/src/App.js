import React from "react"
import './App.css'


function App() {
  const [data, setData] = React.useState(null)
  const [prompt, setPrompt] = React.useState('')
  const handleChange = (abc) => {
    setPrompt(abc.target.value)
  }
  const handleSubmit = (abc) => {
    abc.preventDefault()
    setData(null)
    fetch(`/api?prompt=${prompt}`)
      .then((res) => res.json())
      .then((data) => setData(`${data.generations[0].text.slice(0,-1)}`)) //template string
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Generator</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Give me a topic: <br/>
            <textarea name="input-box" rows="5" cols="100" value={prompt} onChange={handleChange}/>
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <h1>Result:</h1>
        <h3>{!data ? 'Question will appear here. Try general topics like "Sports and Entertainment", or specific topics like "Harry Potter", but try to keep prompts fairly general.' : data}</h3>

        <p>Feedback? <a href="mailto:elaine@cohere.com" className="App-link">Send me an email</a>. For errors please include a screenshot.</p>
        <p>Powered by <a href="https://cohere.ai/" className="App-link">Cohere</a></p>
      </header>
    </div>
  )
}


export default App
