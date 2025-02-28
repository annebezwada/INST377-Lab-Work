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

function createHtmlList(collection) {
  // console.table(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const { name } = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

function initMap(targetID) {
  const latLong = [38.784, -76.872];
  const map = L.map(targetID).setView(latLong, 13); // lat long zoom
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    }
  ).addTo(map);
  return map;
}

function addMapMarkers(map, collection) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });
  collection.forEach((item) => {
    const point = item.geocoded_column_1?.coordinates;
    console.log(item.geocoded_column_1?.coordinates);
    L.marker([point[1], point[0]]).addTo(map);
  });
}

function refreshList(target, storage) {
  target.addEventListener('click', async (event) => {
    event.preventDefault();
    localStorage.clear();
    const results = await fetch('/api/foodServicesPG');
    const arrayFromJson = await results.json();
    console.log(arrayFromJson);
    localStorage.setItem(storage, JSON.stringify(arrayFromJson.data));
    location.reload();
  });
}
// function inputListener(target) {
//   target.addEventListener('input',async (event) => {
//     console.log(event.target.value);
//     const selectResto = storedDataArray.filter((item) => {
//       const lowerName = item.name.toLowerCase();
//       const lowerValue = event.target.value.toLowerCase();
//       return lowerName.includes(lowerValue);
//     });
//     console.log(selectResto);
//     createHtmlList(selectResto);
//   });
// }
async function mainEvent() {
  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // change this selector to match the id or classname of your actual form
  const submit = document.querySelector('.submit_button');

  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  const refresh = document.querySelector('#refresh_list');

  const map = initMap('map');
  const retrievalVar = 'restaurants';
  submit.style.display = 'none';

  refreshList(refresh, retrievalVar);

  const storedDataString = localStorage.getItem(retrievalVar);
  const storedDataArray = JSON.parse(storedDataString);
  console.log(storedDataArray);
  if (storedDataArray?.length > 0) {
    // this statement is to prevent a race condition on data load
    submit.style.display = 'block';

    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);

      if (currentArray.length < 1) {
        return;
      }
      const selectResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });
      console.log(selectResto);
      createHtmlList(selectResto);
    });

    zipcode.addEventListener('input', async (event) => {
      console.log(event.target.value);
      if (currentArray.length < 1) {
        return;
      }
      const selectResto = currentArray.filter((item) => {
        const lowerzip = item.zip.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerzip.includes(lowerValue);
      });
      console.log(selectResto);
      createHtmlList(selectResto);
    });
    // inputListener(resto);
    form.addEventListener('submit', async (submitEvent) => {
      // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"
      currentArray = restoArrayMake(storedDataArray);
      console.log(currentArray);
      createHtmlList(currentArray);
      addMapMarkers(map, currentArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
