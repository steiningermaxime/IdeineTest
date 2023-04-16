import React, { useState, useEffect } from "react";
import axios from "axios";
import NodeList from "./NodeList";
import SelectedNodes from "./SelectedNodes";

const Permission = () => {
   // Déclaration des états
  const [data, setData] = useState(null);
  const permissions = ["Voir les brouillons", "Modifier les brouillons"];
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [checkedNodes, setCheckedNodes] = useState({});

// Fonction exécutée lorsqu'une case est cochée

  const onCheck = (node, permissionType) => {
    setCheckedNodes((prevState) => ({
      // Mettre à jour l'état des noeuds cochés
      ...prevState,
      [`${node.id}-${permissionType}`]: true,
    }));

    // Ajouter le noeud sélectionné à la liste des noeuds sélectionnés
    setSelectedNodes((prevState) => [
      ...prevState,
      { ...node, permission: permissionType },
    ]);
  };
// Fonction exécutée lorsqu'une case est décochée
  const onUncheck = (nodeId, permissionType, parentNode) => {
    setCheckedNodes((prevState) => ({
      ...prevState,
      [`${nodeId}-${permissionType}`]: false,
    }));
    
    // Si un noeud parent est présent, décocher également sa case
    if (parentNode) {
      setCheckedNodes((prevState) => ({
        ...prevState,
        [`${parentNode.id}-${permissionType}`]: false,
      }));
    }
  
    setSelectedNodes((prevState) =>
      prevState.filter(
        (node) =>
          (node.id !== nodeId || node.permission !== permissionType) &&
          (!parentNode || node.id !== parentNode.id || node.permission !== permissionType)
      )
    );
  };
  
// se connecter aux données sectorisation.json avec lAPI  axios
  const fetchData = async () => {
    try {
      const response = await axios.get("sectorisation.json");
      if (response.data.is_success) {
        setData(response.data.data);
      } else {
        console.error(
          "Erreur lors de la récupération des données:",
          response.data.error_message
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  // affichage de la page

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">
        Gestion des permissions de sectorisation
      </h1>
      <div className="shadow-md bg-white p-4 rounded-lg">
        <NodeList
          nodes={data.roots}
          onCheck={onCheck}
          onUncheck={onUncheck}
          permissions={permissions}
          checkedNodes={checkedNodes}
        />
      </div>
      <div className="mt-8">
        <SelectedNodes selectedNodes={selectedNodes} />
      </div>
    </div>
  );
};

export default Permission;
