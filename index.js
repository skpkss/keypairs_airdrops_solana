// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");
const yargs = require('yargs');

// Connect to the Devnet
const connection = new Connection("http://127.0.0.1:8899", "confirmed");

// Create a new keypair
const newPair = new Keypair();

// Extract the public and private key from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

console.log("Public Key of the generated keypair", publicKey);

// Get the wallet balance from a given public key
const getWalletBalance = async (walletPublicKey) => {
    try {
        const walletBalance = await connection.getBalance(walletPublicKey);
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (walletPublicKey) => {
    try {
        // Request airdrop of 2 SOL to the specified wallet
        console.log("Airdropping some SOL to the wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            walletPublicKey,
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const mainFunction = async () => {
    const accountAddress = yargs.argv._[0];
    
    if (!accountAddress) {
        console.error("Missing account address. Please provide the account address using --account flag.");
        return;
    }
    
    const walletPublicKey = new PublicKey(accountAddress);
    await getWalletBalance(walletPublicKey);
    await airDropSol(walletPublicKey);
    await getWalletBalance(walletPublicKey);
};

mainFunction();
