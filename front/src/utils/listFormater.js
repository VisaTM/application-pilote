const listFormater = (rawList) => {
  if (typeof rawList === "string") {
    return rawList.split(",");
  } else {
    return rawList;
  }
};

export default listFormater;
