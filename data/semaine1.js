// Semaine 1 — 16 au 21 novembre 2026 — « Les vitrines de Noël »
window.JEU = window.JEU || {};
JEU.semaines = JEU.semaines || [];

JEU.semaines.push({
num:1, titre:"Les vitrines de Noël",
jours:[

/* ===================== LUNDI ===================== */
{id:"s1j1", date:"2026-11-16", ouvre:"2026-11-04", court:"Lun", titre:"Premier jour",
fin:"Premier jour réussi ! Demain, Julien, le contrôleur de gestion, vient te présenter les chiffres de l’année. Prépare-toi : il est rarement de bonne humeur.",
scenes:[
 {type:"recit", qui:"narr", heure:"Lundi · 8 h 00", mot:"franchise",
  texte:"Bonjour {p} ! Aujourd’hui, tu deviens la directrice des **Galeries Lafayette d’Amiens**, rue des Trois-Cailloux. Le bâtiment date de 1927, en style Art déco.\n\nTon magasin est une [[franchise|franchise]] : il porte le nom de l’enseigne, mais il appartient à une autre société. Ton chef, c’est M. Lemaire."},
 {type:"recit", qui:"karim", heure:"8 h 05",
  texte:"« Bienvenue, {p} ! Je suis Karim, ton adjoint. Ici, tu as 40 salariés, 4 étages et environ 60 vendeurs des marques.\n\nGros rendez-vous cette semaine : **samedi 21 novembre, on inaugure les vitrines de Noël.** C’est l’un des plus gros jours de l’année. »"},
 {type:"choix", qui:"karim", resume:"Ma première heure",
  texte:"« Il reste une heure avant le brief de 9 h. Par quoi veux-tu commencer ? »",
  choix:[
   {t:"Faire le tour des 4 étages avec Karim", court:"Tour des étages", fx:{equipe:4}, rel:{karim:1}, set:{tour:true},
    retour:"Karim te montre tout : la beauté au rez-de-chaussée, la mode au 1er, la maison au 2e, l’épicerie fine et le salon de thé au 3e, avec son toit-terrasse. Les salariés sont contents de te voir."},
   {t:"M’installer au bureau pour lire les chiffres", court:"Lecture des chiffres", fx:{equipe:-4, caisse:2}, set:{chiffres:true},
    retour:"Tu comprends vite où en sont les ventes. Mais en bas, on murmure : « La nouvelle directrice ne dit même pas bonjour ? » Une vraie directrice passe environ 60 % de son temps dans les rayons."},
   {t:"Saluer chaque salarié un par un", court:"Bonjour à chacun", fx:{equipe:7}, set:{retardBrief:true},
    retour:"Tout le monde est touché. Mais à 8 h 58, tu n’as pas préparé ton brief…"}
  ]},
 {type:"choix", qui:"sophie", heure:"8 h 40", resume:"Le problème du corner", mot:"corner",
  texte:"Au rez-de-chaussée, Sophie t’arrête : « Les vendeuses du [[corner|corner]] Maison Solène mangent leur sandwich dans le corner, devant les clients ! Et je ne peux rien leur dire : elles ne sont même pas nos salariées. »",
  choix:[
   {t:"Je vais voir Vanessa, la conseillère de la marque, tout de suite", court:"Je parle à la marque", fx:{clients:2}, rel:{sophie:1},
    retour:"Vanessa s’excuse : leur salle de pause est trop loin. Tu lui rappelles les règles : on ne mange pas devant les clients.\n\nÀ retenir : les vendeurs des marques sont payés par leur marque, mais ils doivent suivre les règles du magasin. C’est la directrice qui les fait respecter."},
   {t:"Sophie, c’est ton étage : règle ça toi-même", court:"Je laisse Sophie gérer", fx:{equipe:-2}, rel:{sophie:-1},
    retour:"Sophie soupire. Elle n’a aucune autorité sur ces vendeuses. À midi, la dispute recommence."},
   {t:"J’écrirai à la marque cette semaine", court:"Courrier à la marque", fx:{equipe:-1}, set:{courrierMarque:true},
    retour:"C’est correct, mais lent. Sophie aurait aimé que tu réagisses plus vite."}
  ]},
 {type:"recit", qui:"narr", heure:"9 h 00", mot:"brief",
  texte: s => (s.flags.retardBrief ? "Tu arrives en courant dans la salle de pause. 15 personnes t’attendent déjà.\n\n" : "L’équipe t’attend dans la salle de pause, au sous-sol.\n\n") + "C’est l’heure du [[brief|brief]] : 10 minutes debout, avant l’ouverture, pour donner le cap de la journée."},
 {type:"choix", qui:"narr", resume:"Mon premier brief",
  texte:"Tout le monde te regarde. Que dis-tu ?",
  choix:[
   {t:"« Notre objectif : réussir le samedi des vitrines de Noël. »", court:"Objectif : les vitrines", fx:{equipe:3}, set:{briefObjectif:true},
    retour:"Clair et précis : tout le monde sait où on va."},
   {t:"« Avant de décider, je veux vous écouter. Venez me voir. »", court:"Je veux vous écouter", fx:{equipe:5}, rel:{helene:1}, set:{ecoute:true},
    retour:"L’équipe apprécie. Hélène te glisse : « Ça faisait longtemps qu’on ne nous avait pas demandé notre avis. »"},
   {t:"« Les ventes sont en retard. Il va falloir se bouger. »", court:"Il faut se bouger", fx:{equipe:-5}, rel:{karim:-1}, set:{briefDur:true},
    retour:"Silence gêné. C’est peut-être vrai, mais le premier jour, ça inquiète. Éric, au rayon jean, lève les yeux au ciel."}
  ]},
 {type:"libre", qui:"narr", resume:"Ma phrase pour motiver l’équipe",
  texte:"Termine ton brief avec une phrase à toi pour motiver ton équipe.",
  placeholder:"Par exemple : « Ensemble, on va… »",
  retour:"Quelques sourires dans la salle. Karim lève le pouce."},
 {type:"recit", qui:"helene", heure:"11 h 00",
  texte:"Hélène t’apporte les ventes de samedi dernier, étage par étage :\n\nRez-de-chaussée : 21 400 €\n1er étage : 18 900 €\n2e étage : 7 300 €\n3e étage : 4 400 €"},
 {type:"calcul", qui:"helene", resume:"Total des ventes de samedi", mot:"ca",
  texte:"« Tu peux me donner le [[ca|chiffre d’affaires]] total du magasin pour samedi ? M. Lemaire le demande. »",
  reponse:52000, unite:"€",
  indice:"Additionne les quatre étages : 21 400 + 18 900 + 7 300 + 4 400.",
  explication:"21 400 + 18 900 + 7 300 + 4 400 = **52 000 €**. C’est le chiffre d’affaires de la journée : tout l’argent encaissé grâce aux ventes."},
 {type:"qcm", qui:"helene", resume:"Part du rez-de-chaussée", mot:"pourcentage",
  texte:"« Et quel étage vend le plus ? Il pèse combien dans le total, à peu près ? »",
  options:["Le 1er étage, environ 36 %","Le rez-de-chaussée, environ 41 %","Le rez-de-chaussée, environ 21 %","Le 3e étage, environ 8 %"], bonne:1,
  indice:"Divise les ventes de l’étage par le total (52 000 €), puis multiplie par 100.",
  explication:"21 400 ÷ 52 000 ≈ 0,41, soit **41 %**. Le rez-de-chaussée Beauté pèse lourd : c’est là que se trouvent les parfums, les produits les plus vendus à Noël."}
]},

/* ===================== MARDI ===================== */
{id:"s1j2", date:"2026-11-17", ouvre:"2026-11-05", court:"Mar", titre:"Les chiffres de l’année",
fin:"Demain matin, très tôt, une livraison importante arrive : le parfum star de Noël.",
scenes:[
 {type:"recit", qui:"julien", heure:"Mardi · 9 h 30",
  texte:"Julien, le contrôleur de gestion, pose un tableau sur ton bureau :\n\n« Depuis le 1er janvier, on a vendu pour **12,6 millions d’euros**. L’an dernier, à la même date : **12,85 millions**. »"},
 {type:"qcm", qui:"julien", resume:"Évolution des ventes", mot:"evolution",
  texte:"« À ton avis, quelle est l’[[evolution|évolution]] de nos ventes par rapport à l’an dernier ? »",
  options:["Environ −0,25 %","Environ −2 %","Environ −25 %","Environ +2 %"], bonne:1,
  indice:"On calcule (nouveau − ancien) ÷ ancien × 100. Commence par la soustraction : 12,6 − 12,85.",
  explication:"(12,6 − 12,85) ÷ 12,85 × 100 ≈ **−1,9 %**, donc environ −2 %.\n\nAttention au piège : la différence est de 0,25 million, mais en pourcentage, c’est presque 2 %."},
 {type:"recit", qui:"julien", mot:"objectif",
  texte:"« Et l’[[objectif|objectif]] de M. Lemaire, c’est **+3 %**. Il reste 6 semaines, dont Noël. C’est là qu’on fait une grosse partie des ventes de l’année. »"},
 {type:"recit", qui:"helene", heure:"10 h 30", mot:"saisonnier",
  texte:"Hélène entre : « Pour Noël, il nous faudrait des [[saisonnier|saisonniers]], comme chaque année. »\n\nJulien soupire : « Ça va encore faire monter la [[masse|masse salariale]]. »"},
 {type:"calcul", qui:"julien", resume:"Coût de 4 saisonniers", mot:"masse",
  texte:"« Un saisonnier travaille 35 heures par semaine, payé 12,50 € de l’heure. Combien coûtent 4 saisonniers pendant 4 semaines ? »",
  reponse:7000, unite:"€",
  indice:"Un saisonnier pendant une semaine : 35 × 12,50. Multiplie ensuite par 4 saisonniers, puis par 4 semaines.",
  explication:"35 × 12,50 = 437,50 € par semaine. × 4 saisonniers × 4 semaines = **7 000 €**.\n\nEn vrai, l’entreprise paie aussi des cotisations en plus du salaire : le coût réel est encore plus élevé."},
 {type:"choix", qui:"narr", resume:"Les saisonniers de Noël",
  texte:"Hélène et Julien te regardent. C’est toi qui décides.",
  choix:[
   {t:"J’embauche 4 saisonniers", court:"4 saisonniers", fx:{caisse:-6, equipe:5, clients:3}, rel:{helene:1}, set:{saisonniers:4},
    retour:"Hélène est soulagée. Julien note la dépense, l’air sombre. Les caisses seront moins chargées à Noël."},
   {t:"J’en embauche 2", court:"2 saisonniers", fx:{caisse:-3, equipe:2}, set:{saisonniers:2},
    retour:"Un compromis : moins de dépenses, un peu d’aide. Samedi, ça risque d’être juste en caisse."},
   {t:"Aucun : on se débrouille", court:"Aucun saisonnier", fx:{caisse:2, equipe:-6}, rel:{helene:-1}, set:{saisonniers:0},
    retour:"Julien est content. Hélène beaucoup moins : « Le samedi des vitrines, on va courir partout. »"}
  ]},
 {type:"recit", qui:"chloe", heure:"14 h 00", mot:"planning",
  texte:"Chloé, conseillère au rayon enfant, frappe à ta porte :\n\n« Samedi, c’est le spectacle de Noël de mon fils, à l’école. Est-ce que je peux ne pas venir ? »\n\nSamedi, c’est le jour des vitrines. Le [[planning|planning]] est déjà fait."},
 {type:"choix", qui:"chloe", resume:"La demande de Chloé",
  texte:"Que réponds-tu à Chloé ?",
  choix:[
   {t:"D’accord, profite du spectacle", court:"Oui", fx:{equipe:2}, set:{chloeAbsente:true},
    retour:"Chloé te remercie mille fois. Mais samedi, le rayon enfant sera en sous-effectif."},
   {t:"Non, désolée : samedi, tout le monde est là", court:"Non", fx:{equipe:-4}, set:{chloeRefus:true},
    retour:"Chloé repart les larmes aux yeux. La nouvelle fait vite le tour de l’équipe."},
   {t:"Trouve quelqu’un pour échanger ta journée, et je valide", court:"Un échange de journée", fx:{equipe:3}, rel:{helene:1}, set:{chloeEchange:true},
    retour:"Hugo, l’étudiant du salon de thé, accepte d’échanger. Hélène modifie le planning.\n\nC’est souvent la meilleure solution : la directrice fixe les règles, l’équipe trouve l’arrangement."}
  ]},
 {type:"recit", qui:"zoe", heure:"17 h 30",
  texte:"Zoé, l’apprentie, t’attend devant ton bureau :\n\n« Je peux te poser une question ? J’aimerais bien faire ton métier un jour. Comment on devient directrice ? »"},
 {type:"recit", qui:"narr", bouton:"Continuer",
  texte:"Tu lui expliques : on ne devient jamais directrice à la sortie de l’école.\n\nIl faut au moins un **bac+2**, comme le BTS MCO que prépare Zoé. Ensuite, on monte les marches : conseillère de vente, responsable de rayon, responsable d’étage, adjointe, puis directrice.\n\nUne vraie directrice des Galeries Lafayette a mis près de 30 ans pour faire ce parcours !"},
 {type:"libre", qui:"zoe", resume:"Mon conseil à Zoé",
  texte:"« Et toi, quel conseil tu me donnerais pour réussir ? »",
  placeholder:"Mon conseil, c’est…",
  retour:"Zoé note ton conseil dans son carnet. « Merci, je vais m’en souvenir ! »"}
]},

/* ===================== MERCREDI ===================== */
{id:"s1j3", date:"2026-11-18", ouvre:"2026-11-06", court:"Mer", titre:"Le parfum star",
fin:"Demain : un retard de trop au rez-de-chaussée…",
scenes:[
 {type:"recit", qui:"mickael", heure:"Mercredi · 7 h 05",
  texte:"Au quai de livraison, Mickaël vérifie le bon de livraison :\n\n« Maison Solène devait livrer **100 cartons** de son parfum star pour Noël. Il n’y en a que **60**. »\n\nFranck, le chef de réserve, râle déjà."},
 {type:"calcul", qui:"franck", resume:"Flacons reçus", mot:"stock",
  texte:"« Chaque carton contient 6 flacons. Ça nous fait combien de flacons en [[stock|stock]] ? »",
  reponse:360, unite:"flacons",
  indice:"60 cartons × 6 flacons.",
  explication:"60 × 6 = **360 flacons**."},
 {type:"calcul", qui:"julien", resume:"Flacons nécessaires samedi", mot:"rupture",
  texte:"Julien a fait ses prévisions : « Samedi, on attend 5 000 visiteurs. L’an dernier, 8 % des visiteurs du samedi des vitrines ont acheté ce parfum. Combien de flacons faudrait-il ? »",
  reponse:400, unite:"flacons",
  indice:"8 % de 5 000, c’est 5 000 × 8 ÷ 100.",
  explication:"5 000 × 8 ÷ 100 = **400 flacons**. Tu en as 360 : il en manque 40.\n\nSamedi après-midi, ce sera la [[rupture|rupture]] : plus de parfum alors que des clients le demandent."},
 {type:"choix", qui:"narr", resume:"Le parfum manquant",
  texte:"Il manque 40 flacons pour samedi. Que fais-tu ?",
  choix:[
   {t:"J’appelle la marque pour avoir une livraison express", court:"J’appelle la marque", set:{appelMarque:true},
    retour:"Le responsable régional de Maison Solène accepte d’envoyer des cartons jeudi… à une condition : avoir le meilleur emplacement pour Noël, à l’entrée du magasin, à la place du corner Atelier Vétiver."},
   {t:"Je mets un autre parfum en avant dans la vitrine", court:"Un autre parfum en vitrine", fx:{clients:-1}, rel:{sophie:1}, set:{autreParfum:true},
    retour:"Sophie propose Atelier Vétiver : « Il sent très bon, et on ne le met jamais en avant. » Les clients qui ne trouveront plus Maison Solène auront une autre idée de cadeau."},
   {t:"Je limite à 1 flacon par client", court:"1 flacon par client", fx:{clients:-3}, set:{limite:true},
    retour:"Les 360 flacons dureront plus longtemps. Mais les clients qui voulaient en offrir plusieurs seront déçus."}
  ]},
 {type:"choix", qui:"sophie", resume:"La condition de Maison Solène", si: s => s.flags.appelMarque,
  texte:"Sophie est furieuse : « Déplacer Atelier Vétiver ? Ils vont nous détester ! »\n\nDans un grand magasin, l’emplacement d’un corner, c’est de l’argent : à l’entrée, on vend beaucoup plus.",
  choix:[
   {t:"J’accepte : on déplace Atelier Vétiver", court:"J’accepte", fx:{stock:8}, rel:{sophie:-2}, set:{express:true, vetiverFache:true},
    retour:"15 cartons arriveront jeudi : 90 flacons de plus. Mais Atelier Vétiver est mécontent, et Sophie aussi."},
   {t:"Je refuse et je trouve une autre solution", court:"Je refuse", rel:{sophie:1}, set:{autreParfum:true},
    retour:"Tu gardes la confiance d’Atelier Vétiver. Sophie propose de le mettre en avant dans la vitrine pour compenser."},
   {t:"Je négocie : l’entrée du magasin seulement jusqu’à dimanche", court:"Je négocie", fx:{stock:5}, rel:{sophie:-1}, set:{express:true},
    retour:"La marque accepte d’envoyer 10 cartons au lieu de 15, soit 60 flacons. Atelier Vétiver retrouvera sa place lundi.\n\nBien joué : négocier, c’est une grande partie du métier."}
  ]},
 {type:"recit", qui:"client", heure:"15 h 00",
  texte:"Mme Dufour, cliente fidèle depuis 30 ans, est furieuse à l’accueil : sa robe devait être retouchée pour aujourd’hui.\n\nMais Martine, la retoucheuse, est malade depuis lundi."},
 {type:"choix", qui:"client", resume:"La cliente mécontente",
  texte:"« C’est inadmissible ! J’ai un mariage samedi ! »",
  choix:[
   {t:"Retouche offerte, un thé au salon de thé et une nouvelle date", court:"Geste commercial", fx:{clients:5, caisse:-1},
    retour:"Mme Dufour sourit enfin. Un geste commercial coûte un peu, mais une cliente fidèle rapporte beaucoup pendant des années."},
   {t:"Je m’excuse et je donne une nouvelle date", court:"Excuses et nouvelle date", fx:{clients:-2},
    retour:"Elle repart, pas convaincue : « Avant, c’était mieux ! »"},
   {t:"Je fais faire la retouche chez une couturière du quartier", court:"Couturière du quartier", fx:{clients:3, caisse:-2},
    retour:"La robe sera prête demain. Ça coûte 25 € au magasin, mais Mme Dufour aura sa robe pour le mariage."}
  ]}
]},

/* ===================== JEUDI ===================== */
{id:"s1j4", date:"2026-11-19", ouvre:"2026-11-07", court:"Jeu", titre:"Un retard de trop",
fin:"Demain : dernière ligne droite avant l’inauguration des vitrines.",
scenes:[
 {type:"recit", qui:"nadia", heure:"Jeudi · 10 h 05",
  texte:"Le magasin a ouvert à 10 h. Nadia vient te voir, énervée :\n\n« Théo n’est toujours pas là. C’est la troisième fois ce mois-ci ! Je ne peux pas tenir les bijoux et les parfums en même temps. »"},
 {type:"recit", qui:"theo", heure:"10 h 25",
  texte:"Théo arrive essoufflé : « Désolé ! Mon bus a encore été en retard… Chez moi, il n’y en a qu’un toutes les 30 minutes. »"},
 {type:"choix", qui:"narr", resume:"Le retard de Théo",
  texte:"Nadia attend de voir ce que tu vas faire. Théo aussi.",
  choix:[
   {t:"Je le reçois seul à seul, calmement, pour trouver une solution", court:"Entretien seul à seul", fx:{equipe:2}, rel:{theo:1, nadia:1}, set:{entretienTheo:true},
    retour:"Tu l’emmènes dans ton bureau, porte fermée. Règle d’or : on ne recadre jamais quelqu’un devant ses collègues."},
   {t:"Je lui donne un avertissement écrit, tout de suite", court:"Avertissement écrit", fx:{equipe:-2}, rel:{theo:-2, nadia:1}, set:{avertissement:true},
    retour:"C’est une vraie sanction, inscrite dans son dossier. Nadia trouve ça juste. Théo est blessé : il a l’impression d’être traité comme un tricheur."},
   {t:"Je laisse passer : c’est bientôt Noël", court:"Je laisse passer", fx:{equipe:-3}, rel:{nadia:-2}, set:{laisse:true},
    retour:"Théo est soulagé. Nadia, elle, est furieuse : « Donc les règles, c’est seulement pour certains ? »"}
  ]},
 {type:"libre", qui:"theo", resume:"Ce que je dis à Théo", si: s => s.flags.entretienTheo,
  texte:"Théo s’assoit en face de toi. Qu’est-ce que tu lui dis ?",
  placeholder:"Théo, je voulais te voir parce que…",
  retour:"Théo t’écoute sans t’interrompre. « Je comprends. Je ne veux pas laisser Nadia seule. »"},
 {type:"choix", qui:"theo", resume:"La solution pour Théo", si: s => s.flags.entretienTheo,
  texte:"Il reste à trouver une solution concrète.",
  choix:[
   {t:"Je décale ses horaires : 10 h 30 - 19 h 30", court:"Horaires décalés", rel:{theo:1}, set:{horairesTheo:true},
    retour:"Hélène adapte le planning, et le problème des retards est réglé.\n\nLes horaires peuvent s’adapter, mais dans les limites du droit du travail : dans les grands magasins, pas plus de 9 heures de travail par jour."},
   {t:"Il prend le bus d’avant, et on refait le point dans 2 semaines", court:"Bus d’avant, point dans 2 semaines", set:{suiviTheo:true},
    retour:"C’est clair pour tout le monde. Théo sait que tu comptes sur lui."}
  ]},
 {type:"calcul", qui:"helene", resume:"Heures de travail sur une journée",
  texte:"Hélène prépare le planning de samedi : « Un conseiller qui travaille de 10 h 30 à 19 h 30, avec 1 heure de pause déjeuner, ça fait combien d’heures de travail ? »",
  reponse:8, unite:"heures",
  indice:"De 10 h 30 à 19 h 30, il y a 9 heures. Il faut enlever la pause.",
  explication:"19 h 30 − 10 h 30 = 9 h, moins 1 h de pause = **8 heures** de travail. C’est bien sous la limite de 9 heures par jour."},
 {type:"recit", qui:"lemaire", heure:"15 h 00 · Téléphone", mot:"cse",
  texte:"M. Lemaire, ton chef, t’appelle :\n\n« {p}, pour rattraper les −2 %, je veux qu’on ouvre le **dimanche 6 décembre**. Parles-en au [[cse|CSE]]. »"},
 {type:"calcul", qui:"julien", resume:"Coût des salaires du dimanche",
  texte:"Julien fait le calcul : « Le dimanche, les salaires sont payés double. Il faut 20 salariés pendant 7 heures, payés 13 € de l’heure en temps normal. Combien coûtent les salaires de ce dimanche ? »",
  reponse:3640, unite:"€",
  indice:"Salaire doublé : 13 × 2 = 26 € de l’heure. Ensuite : 20 salariés × 7 heures × 26 €.",
  explication:"13 × 2 = 26 € de l’heure. 20 × 7 × 26 = **3 640 €**.\n\nJulien prévoit 30 000 € de ventes ce dimanche-là : ça vaut le coup… si l’équipe est d’accord."},
 {type:"choix", qui:"narr", resume:"Le dimanche 6 décembre",
  texte:"Tu réunis le CSE. Que proposes-tu ?",
  choix:[
   {t:"On ouvre, avec des volontaires uniquement", court:"Ouverture avec des volontaires", fx:{equipe:1, caisse:3}, rel:{karim:1}, set:{dimanche:"volontaires"},
    retour:"Le CSE est d’accord : chacun choisit. 23 salariés se portent volontaires. Payé double, ça intéresse beaucoup d’étudiants."},
   {t:"J’impose le dimanche à toute l’équipe", court:"Dimanche imposé", fx:{equipe:-6, caisse:4}, set:{dimanche:"impose"},
    retour:"Le CSE proteste : dans le commerce, le travail du dimanche se fait en général avec des volontaires. L’ambiance devient tendue."},
   {t:"Je refuse, et je l’explique à M. Lemaire", court:"Pas d’ouverture", fx:{equipe:2, caisse:-2}, rel:{lemaire:-1}, set:{dimanche:"non"},
    retour:"M. Lemaire n’est pas content : « Alors trouve-moi une autre idée pour rattraper le retard. » Il faudra lui proposer un plan."}
  ]}
]},

/* ===================== VENDREDI ===================== */
{id:"s1j5", date:"2026-11-20", ouvre:"2026-11-08", court:"Ven", titre:"Les vitrines",
fin:"Demain, c’est le grand jour : l’inauguration des vitrines de Noël. Tous tes choix de la semaine vont compter.",
scenes:[
 {type:"recit", qui:"camille", heure:"Vendredi · 9 h 00",
  texte:"Camille, la visuel merchandiser, celle qui crée les vitrines, a les traits tirés :\n\n« Les vitrines ne seront pas finies pour demain. Il me manque des guirlandes lumineuses. Il faudrait **800 €** de plus. »"},
 {type:"recit", qui:"julien", mot:"budget",
  texte:"Julien sort son tableau : « Le [[budget|budget]] des vitrines était de **3 000 €**. On a déjà dépensé **2 600 €**. »"},
 {type:"calcul", qui:"julien", resume:"Dépassement du budget",
  texte:"« Si tu acceptes les 800 €, de combien d’euros on dépasse le budget ? »",
  reponse:400, unite:"€",
  indice:"Calcule d’abord 2 600 + 800, puis compare avec 3 000.",
  explication:"2 600 + 800 = 3 400 €. 3 400 − 3 000 = **400 €** de dépassement."},
 {type:"recit", qui:"manon",
  texte:"Manon, du rayon déco, lève la main : « Au 2e étage, on a des guirlandes Lumière d’Amiens en réserve. On les vend 1 000 € en tout, et le magasin les a achetées 500 €. »"},
 {type:"calcul", qui:"manon", resume:"Coût réel des guirlandes du stock", mot:"marge",
  texte:"Si tu prends ces guirlandes dans le stock au lieu de les vendre, combien cela coûte-t-il vraiment au magasin ?",
  reponse:500, unite:"€",
  indice:"Ce que le magasin a vraiment payé, c’est le prix d’achat.",
  explication:"Le magasin les a achetées **500 €** : c’est ce qu’elles coûtent vraiment.\n\nLes 500 € d’écart entre le prix de vente et le prix d’achat, c’est la [[marge|marge]] qu’on ne gagnera pas. Mais en ce moment, personne ne les achète : autant qu’elles brillent en vitrine !"},
 {type:"choix", qui:"narr", resume:"Les vitrines de Noël",
  texte:"Que décides-tu pour les vitrines ?",
  choix:[
   {t:"Je prends les guirlandes du stock, et Manon aide Camille ce soir", court:"Guirlandes du stock + Manon", fx:{stock:-2, caisse:-1, clients:4}, set:{vitrines:"top", manonVitrine:true},
    retour:"Manon est ravie : c’est son rêve de faire des vitrines. À 22 h, tout brille.\n\nUne bonne directrice repère les talents de son équipe."},
   {t:"J’accepte les 800 € de plus", court:"800 € de plus", fx:{caisse:-4, clients:4}, set:{vitrines:"top", budgetDepasse:true},
    retour:"Les vitrines seront superbes, mais le budget est dépassé de 400 €. M. Lemaire te le fera sûrement remarquer."},
   {t:"Je refuse : Camille fait avec ce qu’elle a", court:"Pas de budget en plus", fx:{clients:-2}, set:{vitrines:"moyennes"},
    retour:"Camille fait de son mieux, mais une vitrine reste à moitié éclairée. Les passants vont le remarquer."}
  ]},
 {type:"recit", qui:"karim", heure:"17 h 00",
  texte:"Karim vient te voir : « Demain, laisse-moi piloter les caisses et la sécurité. J’aimerais te montrer que je suis prêt à avoir plus de responsabilités. »"},
 {type:"choix", qui:"karim", resume:"La demande de Karim",
  texte:"Que réponds-tu à Karim ?",
  choix:[
   {t:"Oui, tu pilotes les caisses et la sécurité demain", court:"Oui", fx:{equipe:2}, rel:{karim:2}, set:{karimPilote:true},
    retour:"Karim est fier. Déléguer, c’est faire confiance… et ça te laisse du temps pour être sur le terrain."},
   {t:"Non, je préfère tout gérer moi-même", court:"Non", rel:{karim:-2}, set:{karimDecu:true},
    retour:"Karim cache sa déception. Ce soir, chez lui, il regarde des offres d’emploi de directeur de magasin…"},
   {t:"On pilote ensemble, et tu prends la main en décembre", court:"Ensemble, puis lui en décembre", rel:{karim:1}, set:{karimPromesse:true},
    retour:"Karim accepte. C’est moins que ce qu’il espérait, mais c’est une promesse. Il faudra la tenir."}
  ]}
]},

/* ===================== SAMEDI ===================== */
{id:"s1j6", date:"2026-11-21", ouvre:"2026-11-09", court:"Sam", titre:"L’inauguration",
fin:"Ta première semaine est terminée ! Ouvre l’onglet **Bilan** pour voir tes résultats et envoyer ton bilan à papa.",
scenes:[
 {type:"recit", qui:"narr", heure:"Samedi · 9 h 30",
  fx: s => s.flags.vitrines === "top" ? {clients:3} : {clients:-2},
  texte: s => "Le magasin ouvre dans 30 minutes.\n\n" + (s.flags.vitrines === "top"
    ? "Les vitrines brillent de mille feux. Une petite foule attend déjà sur le trottoir de la rue des Trois-Cailloux, téléphone à la main."
    : "Les vitrines sont jolies… sauf une, à moitié éclairée. Une passante lance : « Elle est en panne, celle-là ? »")},
 {type:"recit", qui:"sylvie", heure:"12 h 00 · Rush en caisse",
  fx: s => { const n = s.flags.saisonniers || 0; let f = n >= 4 ? {clients:4} : n >= 2 ? {clients:1} : {clients:-6, caisse:-3}; if (s.flags.karimPilote) f.clients = (f.clients||0) + 2; return f; },
  texte: s => { const n = s.flags.saisonniers || 0;
    let t = n >= 4 ? "Grâce aux 4 saisonniers, toutes les caisses sont ouvertes : 5 minutes d’attente au maximum."
      : n >= 2 ? "Avec 2 saisonniers, ça tient, mais l’attente monte à 15 minutes à midi."
      : "Sans renfort, les files d’attente s’allongent : 25 minutes ! Des clients reposent leurs articles et partent.";
    if (s.flags.karimPilote) t += "\n\nKarim, qui pilote les caisses, ouvre une caisse de plus au 1er étage. Bien vu !";
    return t; }},
 {type:"recit", qui:"narr", heure:"13 h 30 · Rayon enfant",
  fx: s => s.flags.chloeEchange ? {clients:2} : s.flags.chloeAbsente ? {clients:-2} : {equipe:-2, clients:-1},
  texte: s => s.flags.chloeEchange ? "Chloé a échangé sa journée avec Hugo : le rayon enfant tourne bien, et Chloé t’envoie une photo du spectacle de son fils."
    : s.flags.chloeAbsente ? "Il manque quelqu’un au rayon enfant. Éric fait des allers-retours entre deux rayons, et des parents attendent."
    : "Chloé est là, mais elle fait la tête. Elle sourit à peine aux clients."},
 {type:"recit", qui:"sophie", heure:"15 h 00 · Rayon parfums",
  fx: s => s.flags.express ? {stock:4, clients:3} : s.flags.limite ? {clients:-1} : {stock:-2, clients:1},
  texte: s => { let t = s.flags.express ? "Grâce à la livraison express, il y a assez de flacons Maison Solène toute la journée !"
      : s.flags.limite ? "Avec 1 flacon par client, il en reste jusqu’à 18 h. Quelques clients râlent, mais personne ne repart les mains vides."
      : "À 15 h, plus un seul flacon Maison Solène. Mais la vitrine Atelier Vétiver marche bien : beaucoup de clients se laissent tenter.";
    if (s.flags.vetiverFache) t += "\n\nLe responsable d’Atelier Vétiver passe voir son corner déplacé. Il n’a pas l’air content du tout…";
    return t; }},
 {type:"recit", qui:"nadia", heure:"16 h 00",
  fx: s => s.flags.entretienTheo ? {equipe:3} : s.flags.avertissement ? {equipe:-1} : {equipe:-4},
  set: s => s.flags.laisse ? {nadiaCSE:true} : {},
  texte: s => s.flags.entretienTheo ? "Ce matin, Théo est arrivé 10 minutes en avance. Nadia te fait un clin d’œil : « Je ne sais pas ce que tu lui as dit, mais ça marche. »"
    : s.flags.avertissement ? "Théo est à l’heure, mais il ne parle plus à personne. L’ambiance au rez-de-chaussée est froide."
    : "Théo est encore arrivé à 10 h 20. Nadia te prévient : « Je vais en parler au CSE. »"},
 {type:"choix", qui:"jp", heure:"16 h 30 · Alerte", resume:"L’enfant perdu",
  texte:"Jean-Pierre, le responsable sécurité, court vers toi : « Une maman a perdu son fils de 6 ans, au 1er étage ! »",
  choix:[
   {t:"Je déclenche la procédure : surveillance des sorties et annonce au micro", court:"Procédure de sécurité", fx:{clients:5},
    retour:"Jean-Pierre fait surveiller les sorties, l’annonce passe au micro. En 6 minutes, le petit garçon est retrouvé au 3e étage, devant les pâtisseries du salon de thé !\n\nLes procédures de sécurité existent justement pour ces moments-là."},
   {t:"Je cherche moi-même dans les rayons avec la maman", court:"Je cherche moi-même", fx:{clients:-2},
    retour:"Tu cours partout… Jean-Pierre finit par lancer la procédure, et on retrouve l’enfant après 20 minutes. Une directrice coordonne : elle ne cherche pas seule."},
   {t:"J’appelle tout de suite la police", court:"J’appelle la police", fx:{clients:1},
    retour:"La police conseille d’abord de lancer la procédure du magasin. L’enfant est retrouvé au 3e étage. Ce n’était pas faux, mais la procédure interne aurait été plus rapide."}
  ]},
 {type:"recit", qui:"julien", heure:"20 h 15 · Fermeture",
  texte:"Les portes sont fermées. Julien arrive avec les résultats de la journée :\n\n**5 000 visiteurs · 1 200 tickets de caisse · 78 000 € de ventes**"},
 {type:"calcul", qui:"julien", resume:"Panier moyen du samedi", mot:"panier",
  texte:"« Calcule le [[panier|panier moyen]] de la journée. »",
  reponse:65, unite:"€",
  indice:"Panier moyen = chiffre d’affaires ÷ nombre de tickets de caisse.",
  explication:"78 000 ÷ 1 200 = **65 €**. En moyenne, chaque client qui a acheté a dépensé 65 €."},
 {type:"qcm", qui:"julien", resume:"Taux de transformation du samedi", mot:"transfo",
  texte:"« Et le [[transfo|taux de transformation]] ? 5 000 visiteurs, 1 200 tickets. »",
  options:["12 %","24 %","42 %","4,2 %"], bonne:1,
  indice:"1 200 ÷ 5 000, puis × 100.",
  explication:"1 200 ÷ 5 000 = 0,24, soit **24 %** : environ 1 visiteur sur 4 a acheté quelque chose."},
 {type:"recit", qui:"lemaire", heure:"20 h 30 · SMS",
  texte: s => (s.jauges.clients >= 75
    ? "« Belle journée, {p}. 78 000 €, c’est 6 % de plus que l’an dernier. Continue comme ça. »"
    : "« 78 000 €, c’est bien, 6 % de plus que l’an dernier. Mais on m’a parlé de clients mécontents. On en parle lundi. »")
    + (s.flags.vitrines === "top" ? "\n\nEt sur les réseaux sociaux, les photos des vitrines d’Amiens circulent déjà." : "")
    + (s.flags.budgetDepasse ? "\n\n« Et j’ai vu passer la facture des guirlandes : le budget était de 3 000 €, pas 3 400 €. »" : "")},
 {type:"qcm", qui:"zoe", resume:"Révision : la rupture",
  texte:"En partant, Zoé te pose une colle : « Au fait, une rupture, c’est quoi ? »",
  options:["Une dispute entre deux salariés","Un produit qui n’est plus disponible alors que des clients le demandent","La fermeture du magasin le soir","Une réduction pendant les soldes"], bonne:1,
  indice:"Pense au parfum star de mercredi.",
  explication:"Une rupture, c’est quand un produit manque alors que des clients le demandent. C’est le cauchemar de toutes les directrices à Noël !"}
]}
],

bilan: s => {
  const j = s.jauges, best = Object.keys(j).sort((a,b)=>j[b]-j[a])[0], worst = Object.keys(j).sort((a,b)=>j[a]-j[b])[0];
  const L = {clients:"la satisfaction des clients", equipe:"le moral de l’équipe", stock:"le stock", caisse:"la caisse"};
  let t = `Ton point fort cette semaine : **${L[best]}** (${j[best]}/100). À surveiller : **${L[worst]}** (${j[worst]}/100).\n\n`;
  const suites = [];
  if (s.flags.karimDecu) suites.push("Karim est déçu… il regarde des offres d’emploi.");
  if (s.flags.karimPromesse) suites.push("Tu as promis à Karim de lui confier plus de responsabilités en décembre.");
  if (s.flags.nadiaCSE) suites.push("Nadia va parler des retards de Théo au CSE.");
  if (s.flags.vetiverFache) suites.push("Atelier Vétiver n’a pas digéré son déménagement.");
  if (s.flags.dimanche === "non") suites.push("M. Lemaire attend ton plan pour rattraper le retard.");
  if (s.flags.dimanche === "impose") suites.push("Le CSE n’a pas apprécié le dimanche imposé.");
  if (s.flags.budgetDepasse) suites.push("M. Lemaire a remarqué le dépassement du budget des vitrines.");
  if (s.flags.manonVitrine) suites.push("Manon a montré son talent pour les vitrines.");
  if (suites.length) t += "Ce qui t’attend la semaine prochaine :\n" + suites.map(x => "• " + x).join("\n") + "\n\n";
  t += "Cette semaine, tu as fait de vrais gestes de directrice : animer un brief, gérer un planning, calculer un coût de personnel, négocier avec une marque, recadrer un salarié, respecter un budget et appliquer une procédure de sécurité.";
  return t;
}
});

JEU.prochaine = "Un nouveau jour s’ouvre chaque jour. La semaine 2 (le Black Friday) arrivera après ton bilan.";
