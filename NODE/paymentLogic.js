const express = require('express');
const bodyParser = require('body-parser');
const { authenticator } = require('otplib');
const axios = require('axios');
const app = express();
const port = 3002;

app.use(bodyParser.json());

// Simuler une base de données pour les utilisateurs et les cartes
const usersDB = {
  "user1": {
    username: "user1",
    password: "password123",  // Un mot de passe simple pour cet exemple
    totpSecret: authenticator.generateSecret(), // Clé secrète TOTP
    cardNumber: "4111111111111111", // Exemple de numéro de carte
  },
};

// Middleware pour vérifier l'authentification TOTP
const verifyTOTP = (req, res, next) => {
  const { username, totp } = req.body;
  const user = usersDB[username];

  if (!user) {
    return res.status(400).json({ error: "Utilisateur non trouvé" });
  }

  const isValid = authenticator.check(totp, user.totpSecret);
  console.log('totp', totp , 'secret', user.totpSecret)
  if (isValid) {
    return next();
  } else {
    return res.status(400).json({ error: "TOTP invalide" });
  }
};

// Endpoint pour générer un QR code pour la configuration de TOTP
app.get('/generate-qr/:username', (req, res) => {
  const { username } = req.params;
  const user = usersDB[username];

  if (!user) {
    return res.status(400).json({ error: "Utilisateur non trouvé" });
  }

  const otpAuthUrl = authenticator.keyuri(user.username, 'MyApp', user.totpSecret);
  return res.json({ qrCodeUrl: otpAuthUrl }); // Vous pouvez générer un QR code à partir de cette URL
});

// Endpoint pour simuler une transaction avec 3D Secure
app.post('/transaction', async (req, res) => {
  const { username, cardNumber, amount } = req.body;
  const user = usersDB[username];

  if (!user || user.cardNumber !== cardNumber) {
    return res.status(400).json({ error: "Carte invalide" });
  }

  try {
    // Simuler l'appel à l'API 3D Secure (ici on simule l'authentification 3D Secure)
    const response = await axios.post('https://mock-3d-secure-api.com/authenticate', {
      cardNumber: user.cardNumber,
      amount,
    });

    console.log(response.data)
    if (response.data.success) {
      return res.json({ message: 'Transaction réussie avec 3D Secure' });
    } else {
      return res.status(400).json({ error: 'Échec de l\'authentification 3D Secure' });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erreur avec l\'API 3D Secure' });
  }
});

// Endpoint pour initier l'authentification TOTP
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe dans la base de données
  const user = usersDB[username];

  // Vérification de l'existence de l'utilisateur et de la correspondance du mot de passe
  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }

  // Vérifier si l'utilisateur a déjà un secret TOTP
  if (!user.totpSecret) {
    // Si l'utilisateur n'a pas de secret TOTP, en générer un
    user.totpSecret = authenticator.generateSecret();  // Générer un secret TOTP
  }

  // Générer l'URL de l'authentification TOTP pour l'utilisateur
  const otpUrl = authenticator.keyuri(user.username, 'MyApp', user.totpSecret);

  // Renvoie un message de succès et l'URL TOTP pour l'application de l'utilisateur
  return res.json({
    message: "Authentification réussie. Entrez votre code TOTP",
    otpUrl
  });
});


// Lancer le serveur
app.listen(port, () => {
  console.log(`Micro-service TOTP et 3D Secure en cours d'exécution sur http://localhost:${port}`);
});
