import {useEffect, useState} from 'react';
import React from 'react';
import './.css';

function App() {
  const [countries, setCountry] = useState([]);
  return (
    <div className="App">
      <Header countries={countries} setCountry={setCountry} />
      <FetchCountries setCountry={setCountry} countries={countries}/>
      <AllocationOfData countries={countries} setCountry={setCountry}/>
      <Footer/>
    </div>
  );
}
function Header( {countries, setCountry} ) {
  return(
    <>
      <div className='App--header'>
        <h1 className='App--header__text'> WORLD COUNTRIES DATA </h1>
        <h2> Currently we have {countries.length} countries </h2>
        
      </div> 
    </>
  );
}

function FetchCountries( {setCountry,countries}) {
 
  useEffect(
    () => {
      const fetchData = async() => {
        const url = 'https://restcountries.com/v2/all';
        try {
          const response = await fetch(url);
          const data = await response.json();
          setCountry(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      
    },
    []
  );
 
}
function AllocationOfData( {countries} ) {
  const [result, setResult] = useState('');
   
    return (<>
     <input type='text' className='App--search' onChange={(event) => setResult(event.target.value)}/>;
     <br></br>
    {
     
      countries.filter(item => { 
        if (result === '') return item;
        else if ( item.name.toString().toLowerCase().includes(result.toLowerCase())) { return item; }
      }).map( item => 
      {
        return ( <div className='box--env'>
    <div key={item.alpha3Code} className='Country--box'>
     <h1>{item.name}</h1>  
     <img src={item.flags.png} className='Country__flags'/>
       <div className='Country__description'>
         <span> Capital: {item.capital}</span> 
         <span> Region: {item.region} </span>
         <span> Population: {item.population} </span>
         <span>  {item.independent ? " Independent" : "Dependent"} </span>
       </div>
     </div> 
     </div>        );
      })} 
  </> )}
function Footer () {
  return (
    <footer className='country--footer'>
      <h1> footer </h1>
    </footer>
  );
}
export default App;
