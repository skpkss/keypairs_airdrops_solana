# Code to get airdropped into an account of the user’s choice
## Solana Airdrop

 Install the required dependencies:

   ```bash
   npm install
   ```
Run the script by providing the Solana account address as a command-line argument:

   ```bash
   node index.js <account_address>
   ```
Replace `<account_address>` with the Solana account address where you want to send the airdrop.

 The script will generate a new wallet keypair, check its balance before and after the airdrop, and perform the airdrop.

## Example
```bash
node index.js your_solana_public_key
```
//This code is contributed by Saurabh Kaplas.
