import React from "react";
import WordCloud from "./WordCloud";

const PublicGoogleSheetsParser = require("public-google-sheets-parser");
const spreadsheetId = "1xZI8pGk7S-JKS7urBUjSeWQSatTb9Rf_3Zm8EYmBH0M";
const parser = new PublicGoogleSheetsParser(spreadsheetId);

// 声明一个全局变量用于存储数据
const words = [];
let maxValue = null;

parser.parse().then((items) => {
  // 在异步操作完成后，将数据存储到 words 数组中
  words.push(...items);
  // console.log("globalData:", words); // 输出填充后的 words 数组

  // 使用 map 方法获取所有值的数组
  const valuesArray = words.map((dict) => dict.value);
  // console.log("valuesArray", valuesArray); // 输出包含所有值的数组

  // 计算最大值并存储在全局变量中
  // maxValue = Math.max(...valuesArray); //原本是取value最大值
  maxValue = valuesArray.length;
  // console.log("maxValue:", maxValue); // 输出最大值
});

console.log("globalData:", words); // 输出填充后的 words 数组
// 在这里访问 maxValue
console.log("maxValue outside:", maxValue);

// const words = [
//   { text: "retinol", value: 285870 },
//   { text: "serum", value: 48510 },
//   { text: "creme", value: 26170 },
//   { text: "rossmann", value: 18280 },
// ];
// console.log("words:", words);

// Sort words by value in descending order
words.sort((b, a) => b.value - a.value);
// Find the maximum value for reference in the color calculation
// const maxValue = Math.max(...words.map((word) => word.value));

console.log({ maxValue });

// Function to assign a color based on the word's value
const getShade = (value) => {
  // if (value === maxValue) {
  //   // Assign white to the most frequent word
  //   return "rgba(0, 0, 255, 1)";
  // } else {
  // Calculate random shade of green and red for other words
  const opacity = (value / maxValue) ** 0.07; // Adjust exponent for different shading effects
  const red = Math.floor(Math.random() * 255); // Random number between 0 and 255
  const green = Math.floor(Math.random() * 128); // Random number between 0 and 255
  return `rgba(${red}, ${green}, 255, ${opacity.toFixed(2)})`;
  // }
};

const onWordMouseOverCallback = (value) => {
  console.log(value);
  return true;
};

const callbacks = {
  getWordColor: (word) => getShade(word.value),
  onWordClick: (word) => {
    // 在这里添加你希望跳转的链接
    window.open(`${word.link}`, "_blank");
  },
  // onWordMouseOver: (word) => onWordMouseOverCallback(word.value),
  getWordTooltip: (word) => `${word.text} (${word.detail})`,
  // `${word.text} (${word.detail}) [${word.value > 50 ? "good" : "bad"}]`,
};

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [10, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  //padding: 1,
  rotations: 3,
  rotationAngles: [0, 0],
  scale: "sqrt", // sqrt, log, linear
  spiral: "rectangular", // archimedean, rectangular
  transitionDuration: 0,
};

const App = () => {
  return (
    <div>
      {/* <h1>Phrases</h1> */}
      <WordCloud words={words} options={options} callbacks={callbacks} />
    </div>
  );
};

export default App;
