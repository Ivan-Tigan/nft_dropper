const express = require('express');
const generateApiKey = require('generate-api-key');

const app = express();
const cfg = require('./../peppermint/config.json');
const Pool = require('pg').Pool
const pool = new Pool(cfg.dbConnection)

let api_secret = generateApiKey()


app.post('/request_nft', express.json(), (req,res) => {
	if (req.body.api_secret === api_secret){
		console.log("Received request to drop NFT: ", req.body);
		pool.query('insert into peppermint.operations (originator, command) values ($1,$2);', [req.body.pub, {
				handler: "nft",
				name: "create_and_mint",
				args: {
					token_id: req.body.token_id, // integer token id
					to_address: req.body.to_address , // Tezos address to which the NFT will be assigned
					metadata_ipfs: req.body.metadata_ipfs, // ipfs URI pointing to TZIP-16 metadata
					amount : 1 // (optional) integer amount of edition size to be minted
				}
		}]);

	}
})
app.listen(3123, function() {
	  console.log('NFT Dropper API is running.')
	  console.log('API Secret: ', api_secret)
})

