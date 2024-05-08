import React from "react";
import ReactWordcloud from "react-wordcloud";

const WordCloud = ({ words, options, callbacks }) => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactWordcloud words={words} options={options} callbacks={callbacks} />
    </div>
  );
};

export default WordCloud;
