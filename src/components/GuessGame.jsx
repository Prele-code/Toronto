import { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import InputSection from "./InputSection";
import GameOver from "./GameOver";
import Images from "./Images";
import "../index.css";

const GuessGame = () => {
  const [currentImage, setCurrentImage] = useState({});
  const [guesses, setGuesses] = useState(Array(Images.length).fill(""));
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [usedImages, setUsedImages] = useState([]);
  const [hintVisible, setHintVisible] = useState(false);
  const [showSubmissionWarning, setShowSubmissionWarning] = useState(false);
  const [verdictMessage, setVerdictMessage] = useState("");

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts]);

  const startNewRound = () => {
    setGuesses(Array(Images.length).fill(""));
    setHintVisible(false);

    // Set a new random image that wasn't used in the round
    const remainingImages = Images.filter(
      (img) => !usedImages.includes(img.src)
    );

    if (remainingImages.length === 0) {
      setUsedImages([]);
    }

    const randomIndex = Math.floor(Math.random() * remainingImages.length);
    const newImage = remainingImages[randomIndex];
    setCurrentImage(newImage);

    // Update the list of used images
    setUsedImages([...usedImages, newImage.src]);
  };

  const handleInputChange = (index, value) => {
    const newGuesses = [...guesses];
    newGuesses[index] = value;
    setGuesses(newGuesses);
    setShowSubmissionWarning(false);
  };

  const handleSubmit = () => {
    const correctAnswers = {
      "Allan Gardens.jpeg": "Allan Gardens",
      "Bata Shoe Museum.jpeg": "Bata Shoe Museum",
      "Berczy Park Fountain.jpg": "Berczy Park Fountain",
      "Chester Hill Lookout.jpg": "Chester Hill Lookout",
      "Crazy Doll House.jpg": "Crazy Doll House",
      "Cube House.jpg": "Cube House",
      "Evergreen Brick Works.jpg": "Evergreen Brick Works",
      "Gibraltar Point Lighthouse.jpg": "Gibraltar Point Lighthouse",
      "Gooderham Building.jpg": "Gooderham Building",
      "Graffiti Alley.jpg": "Graffiti Alley",
      "Guild Inn.jpg": "Guild Inn",
      "Half House.jpg": "Half House",
      "Ireland Park.jpeg": "Ireland Park",
      "Kensington Market.jpg": "Kensington Market",
      "Lower Bay Station.jpg": "Lower Bay Station",
      "North Toronto Station.jpg": "North Toronto Station",
      "Oculus Pavilion.jpg": "Oculus Pavilion",
      "Old City Hall.jpg": "Old City Hall",
      "Ontario Place.jpg": "Ontario Place",
      "Redway Road Staircase.jpg": "Redway Road Staircase",
      "Thomas Fisher Rare Book Library.jpg": "Thomas Fisher Rare Book Library",
      "Winter Garden Theatre.jpg": "Winter Garden Theatre",
    };
    if (!guesses[currentImageIndex]) {
      // Show the warning message, if there is no answer entered
      setShowSubmissionWarning(true);
      return;
    }

    const correctAnswer = correctAnswers[currentImage.src];
    const isCorrect =
      guesses[currentImageIndex].toLowerCase() === correctAnswer.toLowerCase();

    setAttempts(attempts + 1);

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      setVerdictMessage("You did it! Correct answer!");
    } else {
      setWrongCount(wrongCount + 1);
      setVerdictMessage("Oops, not quite right...");
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleRestart = () => {
    setAttempts(0);
    setCorrectCount(0);
    setWrongCount(0);
    setUsedImages([]);
    setVerdictMessage("");
  };

  const currentImageIndex = Images.findIndex(
    (img) => img.src === currentImage.src
  );

  const isGameOver = attempts >= 5;

  return (
    <div className="backImg">
      {isGameOver ? (
        <GameOver
          correctCount={correctCount}
          wrongCount={wrongCount}
          handleRestart={handleRestart}
        />
      ) : (
        <div className="card-container">
          <ImageCard
            src={currentImage.src}
            description={currentImage.description}
            hintVisible={hintVisible}
            setHintVisible={setHintVisible}
          />
          <InputSection
            value={guesses[currentImageIndex]}
            onChange={(value) => handleInputChange(currentImageIndex, value)}
            onKeyDown={handleInputKeyDown}
            disabled={isGameOver}
            showSubmissionWarning={showSubmissionWarning}
            handleSubmit={handleSubmit}
          />

          {!isGameOver && (
            <div>
              {verdictMessage && (
                <p className="game-description">{verdictMessage}</p>
              )}
              <p className="result-verdict">
                Right Answers: {correctCount}, &nbsp;&nbsp;&nbsp; Wrong Answers:{" "}
                {wrongCount}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GuessGame;
