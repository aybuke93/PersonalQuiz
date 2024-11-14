import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import UserProvider from "./components/UserContext";
import Question from "./components/Question";
import UserForm from "./components/UserForm";
import Results from "./components/Results";

export default function App() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What's your favorite animal?",
      options: ["Dog", "Bird", "Cat", "Horse"],
    },
    {
      question: "What's your favorite season?",
      options: ["Winter", "Autumn", "Summer", "Spring"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Dog": "Fire",
    "Bird": "Water",
    "Cat": "Earth",
    "Horse": "Air",
    "Summer": "Fire",
    "Winter": "Water",
    "Spring": "Earth",
    "Autumn": "Air",
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
    navigate("/quiz");
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach((answer) => {
      const element = elements[answer];
      if (element) {
        counts[element] = (counts[element] || 0) + 1;
      }
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  }

  const accessKey = '7aajXBfzWZmggW_dlFjbKfStHTr9HF4gvlUq1yD2YP0'; 


  function fetchArtwork(elementKeyword) {
    fetch(`https://api.unsplash.com/photos/random?query=${elementKeyword}&client_id=${accessKey}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setArtwork(data); 
        } else {
          console.log("No artwork found for this keyword.");
          setArtwork(null);
        }
      })
      .catch(error => console.error('Error:', error));
  }
  
  
  

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);

      navigate("/results");
    }
  }, [currentQuestionIndex, answers, navigate]);

  return (
    <UserProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
          <Route path="/results" element={<Results element={element} artwork={artwork} />} />
        </Routes>
      </div>
    </UserProvider>
  );
}
