# TODO

## Exercice 1
### Partie 1
Installez la bibliothèque `axios` depuis NPM. C'est une des bibliothèques les plus populaires pour effectuer des requêtes HTTP.

Nous allons utiliser une API de "mock" (une API dont les résultats sont des placeholders, juste pour pouvoir intégrer plus facilement) afin de simuler
le comportement de l'appel à un backend. L'URL est la suivante : https://jsonplaceholder.typicode.com/todos. C'est une API REST, donc elle en
suit les conventions.

Vous remarquerez que les champs ne correspondent pas au modèle que l'on a défini. C'est pas grave et même pas anormal du tout. Ca sera votre travail
de normaliser le retour de l'API pour que ça corresponde à notre état.

Je ne vous guiderai pas plus que ça pour l'utilisation de la bibliothèque, mais il va falloir comprendre le fonctionnement des `Pronise` afin de
pouvoir l'utiliser.

Le but est de permettre l'enchainement de comportements asynchrones (comme l'appel à une API, à une DB). Elles s'utilisent ainsi : 

```js
// ceci est une Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
const request = axios.get('http://example.com/user/1')

// Elles possèdent deux méthodes, `then` et `catch`. Ces deux méthodes renvoient des Promise à leurs tours,
// ce qui les rend chainable
request
  .then(function (response) {
    // gestion du "happy path", ce à quoi on s'attend quand tout va bien
    // response contient le retour de la requete envoyée au serveur, ainsi que d'autres métadonnées utiles
    // Maintenant qu'on a la réponse, on peut éventuellement appeler l'action qui va update notre state
    console.log(response);
  })
  .catch(function (error) {
    // gestion d'éventuelles erreurs
    // on peut signaler à l'utilisateur qu'une erreur s'est produite pour éviter que l'app reste dans un état indéfini
    console.log(error);
  })
  .then(function () {
    // `catch` renvoie une Promise, on peut éventuellement encore enchainer sur d'autres comportements
  });
```

Puisque les `Promise` sont chainables, on peut les utiliser pour faire plusieurs requêtes successives dépendantes du résultat des précédentes :

```js
authenticateUser("mylogin", "mypassword") // Appel réseau 1
  .then(user => {
    return getTodosForUser(user.id) // Appel réseau 2. On retourne une promise.
  })
  .then(todos => {
    actions.setTodos(todos) // on ne retourne pas forcément qqch, on est à la fin de notre chaine d'appels à faire, pas besoin
  })
  .catch(err => {
    console.error("Une erreur s'est produite : " + err)
    actions.setError(err)
  })
```

Les `Promise` font partie du coeur de JavaScript et il est important de savoir les manipuler, mais les apprendre de manière purement théorique
n'apporte rien du tout, bienvenue dans la cage aux lions.

### Partie 2

Faites en sorte de charger des todos par défaut grâce à Axios et à l'endpoint GET `/todos` de https://jsonplaceholder.typicode.com.
Vous allez devoir successivement : 
- attendre le chargement de votre vue, grâce à l'attribut `oncreate` : `h('div', { oncreate: () => { /* do something */ } })`
- appeler une action pour faire une requête sur l'API précédemment mentionnée
- attendre le résultat de cette requête pour appeler une action qui va assigner les TODOs que vous avez reçus dans le state

Vous avez toute la doc d'Axios sur son repo Github.

### Partie 3

Lorsque vous ajoutez un TODO, faites une requête à l'endpoint POST `/todos` de https://jsonplaceholder.typicode.com,
avec le contenu de votre todo, dans le même format que l'API le sert. Le TODO ne doit pas être ajouté à la liste tant que
vous n'avez pas reçu le OK en réponse à votre requête.
