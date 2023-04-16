import React, { useState } from "react";

const Noeud = ({
  node, // objet contenant les informations du noeud actuel
  onCheck, // fonction à appeler quand on coche le checkbox d'un noeud
  onUncheck, // fonction à appeler quand on décoche le checkbox d'un noeud
  permissions, // Permissions possibles
  parentChecked = {}, // objet contenant l'état coché/décoché des noeuds parents
  parentNode, // objet contenant les informations du noeud parent , pour savoir si le fils a encore un parent ou non
  checkedNodes, // objet contenant l'état coché/décoché de tous les noeuds


}) => { // Noeud ouvbert/fermé ou coché/décoché 
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked] = useState({ ...parentChecked });

  const handleCheckChange = (event, permission) => {
    const checked = event.target.checked;

// si le noeud est coché on appelle la fonction pour cocher le noeud actuel
    if (checked) {
      onCheck(node, permission, parentNode);
      // si le noeud a des enfants, on coche/décoche tous les enfants
      node.children &&
        node.children.forEach((child) => onCheck(child, permission, node));
    } else {
      onUncheck(node.id, permission, parentNode);
      node.children &&
        node.children.forEach((child) => onUncheck(child.id, permission, node));
    }
  };

  const paddingLeft = node.type === "group" ? 0 : 4;

  return (
    <>
      <tr className="bg-gray-100 hover:bg-gray-200">
        <td className={`pl-${paddingLeft}`}>
          {node.type === "group" && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mr-2 text-sm font-semibold focus:outline-none"
            >
              {isOpen ? "-" : "+"}
            </button>
          )} 
          {node.name}
        </td>
        {permissions.map((permission) => (    // on boucle sur les types de permissions possibles pour créer une colonne pour chaque permission
          <td key={`${node.id}-${permission}`} className="text-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={checkedNodes[`${node.id}-${permission}`] || false}

                  // on appelle la fonction handleCheckChange quand on coche/décoche le checkbox
                onChange={(event) => handleCheckChange(event, permission)}
                className="mr-1"
              />
            </label>
          </td>
        ))}
      </tr>
      
      { //Créer les noeuds enfants 
      isOpen &&
        node.children &&
        node.children.map((childNode) => (
          <Noeud
            key={childNode.id}
            node={childNode}
            onCheck={onCheck}
            onUncheck={onUncheck}
            permissions={permissions}
            parentChecked={isChecked}
            parentNode={node}
            checkedNodes={checkedNodes}
          />
        ))}
    </>
  );
};

export default Noeud;
