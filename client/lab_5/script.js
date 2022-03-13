// As the last step of your lab, hook this up to index.html

async function mainEvent() { // the async keyword means we can make API requests
  console.log('form submission'); // this is substituting for a "breakpoint"
  const form = document.querySelector('.main_form');
  const submit = documentquerySelector('.submit_button');
  submit.style.display = 'none'; // it's better not to display this until the data has loaded

  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
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