const frequencyFormater = (rawFreq) => {
  if (typeof rawFreq === "string") {
    let formatedFreq = {}
    let splitted = rawFreq.split("/");
    if (splitted.length === 2) {
      formatedFreq = {
        current: parseFloat(splitted[0]),
        total: parseFloat(splitted[1])
      }
    }
    return formatedFreq;
  } else {
    return rawFreq;
  }
};

export default frequencyFormater;
