const coordinatesFormater = (rawCoord) => {
    let splitted = rawCoord.split(",");
    let formatedCoord = {}
    if (splitted.length === 2) {
        formatedCoord = {
            x: parseFloat(splitted[0]),
            y: parseFloat(splitted[1])
        }
    }
    return formatedCoord;
};

export default coordinatesFormater;
