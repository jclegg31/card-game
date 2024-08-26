//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
//example of using the Fetch API to interact with a REST API.

document.querySelector('button').addEventListener('click', getFetch);

function getFetch() {
  const choice = document.querySelector('input').value.toLocaleLowerCase();
  const url = `https://api.nasa.gov/planetary/apod?api_key=Nxg0X9SnM8FJL8qme2YopiAogmb4rFeDabh7uC5p&date=${choice}`;

  fetch(url)
    .then((res) => res.json()) //parse response as JSON
    .then((data) => {
      console.log(data);
      if (data.media_type === 'image') {
        document.querySelector('img').src = data.hdurl;
      } else if (data.media_type === 'video') {
        document.querySelector('iframe').src = data.url;
      }

      document.querySelector('h3').innerText = data.explanation;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
