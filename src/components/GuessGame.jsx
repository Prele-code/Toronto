import { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import InputSection from "./InputSection";
import GameOver from "./GameOver";
import "../index.css";

const Images = [
  {
    name: "Allan Gardens",
    description: "A conservatory and urban park located in the Garden District",
    src: "Allan Gardens.jpeg",
  },
  {
    name: "Bata Shoe Museum",
    description:
      "A museum displays over a thousand shoes and related artefacts",
    src: "Bata Shoe Museum.jpeg",
  },
  {
    name: "Berczy Park Fountain",
    description: "A fountain with one cat and 27 cast iron dog statues ",
    src: "Berczy Park Fountain.jpg",
  },
  {
    name: "Chester Hill Lookout",
    description: "Toronto's secret observation deck",
    src: "Chester Hill Lookout.jpg",
  },
  {
    name: "Crazy Doll House",
    description: "Toronto's life-sized dollhouse",
    src: "Crazy Doll House.jpg",
  },
  {
    name: "Cube House",
    description: "A one-of-a-kind home built with three tilted green boxes",
    src: "Cube House.jpg",
  },
  {
    name: "Gibraltar Point Lighthouse",
    description: "The oldest existing lighthouse on the Great Lakes",
    src: "Gibraltar Point Lighthouse.jpg",
  },
  {
    name: "Gooderham Building",
    description: "Once the head office of the Goodenham and Worts Distillery",
    src: "Gooderham Building.jpg",
  },
  {
    name: "Graffiti Alley",
    description: "A massive swath of vibrant street art",
    src: "Graffiti Alley.jpg",
  },
  {
    name: "Guild Inn",
    description: "Once a historic hotel in the Guildwood neighbourhood",
    src: "Guild Inn.jpg",
  },
  {
    name: "Half House",
    description: "An old Victorian-era row house on St. Patrick Street",
    src: "Half House.jpg",
  },
  {
    name: "Ireland Park",
    description:
      "A park honours the Irish immigrants who fled during the famine of 1847",
    src: "Ireland Park.jpeg",
  },
  {
    name: "Kensington Market",
    description: "A walkable bohemian neighbourhood",
    src: "Kensington Market.jpg",
  },
  {
    name: "Lower Bay Station",
    description: "The Ghost Station or the TTC experiment gone wrong",
    src: "Lower Bay Station.jpg",
  },
  {
    name: "North Toronto Station",
    description: "A former Canadian Pacific Railway station",
    src: "North Toronto Station.jpg",
  },
  {
    
    name: "Oculus Pavilion",
    description: "A space-age park shelter",
    src: "Oculus Pavilion.jpg",
  },
  {
    name: "Old City Hall",
    description: "A Romanesque-style civic building and court house",
    src: "Old City Hall.jpg",
  },
  {
    name: "Thomas Fisher Rare Book Library",
    description:
      "The largest repository of rare books and manuscripts in Canada",
    src: "Thomas Fisher Rare Book Library.jpg",
  },
  {
    name: "Redway Road Staircase",
    description: "A set of wooden stairs located in Leaside",
    src: "Redway Road Staircase.jpg",
  },
  {
    name: "Ontario Place",
    description: "An entertainment venue, event venue, and park in Toronto",
    src: "Ontario Place.jpg",
  },
  {
    name: "Winter Garden Theatre",
    description: "The world's last operating double-decker theatre complex",
    src: "Winter Garden Theatre.jpg",
  },
];

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
    const isCorrect = guesses[currentImageIndex].trim().toLowerCase() === correctAnswer.trim().toLowerCase();

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
