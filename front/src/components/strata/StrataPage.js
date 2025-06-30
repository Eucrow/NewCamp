import React, { useContext, useEffect, useState } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import StrataContext from "../../contexts/StrataContext";
import Strata from "./Strata";

const StrataPage = () => {
	const [strata, setStrata] = useState([]);
	const [stratifications, setStratifications] = useState([]);
	const [selectedStratification, setSelectedStratification] = useState("");

	// Fetch stratifications on component mount
	useEffect(() => {
		fetch(buildApiUrl(API_CONFIG.ENDPOINTS.GET_STRATIFICATIONS))
			.then((response) => response.json())
			.then((data) => setStratifications(data))
			.catch((error) => console.error("Error fetching stratifications:", error));
	}, []);

	// Fetch strata when stratification is selected
	useEffect(() => {
		if (selectedStratification) {
			console.log("Fetching strata for stratification:", API_CONFIG.ENDPOINTS.STRATA_BY_STRATIFICATION(selectedStratification));
			fetch(buildApiUrl(API_CONFIG.ENDPOINTS.STRATA_BY_STRATIFICATION(selectedStratification)))
				.then((response) => response.json())
				.then((data) => setStrata(data))
				.catch((error) => console.error("Error fetching strata:", error));
		} else {
			setStrata([]);
		}
	}, [selectedStratification]);

	/**
	 * Create stratum.
	 * @param {object} stratum - The stratum to be created.
	 */
	const createStratum = (stratum) => {
        console.log("Creating stratum api:", API_CONFIG.ENDPOINTS.STRATA);
        console.log("Creating stratum api:", buildApiUrl(API_CONFIG.ENDPOINTS.STRATA));
		fetch(buildApiUrl(API_CONFIG.ENDPOINTS.STRATA), {
			method: "POST",
			headers: API_CONFIG.HEADERS.DEFAULT,
			body: JSON.stringify(stratum),
		})
			.then((response) => response.json())
			.then((s) => {
				const newStrata = [...strata, s];
				setStrata(newStrata);
			})
			.catch((error) => console.error("Error creating stratum:", error));
	};

	/**
	 * Update stratum.
	 * @param {object} stratum - The stratum to be updated.
	 */
	const updateStratum = (stratum) => {
		const api = buildApiUrl(API_CONFIG.ENDPOINTS.STRATUM_BY_ID(stratum.id));

		fetch(api, {
			method: "PUT",
			headers: API_CONFIG.HEADERS.DEFAULT,
			body: JSON.stringify(stratum),
		})
			.then((response) => response.json())
			.then((updatedStratum) => {
				const updatedStrata = strata.map((s) =>
					s.id === updatedStratum.id ? updatedStratum : s
				);
				setStrata(updatedStrata);
			})
			.catch((error) => console.error("Error updating stratum:", error));
	};

	/**
	 * Delete stratum.
	 * @param {number} stratumId - The ID of the stratum to be deleted.
	 */
	const deleteStratum = (stratumId) => {
		const api = buildApiUrl(API_CONFIG.ENDPOINTS.STRATUM_BY_ID(stratumId));

		fetch(api, {
			method: "DELETE",
			headers: API_CONFIG.HEADERS.DEFAULT,
		})
			.then(() => {
				const updatedStrata = strata.filter((s) => s.id !== stratumId);
				setStrata(updatedStrata);
			})
			.catch((error) => console.error("Error deleting stratum:", error));
	};

	const renderContent = () => {
		return (
			<StrataContext.Provider
				value={{
					strata,
					setStrata,
					stratifications,
					selectedStratification,
					setSelectedStratification,
					createStratum,
					updateStratum,
					deleteStratum,
				}}
			>
				<main>
					<header>
						<h1 className="title">Strata Management</h1>
					</header>

					<div className="wrapper">
						<div className="form__row">
							<label className="form__cell">
								Stratification:
								<select
									value={selectedStratification}
									onChange={(e) => setSelectedStratification(e.target.value)}
									className="select__normalWidth"
								>
									<option value="">Select a stratification...</option>
									{stratifications.map((stratification) => (
										<option key={stratification.id} value={stratification.id}>
											{stratification.stratification}
										</option>
									))}
								</select>
							</label>
						</div>

						{selectedStratification && (
							<Strata 
								strata={strata} 
								stratificationId={selectedStratification} 
								createStratum={createStratum} 
							/>
						)}
					</div>
				</main>
			</StrataContext.Provider>
		);
	};

	return renderContent();
};

export default StrataPage;
