const linksFormater = (rawLinks) => {
    const flattened = [].concat(...rawLinks) // rawlinks can be a array of arrays so we need to flatten it
    
    return flattened.map( link => {
        const splitted = link["Link"].split(" - ")
        return {
            source: splitted[0],
            target: splitted[1],
            strength: link["Strength"]
        }
    })
};

export default linksFormater;
