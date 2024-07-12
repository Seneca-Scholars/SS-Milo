import React, { useState } from 'react';
import './App.css';

const initialSongs = [
  {
    image: "https://i.scdn.co/image/ab67616d0000b2736c93b18e2b198ee3ece40a99",
    songName: "I Been Drinking",
    artist: "Future",
    songLink: "https://www.youtube.com/watch?v=fYsW4GoHwAo",
  },
  {
    image: "https://f4.bcbits.com/img/a1666561334_5.jpg",
    songName: "Do ya like",
    artist: "Childish Gambino",
    songLink: "https://www.youtube.com/watch?v=DsE1MsTWM5s"
  },
  {
    image: "https://f4.bcbits.com/img/a0698136415_10.jpg",
    songName: "B.O.R(Birth of Rap)",
    artist: "Lil B (AKA Based God)",
    songLink: "https://www.youtube.com/watch?v=OeLQOfb6IBU"
  },
  {
    image: "https://i.scdn.co/image/ab67616d0000b273cbf6c960af111d28a6356771",
    songName: "Undercover",
    artist: "Baby Smoove",
    songLink: "https://www.youtube.com/watch?v=2tfn5Z6V_QI"
  },
  { 
    image: "https://i1.sndcdn.com/artworks-gTTyKppkQ9Nj-0-t500x500.jpg",
    songName: "My Collection",
    artist: "Future",
    songLink: "https://www.youtube.com/watch?v=aM0C03JcVgs"
  },
  {
    image: "https://i.scdn.co/image/ab67616d0000b2735eae69bbe37d5f382155e387",
    songName: "I Don’t Care If You’re Contagious",
    artist: "Pierce The Veil",
    songLink: "https://www.youtube.com/watch?v=RPxffXhoYi4"
  },
];

function App() {
  const [playlist, setPlaylist] = useState(initialSongs);
  const [formData, setFormData] = useState({ image: '', songName: '', artist: '', songLink: '' });

  const addSongInfo = () => {
    if (!formData.image || !formData.songName || !formData.artist || !formData.songLink) {
      alert("Please fill in all required fields.");
      return;
    }

    setPlaylist([...playlist, formData]);
    setFormData({ image: '', songName: '', artist: '', songLink: '' });

    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 2000);
    }
  };

  const shufflePlaylist = () => {
    const shuffled = [...playlist].sort(() => Math.random() - 0.5);
    setPlaylist(shuffled);
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  };

  const openLink = () => {
    if (playlist.length > 0) {
      window.open(playlist[0].songLink, "_blank");
    } else {
      console.log("Playlist is empty.");
    }
  };

  return (
    <div className="App">
    <h1>Mylow's Playlist</h1>
    <div className="imgofmylow">
      <img
        key="Mylow"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Statue-Augustus.jpg/290px-Statue-Augustus.jpg"
        alt="Statue of Augustus"
      />
    </div>
      <div className="form">
        <p>Add a new song:</p>
        <div className="inputs">
          <input 
            placeholder="Image URL"
            className="image"
            title="Enter the URL of the song's image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required 
          />
          <input 
            placeholder="Song Name"
            className="song-name"
            title="Enter the name of the song"
            value={formData.songName}
            onChange={(e) => setFormData({ ...formData, songName: e.target.value })}
            required 
          />
          <input 
            placeholder="Artist"
            className="artist"
            title="Enter the artist's name"
            value={formData.artist}
            onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
            required 
          />
          <input 
            placeholder="Song Link Address"
            className="song-link"
            title="Enter the URL of the song's link"
            value={formData.songLink}
            onChange={(e) => setFormData({ ...formData, songLink: e.target.value })}
            required 
          />
        </div>
        <button className="add" onClick={addSongInfo}>Add</button>
        <button className="shuffle" onClick={shufflePlaylist}>Shuffle</button>
        <button className="clear" onClick={clearPlaylist}>Clear Playlist</button>
      </div>

      <div id="successMessage" style={{ display: 'none' }}>Song added successfully!</div>

      <div className="heading">
        <h4>Image</h4>
        <h4>Song</h4>
        <h4>Artist</h4>
        <h4>Song Link</h4>
      </div>
      
      <button className="open-link" onClick={openLink}>Open Link</button>
      <button onClick={() => alert('Share via Email feature not implemented.')}>Share via Email</button>

      <div className="display">
        <div className="column display-image">
          {playlist.map((song, index) => (
            <img key={index} src={song.image} alt="Song Image" />
          ))}
        </div>
        <div className="column display-song">
          {playlist.map((song, index) => (
            <p key={index}>{song.songName}</p>
          ))}
        </div>
        <div className="column display-artist">
          {playlist.map((song, index) => (
            <p key={index}>{song.artist}</p>
          ))}
        </div>
        <div className="column display-link">
          {playlist.map((song, index) => (
            <a key={index} href={song.songLink} target="_blank" rel="noopener noreferrer">Listen</a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

