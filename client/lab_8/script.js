function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// As the last step of your lab, hook this up to index.html
function restoArrayMake(dataArray) {
  // console.log('fired datahandler');
  // console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  return listItems;
  /* range.forEach((item) => {
      console.log('range item', item);
    }); */
}
