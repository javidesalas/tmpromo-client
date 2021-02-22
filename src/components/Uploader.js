import React from "react";
import FormService from "../services/form.services";

const Uploader = ({setImageUrl}) => {
	const entryService = new FormService();
	
	const handleImageUpload = (e) => {
		const uploadData = new FormData();
		uploadData.append("imageUrl", e.target.files[0]);
		
		entryService.uploadImage(uploadData)
			.then((response) => {
				console.log(response.data)
				setImageUrl(response.data.path)
			})
			.catch((err) => console.log("ERROOOOOOOR", err));
	};
	return (
		<div>
			<label htmlFor="picture">Carga una foto del ticket de compra</label>
			<input
				name="picture"
				type="file"
				className="file"
				onChange={handleImageUpload}
			/>
		</div>
	);
};

export default Uploader;
