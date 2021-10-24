
export default function getImageAleatoirApi() {
    const url = 'https://coffee.alexflipnote.dev/random.json'
    return fetch(url)
    .then((response)=> response.json)
    .catch((err)=>{ console.log(err)})
  }
