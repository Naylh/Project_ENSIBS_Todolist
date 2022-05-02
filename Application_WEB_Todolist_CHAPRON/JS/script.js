/**
 * Création d'une tâche lors du clique sur le '+'
 * @returns void
 */
function newElement() {
  let inputValue = document.getElementById('entreetopic').value; //Get la valeur rentrée

  if (inputValue === "") { //Vérification que l'entrée ne soit pas null
    alert("Rentrez une tâche non vide"); //On averti l'utilisateur qu'il faut rentrée au moins une valeur
    return; //Pour sortir de la fonction et ne pas executer la suite
  }

  var content = localStorage.getItem("stock"); //Get les valeurs stockée
  content = JSON.parse(content); //Pour avoir un tableau et non juste un string
  content.push({ desc: inputValue, done: false }); //Ajout au storage le nouvel element 
  localStorage.setItem("stock", JSON.stringify(content)); //Stockage

  let syntaxelist1 = '<li><input type="text" id="sortietopic" value="'; //Début de la syntaxe pour la création des li
  let syntaxelist2 = '" disabled></li>'; //Fin de la syntaxe pour la création des li
  let done = '<input type="image" onclick="done(this)" id="buttondone" src="./Image/done.png"></input>'; //Syntaxe pour le bouton done lors de la création des li
  let remove = '<input type="image" onclick="remove(this)" id="buttonremove" src="./Image/delete.png"></input>'; //Syntaxe pour le bouton remove lors de la création des li

  document.getElementById("uljs").innerHTML += '<div id="listeli">' + syntaxelist1 + inputValue + syntaxelist2 + done + remove + '</div>'; //Création d'un li quand il y a un click sur le '+'
}


/**
 * Permet de changer l'id d'une tâche lors de l'appuie sur le 'check' pour dire qu'une tâche est fini
 * @param {*} element 
 */
function done(element) {
  var content = localStorage.getItem("stock"); //Get les valeurs stockée
  content = JSON.parse(content); //Pour avoir un tableau et non juste un string

  let input = element.parentNode.firstChild.firstChild; //J'accède à la li concerné
  if (input.id == "sortietopic") { //Si le topic n'étais pas encore fini alors
    input.id = "sortietopicdone"; //On change l'id de la li pour l'afficher correctement
  }
  else {
    input.id = "sortietopic"; //On change l'id de la li pour l'afficher correct
  }

  for (let i = 0; i < content.length; i++) { //Parcours de toutes les valeurs stockées pour gérer le stockage des taches accomplies
    if (input.value == content[i].desc) { //Si la valeur de la li concerné est égale au contenu d'une des valeurs stockées
      content[i].done = true; //On change dans le contenu de localStorage la valeur de done
    }
  }
  localStorage.setItem("stock", JSON.stringify(content)); //Stockage
}


/**
 * Permet de changer l'id d'une tâche lors de l'appuie sur le 'remove' pour dire qu'une tâche n'est plus d'actualité
 * @param {*} element 
 */
function remove(element) {
  var content = localStorage.getItem("stock"); //Get les valeurs stockée
  content = JSON.parse(content); //Pour avoir un tableau et non juste un string
  let input = element.parentNode; //On accède à la div

  for (let i = 0; i < content.length; i++) { //Parcours de toutes les valeurs stockées pour gérer le stockage des taches remove
    if (content[i].desc == input.firstChild.firstChild.value) { //Si la value de la li est la meme que la description stockées alors
      content.splice(i, 1); //On supprime du stockage la div contenant cette li 
    }
  }
  input.remove(); //On supprime de la page la div

  localStorage.setItem("stock", JSON.stringify(content)); //Stockage
}


/**
 * Permet de gérer localstorage au lancement de la page
 */
function Load() {
  if (localStorage.getItem("stock") == null) { //S'il n'y a pas encore de stock alors on le crée
    localStorage.setItem("stock", JSON.stringify([])); //On crée un stock d'une liste vide
  }

  var content = localStorage.getItem("stock"); //Get les valeurs stockée
  content = JSON.parse(content); //Pour avoir un tableau et non juste un string

  if (content.length == 0) { //S'il n'y a pas de taches de stockées
    alert("Pas de liste à charger"); //On averti l'utilisateur qu'il n'y a pas de liste
    return; //Pour sortir de la fonction
  }

  let syntaxelistnotdone = '<li><input type="text" id="sortietopic" value="'; //Début de la syntaxe pour la création des li qui n'est pas fini
  let syntaxelistdone = '<li><input type="text" id="sortietopicdone" value="'; //Début de la syntaxe pour la création des li qui est fini
  let syntaxelist2 = '" disabled></li>'; //Fin de la syntaxe pour la création des li
  let done = '<input type="image" onclick="done(this)" id="buttondone" src="./Image/done.png"></input>'; //Syntaxe pour le bouton done lors de la création des li
  let remove = '<input type="image" onclick="remove(this)" id="buttonremove" src="./Image/delete.png"></input>'; //Syntaxe pour le bouton remove lors de la création des li

  for (var i = 0; i < content.length; i++) { //Parcours de toutes les taches stockées pour gérer la bonne création
    if (content[i].done === true) { //Si la tache avait été coché comme faite alors
      document.getElementById("uljs").innerHTML += '<div id="listeli">' + syntaxelistdone + content[i].desc + syntaxelist2 + done + remove + '</div>'; //Création d'un li
    }
    else {
      document.getElementById("uljs").innerHTML += '<div id="listeli">' + syntaxelistnotdone + content[i].desc + syntaxelist2 + done + remove + '</div>'; //Création d'un li
    }
  }
}

/**
 * Permet de gérer l'affichage des tâches lors d'une sélection à l'aide du menu
 * @param {*} event 
 */
function filterTodo(event) //Filtrer les todos
{
  const taches = listeli; //On récupere les div avec les li
  for (item of taches) { //On parcours les div
    switch (event.target.value) //Vérifier le filtre
    {
      case "all": //Tous les todos
        item.style.display = "flex"; //Afficher le todo
        break;
      case "completed": //Tous les todos terminés
        if (item.firstChild.firstChild.id == "sortietopicdone") { //Vérifier si le todo est terminé
          item.style.display = "flex"; //Afficher le todo
        } else { //Sinon
          item.style.display = "none"; //Cacher le todo
        }
        break;
      case "todo": //Tous les todos non-terminés
        if (item.firstChild.firstChild.id == "sortietopic") { //Vérifier si le todo n'est pas terminé
          item.style.display = "flex"; //Afficher le todo
        } else { //Sinon
          item.style.display = "none"; //Cacher le todo
        }
        break;
    }
  }
}


const filterOption = document.querySelector("#menuderoul");
filterOption.addEventListener("click", filterTodo); //Execute filterTodo dès que l'utilisateur change la valeur du menu
Load(); //Pour charger les valeurs précédentes s'il y a
