import "./searchResult.css";
export const SearchResult = ({ result, gifUrl }) => {
    return (
      <div  className="search-result" onClick={() =>{ alert(`${result}! has been selected `);
        const gifImage = document.getElementById('gif');
        gifImage.style.display = 'block'; //didnt work, might scrape this idea 
     }}>
        {result}
      </div>
    );
  };