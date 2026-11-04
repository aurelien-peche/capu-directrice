// Personnages, lexique et informations métier — jeu fictif
window.JEU = window.JEU || {};

JEU.persos = {
  karim:   {nom:"Karim Benali", role:"Directeur adjoint", age:41, principal:true, desc:"Très fiable, il connaît tout le monde. Il rêve de diriger un jour son propre magasin."},
  helene:  {nom:"Hélène Duroy", role:"Assistante de direction, RH et plannings", age:52, principal:true, desc:"La mémoire du magasin : 25 ans de maison. Franche, elle déteste les changements de planning de dernière minute."},
  sophie:  {nom:"Sophie Carpentier", role:"Responsable du rez-de-chaussée Beauté", age:45, principal:true, desc:"Experte et exigeante. Elle a du mal avec les nouveautés et se dispute souvent avec les vendeurs des marques."},
  ines:    {nom:"Inès Martel", role:"Responsable du 1er étage Mode", age:34, principal:true, desc:"Créative, toujours au courant des tendances. Elle oublie parfois les délais et les budgets."},
  theo:    {nom:"Théo Leclercq", role:"Conseiller de vente, beauté", age:22, principal:true, desc:"Excellent avec les clients… mais souvent en retard."},
  nadia:   {nom:"Nadia Hamdi", role:"Conseillère de vente, bijoux", age:38, principal:true, desc:"Rigoureuse et juste. Elle supporte mal le manque de sérieux."},
  franck:  {nom:"Franck Delmotte", role:"Chef de réserve", age:47, principal:true, desc:"Bourru mais au cœur d’or. Il sait toujours où se trouve un carton."},
  zoe:     {nom:"Zoé Lemoine", role:"Apprentie en BTS MCO", age:19, principal:true, desc:"Curieuse, un peu perdue. Elle prépare son BTS en alternance : une semaine à l’école, deux au magasin."},
  julien:  {nom:"Julien Masse", role:"Contrôleur de gestion", desc:"Pessimiste, toujours les chiffres en main."},
  bernard: {nom:"Bernard Fourny", role:"Responsable du 2e étage Maison", desc:"Calme, proche de la retraite."},
  lea:     {nom:"Léa Vasseur", role:"Responsable du 3e étage Épicerie", desc:"Passionnée de produits picards, impatiente."},
  chloe:   {nom:"Chloé Garnier", role:"Conseillère de vente, enfant", desc:"Maman de trois enfants, elle demande souvent à changer d’horaires."},
  camille: {nom:"Camille Royer", role:"Visuel merchandiser (vitrines)", desc:"Une artiste… qui dépasse souvent les délais."},
  manon:   {nom:"Manon Lefebvre", role:"Conseillère de vente, déco", desc:"Elle rêve de devenir visuel merchandiser."},
  mickael: {nom:"Mickaël Roger", role:"Réception des livraisons", desc:"Tatillon sur les bons de livraison."},
  martine: {nom:"Martine Leduc", role:"Retoucheuse", desc:"40 ans de maison."},
  sylvie:  {nom:"Sylvie Hénon", role:"Cheffe de caisse", desc:"La règle, c’est la règle."},
  jp:      {nom:"Jean-Pierre Lenoir", role:"Responsable sécurité", desc:"Ancien pompier."},
  hugo:    {nom:"Hugo Lambert", role:"Serveur au salon de thé", desc:"Étudiant à temps partiel."},
  vanessa: {nom:"Vanessa", role:"Conseillère de la marque Maison Solène", desc:"Payée par la marque de parfum, elle travaille dans le corner du rez-de-chaussée."},
  lemaire: {nom:"M. Lemaire", role:"Directeur des opérations, ton chef", desc:"Exigeant mais juste. Il attend +3 % de ventes et un rapport chaque lundi."},
  client:  {nom:"Une cliente", role:"Cliente du magasin", desc:""},
  narr:    {nom:"", role:"", desc:""}
};

