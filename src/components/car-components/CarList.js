import React, { useEffect, useState } from 'react';
import CarServices from '../../services/CarService';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await CarServices.findALL();
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement des voitures");
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
      <div className="car-list-container">
        <h1 className="title">Liste des Voitures</h1>
        {cars.length > 0 ? (
            <table className="car-table">
              <thead>
              <tr>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Matricule</th>
                <th>Client</th>
              </tr>
              </thead>
              <tbody>
              {cars.map((car) => (
                  <tr key={car.id}>
                    <td>{car.marque}</td>
                    <td>{car.model}</td>
                    <td>{car.matricule}</td>
                    <td>{car.client.nom}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            <p className="no-cars">Aucune voiture disponible.</p>
        )}
      </div>
  );
};

export default CarList;
