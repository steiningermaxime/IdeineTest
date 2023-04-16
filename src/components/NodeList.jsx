import React from "react";
import Noeud from "./Noeud";

// Composant NodeList qui affiche la liste des noeuds
// nodes : les noeuds à afficher
// onCheck : fonction appelée lorsqu'un noeud est coché
// onUncheck : fonction appelée lorsqu'un noeud est décoché
// permissions : les permissions à afficher
// checkedNodes : les noeuds cochés

const NodeList = ({ nodes, onCheck, onUncheck, permissions, checkedNodes }) => {
  return (
     // Tableau contenant les noeuds
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left">Permission pour le secteur France</th>
          {permissions.map((permission) => (
            <th key={permission} className="text-center">
              {permission}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {nodes.map((node) => (
          <Noeud
            key={node.id}
            node={node}
            onCheck={onCheck}
            onUncheck={onUncheck}
            permissions={permissions}
            checkedNodes={checkedNodes}
          />
        ))}
      </tbody>
    </table>
  );
};

export default NodeList;
