const ImageCard = ({ src, description, hintVisible, setHintVisible }) => (
  
  <div className="card-content">
    <img className="card-image" src={`./src/images/${src}`} alt={`Current Guess`} />
    <div className="card-text">
      {hintVisible ? (
        <p className="small-text">{description}</p>
      ) : (
        <button onClick={() => setHintVisible(true)}>Wisdom Whisper</button>
      )}
    </div>
  </div>
);



export default ImageCard;
