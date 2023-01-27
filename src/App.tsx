import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import './App.css'

function App() {

  const [value, setValue] = useState("");
  const [quotes, setQuotes] = useState<Array<string[]>>([]);
  const [hidden, setHidden] = useState(false);

  async function randomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random" )
        .then((response) => response.json())
        .then((data) => [data.author, data.content]);
    setQuotes([result]);
  }

  useEffect(() => {
    randomQuote();
  }, []);

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + event.currentTarget.value + "&fields=author")
        .then((response) => response.json())
        .then((data) => data.results);
      const quoteList: Array<string[]> = [];
      for (let i = 0; i < result.length; i++) {
        const temp: string[] = [];
        temp.push(await result[i].author, await result[i].content)
        quoteList.push(temp)
      }
      setHidden(true);
      setQuotes(quoteList);
    }
  }

  return (
    <div className="App">
      <h1 hidden={hidden}>Quote Search</h1>
      <div>
        <input 
          type="text"
          placeholder="Search here..."
          value={value}
          onChange={event => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          id="search"
        />
        {quotes.map(quote => (
          <div className='card'>
            <h3>{quote[1]}</h3>
            <p>{quote[0]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
