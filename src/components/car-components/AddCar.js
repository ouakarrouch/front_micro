import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarServices from "../../services/CarService";
import ClientServices from "../../services/ClientService";
import "../car-components/AddCar..css"

export default function AddCar() {
    const [car, setCar] = useState({
        marque: "",
        model: "",
        matricule: ""
    });
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        ClientServices.findALL()
            .then((response) => {
                setClients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
                toast.error("Erreur lors de la récupération des clients.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            });
    }, []);

    const handleSave = (e) => {
        e.preventDefault();

        if (!selectedClientId) {
            toast.error("Veuillez sélectionner un client.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        const updatedCar = { ...car, clientId: selectedClientId };

        CarServices.saveVoiture(updatedCar, selectedClientId)
            .then(() => {
                navigate('/');
                toast.success('Voiture ajoutée avec succès!', {
                    position: "top-right",
                    autoClose: 3000,
                });
            })
            .catch((error) => {
                console.error("Erreur d'enregistrement :", error);
                toast.error("Erreur lors de l'enregistrement.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    return (
        <div className="add-car-container">
            <div className="card">
                <h3 className="card-header">Ajout d'une nouvelle voiture</h3>
                <form onSubmit={handleSave} className="card-body">
                    <div className="form-group">
                        <label className="form-label">Marque</label>
                        <input
                            type="text"
                            name="marque"
                            value={car.marque}
                            className="form-control"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Modèle</label>
                        <input
                            type="text"
                            name="model"
                            value={car.model}
                            className="form-control"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Matricule</label>
                        <input
                            type="text"
                            name="matricule"
                            value={car.matricule}
                            className="form-control"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Client</label>
                        <select
                            value={selectedClientId}
                            onChange={(e) => setSelectedClientId(e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="">Sélectionner un client</option>
                            {clients.length > 0 ? (
                                clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.nom}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Aucun client disponible</option>
                            )}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Ajouter la voiture</button>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
}
