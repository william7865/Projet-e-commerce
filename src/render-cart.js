const renderCartItems = (cart) => {
  const cartContainer = document.getElementById("cart-container");

  // Vérifie si le conteneur existe
  if (!cartContainer) {
    console.error("Le conteneur du panier n'a pas été trouvé dans le HTML.");
    return;
  }

  // Efface le contenu précédent du conteneur
  cartContainer.innerHTML = "";

  // Parcours chaque article dans le panier
  cart.forEach((item) => {
    // Crée un élément div pour chaque article
    const itemElement = document.createElement("div");

    // Ajoute le contenu HTML avec les détails de l'article
    itemElement.innerHTML = `<img src="../image/bijoux 2.jpg" height="80px"><p>Nom: ${item.name}</p><p>Prix: ${item.price}</p><p>Quantité: ${item.quantity}</p>`;

    // Ajoute l'élément à la fin du conteneur
    cartContainer.appendChild(itemElement);
  });
};
