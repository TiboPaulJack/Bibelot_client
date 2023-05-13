import './hero.css'
import baseHost from "../../assets/baseHost.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Hero() {
  
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()
  
  
  const search = (e) => {
    const value = e.target.value
    
    if (value === '') {
      setSearchResults([]);
      return;
    }
    
    fetch(baseHost + `/model/search?search=${value}`)
      .then(res => res.json())
      .then(data => {
        setSearchResults(data)
        
        if (data.length === 0) {
          setSearchResults([{id: 0, name: 'No results found'}])
        }
      })
  }
  
  
  return (
    <main className="hero">

      <div className="hero__search">
        <input name="search"
               onChange={search}
               type="text"
               placeholder="Search for Models, Categories or Tags.."
        />
        <div className="hero__results">
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}
                  onClick={() => {navigate(`/model/${result.id}`)}}>
                <span className={"result__name"}> {result.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
     
      

    </main>
  )
}
