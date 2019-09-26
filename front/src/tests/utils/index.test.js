import listFormater from '../../utils/listFormater';
import linksFormater from '../../utils/linksFormater';
import frequencyFormater from '../../utils/frequencyFormater';
import coordinatesFormater from '../../utils/coordinatesFormater';




describe('utils', () => {
  it('should return a formated list of terms or sources', () => {
    const notFormated = '000027,000080,000196,000517,000623,000634';
    const expectedFormated = [
      '000027',
      '000080',
      '000196',
      '000517',
      '000623',
      '000634'
    ];
    expect(listFormater(notFormated)).toEqual(expectedFormated)
  });


  it('should return a formated list of links', () => {
    const notFormated = [
      {
        "Link": "000001 - 000009",
        "Strength": 0.1513
      },
      {
        "Link": "000009 - 000015",
        "Strength": 0.1498
      }
    ];

    const expectedFormated = [
      {
        source: "000001",
        target: "000009",
        strength: 0.1513
      },
      {
        source: "000009",
        target: "000015",
        strength: 0.1498
      }
    ];
    expect(linksFormater(notFormated)).toEqual(expectedFormated)
  });

  it('should return a formated frequency', () => {
    const notFormated = '5/6';
    const expectedFormated = {
      current: 5,
      total: 6
    };
    expect(frequencyFormater(notFormated)).toEqual(expectedFormated)
  });


  it('should return formated cluster coordinates', () => {
    const notFormated = '0.031,0.044';
    const expectedFormated = {
      x: 0.031,
      y: 0.044
    };
    expect(coordinatesFormater(notFormated)).toEqual(expectedFormated)
  });

});
