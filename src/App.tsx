import { useState } from 'react'
import './App.css'

function App() {

  // async function randomQuote() {
  //   const result = await fetch("https://api.quotable.io/random")
  //     .then((response) => response.json())
  //     .then((data) => data.content);
  //   const quoteList: string[] = [];
  //   quoteList.push(await result);
  //   return quoteList;
  // }

  const [value, setValue] = useState("");
  const defaultQuote: string[] = [];
  const [quotes, setQuotes] = useState(defaultQuote);

  async function handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      const result = await fetch("https://api.quotable.io/search/quotes?query=" + event.target.value + "&fields=author")
        .then((response) => response.json())
        .then((data) => data.results);
      const quoteList: string[] = [];
      for (let i = 0; i < result.length; i++) {
        quoteList.push(await result[i].content)
      }
      setQuotes(quoteList);
      console.log(quoteList);
    }
  }

  return (
    <div className="App">
      <h1>Quote Search</h1>
      <div className="card">
        <input 
          type="text"
          placeholder="Search here..."
          value={value}
          onChange={(event: any) => setValue(() => event.target.value)}
          onKeyDown={handleKeyDown}
        />
        {quotes.map(quote => (
          <h3>{quote}</h3>
        ))}
      </div>
    </div>
  )
}

export default App
