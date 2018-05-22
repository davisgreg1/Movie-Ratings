const limitOverview = str => {
  let strArr = str.split(" ");
  if (!strArr.length) {
    return `Sorry, no information available`;
  }
  if (strArr.length <= 40) {
    return strArr.join(" ");
  }
  if (strArr.length > 40) {
    strArr.length = 40;
    return strArr.join(" ") + "...";
  }
};

const addCommas = num => {
  if (String(num).length < 4) {
    return num;
  }
  let reverseNumToStr = String(num)
    .split("")
    .reverse();
  for (let i = 1; i < reverseNumToStr.length; i++) {
    if (i % 3 === 0) {
      reverseNumToStr[i] = reverseNumToStr[i] + ",";
    }
  }
  return reverseNumToStr.reverse().join("");
};
export { limitOverview, addCommas };
