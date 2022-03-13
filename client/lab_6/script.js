function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin
  ); // The maximum is inclusive and the minimum is inclusive
}

// TODO: Use range to return random item from collection/array
function dataHandler(dataArray) {
  console.log('fired dataHandler');
  console.table(dataArray); // this is called dot notation
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum]; 
  });

// As the last step of your lab, hook this up to index.html

async function mainEvent() { // the async keyword means we can make API requests
  console.log('form submission'); // this is substituting for a "breakpoint"
  const form = document.querySelector('.main_form');
  const submit = documentquerySelector('.submit_button');
  submit.style.display = 'none'; // it's better not to display this until the data has loaded

  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson); 
  if (arrayFromJson.data.length > 0) {
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      console.log('form submission');
      submit.style.display = 'block';
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need

      dataHandler(arrayFromJson.data);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests