import React, { useEffect, useState } from 'react';
import ClientServices from '../../services/ClientService';
import './ClientList.css'; // Import du fichier CSS

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const response = await ClientServices.findALL();
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement des clients");
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
      <div className="car-list-container">
        <h1 className="title">Liste des Clients</h1>
        {clients.length > 0 ? (
            <table className="car-table">
              <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Âge</th>
              </tr>
              </thead>
              <tbody>
              {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.nom}</td>
                    <td>{client.age}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            <p className="no-cars">Aucun client disponible.</p>
        )}
      </div>
  );
};

export default ClientList;
