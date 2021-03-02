import React from "react";
import FormService from "../services/form.services";

const Uploader = ({
	imageUrl,
	setImageUrl,
	uploadingImage,
	setUploadingImage,
}) => {
	const entryService = new FormService();

	const handleImageUpload = (e) => {
		setUploadingImage(true);
		const uploadData = new FormData();
		uploadData.append("imageUrl", e.target.files[0]);

		entryService
			.uploadImage(uploadData)
			.then((response) => {
				setImageUrl(response.data.path);
				setUploadingImage(false);
			})
			.catch((err) => console.log("ERROOOOOOOR", err));
	};
	return (
		<div>
			<label htmlFor="picture" className="filelabel">
				{imageUrl ? "Foto cargada" : "Carga una foto del ticket de compra"}{" "}
			</label>
			{uploadingImage && (
				<span className="form_error">
					Estamos cargando tu ticket, espera unos instantes...
				</span>
			)}

			<input
				name="picture"
				id="picture"
				type="file"
				className="inputfile"
				data-multiple-caption="{count} files selected"
				onChange={handleImageUpload}
			/>
		</div>
	);
};

export default Uploader;
