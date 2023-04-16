import React from "react";

const SelectedNodes = ({ selectedNodes }) => {
  // Grouper les noeuds sélectionnés par type de permission
  const permissionGroups = selectedNodes.reduce((acc, node) => {
    if (!acc[node.permission]) {
      acc[node.permission] = [];
    }
    acc[node.permission].push(node);
    return acc;
  }, {});

  return (
    <div className="shadow-md bg-white p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Permission :</h2>
      {Object.keys(permissionGroups).map((permission) => (

         // Afficher les noeuds de chaque type de permission

        <div key={permission} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{permission} :</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm font-semibold text-gray-700 border-b-2">
                <th className="w-1/2">Noeuds séléctionnés :</th>
                <th className="w-1/4">Type de permission</th>
              </tr>
            </thead>
            
            <tbody className="bg-gray-100 hover:bg-gray-200">
              {permissionGroups[permission].map((node, index) => (
                  // Afficher les informations de chaque noeud
                <tr key={`${node.id}-${index}`} className="border-b border-gray-400">
                  <td className="py-2">{node.name}</td>
                  <td className="py-2">{permission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SelectedNodes;
