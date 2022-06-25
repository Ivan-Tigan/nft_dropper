let f = document.forms.f.elements


let html5QrcodeScanner = new Html5QrcodeScanner("reader",{ fps: 0.3, qrbox: {width: 250, height: 250} },/* verbose= */ false);
html5QrcodeScanner.render((decodedText, _) => {
  //Free Sound Effect acquired at https://www.freesoundslibrary.com/success-sound-effect/
  // Idea is to give feedback to whoever is trying to scan the public key
  (new Audio('https://reckless.mypinata.cloud/ipfs/QmR9Sy3gePu1LGGJMCxzKKfqLo6N3ZzywTmDJsFPvc2E5X')).play()  
  fetch(f.minter_url.value, 
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pub: f.pub.value,
          token_id: Math.abs(Math.floor(Math.random() * 9007199254740991)),
          to_address: decodedText,
          metadata_ipfs: f.metadata_uri.value,
          api_secret:f.api_secret.value
        })
    }
    ).then(_ => document.getElementById("t").innerHTML = "NFT minted")

});