// Mots du carnet : définition niveau 3e + exemple du magasin
JEU.lexique = {
  "ca":        {mot:"Chiffre d’affaires", def:"Tout l’argent encaissé grâce aux ventes, sur une période (un jour, un mois, un an).", ex:"Si tu vends 3 écharpes à 40 €, ton chiffre d’affaires est de 120 €."},
  "corner":    {mot:"Corner", def:"Un espace du magasin loué à une marque. La marque y met ses produits et ses propres vendeurs.", ex:"Le corner Maison Solène, au rez-de-chaussée, appartient à la marque de parfum."},
  "commission":{mot:"Commission", def:"La part des ventes d’une marque qui revient au magasin.", ex:"Maison Solène vend pour 10 000 € : avec 28 % de commission, le magasin touche 2 800 €."},
  "brief":     {mot:"Brief", def:"Une courte réunion du matin pour donner à l’équipe les objectifs et les infos du jour.", ex:"Tous les jours à 9 h, 10 minutes debout avant l’ouverture."},
  "objectif":  {mot:"Objectif", def:"Le résultat qu’on doit atteindre, fixé à l’avance par la direction.", ex:"Cette année, l’objectif est de vendre 3 % de plus que l’an dernier."},
  "evolution": {mot:"Évolution en %", def:"De combien un chiffre a augmenté ou baissé, rapporté au chiffre de départ. On calcule (nouveau − ancien) ÷ ancien × 100.", ex:"Passer de 100 € à 97 €, c’est une baisse de 3 %."},
  "masse":     {mot:"Masse salariale", def:"Le total de tous les salaires payés par le magasin.", ex:"Embaucher 4 saisonniers fait augmenter la masse salariale."},
  "saisonnier":{mot:"Saisonnier", def:"Une personne embauchée pour quelques semaines, pendant une période très chargée.", ex:"Avant Noël, beaucoup de magasins embauchent des étudiants en renfort."},
  "planning":  {mot:"Planning", def:"Le tableau qui dit qui travaille, quel jour et à quelles heures.", ex:"Hélène prépare le planning deux semaines à l’avance."},
  "stock":     {mot:"Stock", def:"Tous les produits que le magasin possède, en rayon ou en réserve. C’est comme le placard de la cuisine : trop plein, l’argent dort dedans ; vide, on ne peut plus vendre.", ex:"La réserve du sous-sol contient le stock de Noël."},
  "rupture":   {mot:"Rupture", def:"Quand un produit n’est plus disponible alors que des clients le demandent.", ex:"Plus un seul flacon du parfum star : c’est une rupture."},
  "pourcentage":{mot:"Pourcentage", def:"Une part sur 100. 8 % de 5 000, c’est 5 000 × 8 ÷ 100 = 400.", ex:"8 % des visiteurs achètent le parfum star."},
  "marge":     {mot:"Marge", def:"Prix de vente moins prix d’achat : ce que le magasin gagne vraiment sur un produit, avant de payer les salaires, l’électricité, le loyer…", ex:"Une guirlande achetée 25 € et vendue 50 € rapporte 25 € de marge."},
  "budget":    {mot:"Budget", def:"La somme d’argent prévue à l’avance pour une dépense.", ex:"Le budget des vitrines de Noël est de 3 000 €."},
  "cse":       {mot:"CSE", def:"Le comité social et économique : des salariés élus qui représentent le personnel auprès de la direction.", ex:"Avant d’ouvrir un dimanche, la directrice en discute avec le CSE."},
  "panier":    {mot:"Panier moyen", def:"Ce qu’un client dépense en moyenne. On divise le chiffre d’affaires par le nombre de tickets de caisse.", ex:"78 000 € pour 1 200 tickets : panier moyen de 65 €."},
  "transfo":   {mot:"Taux de transformation", def:"Sur 100 visiteurs, combien achètent vraiment quelque chose.", ex:"5 000 visiteurs et 1 200 acheteurs : 24 %."},
  "tresorerie":{mot:"Trésorerie", def:"L’argent disponible tout de suite sur le compte du magasin. C’est comme le porte-monnaie.", ex:"On peut avoir beaucoup vendu, mais si on doit payer les fournisseurs avant d’être payé, le porte-monnaie se vide."},
  "franchise": {mot:"Franchise", def:"Le magasin porte le nom d’une enseigne connue, mais il appartient à une autre société, qui reverse une partie de ses ventes à l’enseigne.", ex:"Ton magasin est franchisé : ton chef, M. Lemaire, travaille pour la société franchisée."}
};

// Les jauges du tableau de bord
JEU.jauges = {
  clients:{l:"Clients", def:"La satisfaction des clients : accueil, attente en caisse, produits disponibles."},
  equipe: {l:"Équipe", def:"Le moral et la motivation de tes salariés."},
  stock:  {l:"Stock", def:"Les bons produits, en bonne quantité, au bon moment. Trop bas = ruptures."},
  caisse: {l:"Caisse", def:"La santé financière : ventes, dépenses, respect des budgets."}
};

JEU.metier = {
  titre:"Le vrai métier de directrice de magasin",
  lignes:[
    ["Salaire au début","3 300 à 4 200 € brut par mois (source ONISEP)"],
    ["Horaires","Souvent de 7 h ou 8 h à 20 h, samedis travaillés"],
    ["Études","Au minimum bac+2 : BTS MCO. Puis BUT, licence pro ou école de commerce"],
    ["Parcours","Conseillère de vente → responsable de rayon → responsable d’étage → adjointe → directrice"],
    ["Qualités","Sens du commerce, goût des chiffres, écoute, sang-froid"]
  ]
};
