import './App.css';
import React, { useState } from 'react'

function App() {

  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] =   useState([]);


 const getTracks = async ()=>{
    setIsLoading(true);
    let data = await fetch(`https://v1.nocodeapi.com/aditya_rajput/spotify/SieoEIqOIKTbOGzr/search?q=${keyword ==="" ? "trending" : keyword}&type=track`)
    let jsondata = await data.json()
    setTracks(jsondata.tracks.items)
    setIsLoading(false);
 }

  return (
    <>
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      A Music
    </a>
    
    <div className="collapse navbar-collapse d-flex justify-content-section" id="navbarTogglerDemo02">
        <input
          value={keyword}
          onChange= {(event) => setKeyword(event.target.value)}
          className="form-control me-2 w-75"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button onClick={getTracks} className="btn btn-outline-success">
          Search
        </button>
    </div>
  </div>
    </nav>

    <div className="container">
      <div className={`row ${isLoading ? "" : "d-none"}`}>  
        <div className="col-12 py-5 text-center">
          <div
            className="spinner-border"
            style={{ height: '3rem', width: '3rem'}}
            role="status"
          >
          <span className="visually-hidden"> Loading...</span>
        </div>
      </div>
    </div>
    <div className={`row ${keyword === "" ? "" : "d-none"}`}>  
          <div className="col-12 py-5 text-center">
           <h1>A Music</h1>
          </div>
        </div>
      <div className="row"> 
        {
          tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2" style={{width: "18 rem"}}>
                <div className="card" style={{width: "40 rem", margin: "50 px"}}>
                  <img className="border-2 w-100 " src={element.album.images[0].url} alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                      <p className="card-text">
                        Artist : {element.artists[0].name}
                      </p>
                      <p className="card-text">
                        Release Date : {element.album.release_date}
                      </p>
                      <audio src={element.preview_url} controls className="w-100" ></audio>
                    </div>
                </div>
                </div>
          );
          })
        }
      </div>
    </div>
    </>
  );
}

export default App;
