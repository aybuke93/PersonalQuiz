import React from "react";

export default function Question({ question, options, onAnswer }) {
  return (
    <div>
      <h2>{question}</h2>
      {options.map(function (option) {
        return (
          <button
            key={option}
            onClick={function () {
              onAnswer(option);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

//Not:The question component will display each quiz question and its corresponding options. 
// You'll pass in question, options, and onAnswer as an argument, and we're going to use the JavaScript .map() method to display the question options.