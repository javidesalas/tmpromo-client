import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import { Formik, Form, useFormikContext, useField } from "formik";
import * as Yup from "yup";

import FormService from "../services/form.services";
import Uploader from "./Uploader";

const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, "Demasiado Corto")
		.max(50, "Demasiado Largo")
		.required("Campo obligatorio"),
	lastName: Yup.string()
		.min(2, "Demasiado Corto")
		.max(50, "Demasiado Largo")
		.required("Campo obligatorio"),
	birthDate: Yup.date()
		.required("Campo obligatorio")
		.test(
			"age",
			"Debes ser mayor de 18 años para participar",
			function (birthdate) {
				const cutoff = new Date();
				cutoff.setFullYear(cutoff.getFullYear() - 18);
				return birthdate <= cutoff;
			}
		),
	zipCode: Yup.number()
		.min(1000, "Código Postal No Válido")
		.max(52999, "Código Postal No Válido")
		.required("Campo obligatorio"),
	email: Yup.string()
		.trim()
		.lowercase()
		.email("Email inválido")
		.required("Campo obligatorio"),
	phone: Yup.string().trim().min(9, "Teléfono incorrecto"),
	code: Yup.string()
		.length(7, "Longitud de código incorrecta")
		.matches(/^JG[A-Z0-9]{5}/, "Código inválido"),
	boughtAt: Yup.string(),
	acceptedTerms: Yup.boolean()
		.required("Campo obligatorio")
		.oneOf([true], "Debes aceptar los términos y condiciones"),
	imageUrl: Yup.string().required(),
});

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className="form_row">
			<label className="form_label" htmlFor={props.id || props.name}>
				{label}
			</label>
			<input className="form_input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="form_error">{meta.error}</div>
			) : null}
		</div>
	);
};

const MyCheckbox = ({ children, ...props }) => {
	const [field, meta] = useField({ ...props, type: "checkbox" });
	return (
		<div>
			<div className="form_checkRow">
				<input
					className="form_input_checkbox "
					type="checkbox"
					{...field}
					{...props}
				/>

				<label className="checkbox-input">{children}</label>
			</div>
			{meta.touched && meta.error ? (
				<div className="form_error">{meta.error}</div>
			) : null}
		</div>
	);
};

const MySelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className="form_row">
			<label className="form_label" htmlFor={props.id || props.name}>
				{label}
			</label>
			<select className="form_input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="form_error">{meta.error}</div>
			) : null}
		</div>
	);
};

const MyUrl = (props) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(props);

	useEffect(() => {
		setFieldValue(props.name, props.imageurl);
	}, [props.imageurl, props.name]);

	return (
		<>
			<input {...props} {...field} />
		</>
	);
};

const EntryForm = () => {
	const [uploadingImage, setUploadingImage] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	// const [formHeight, setFormHeight] = useState(null)

	const entryService = new FormService();
	const history = useHistory();

	// const handleChange = () => {
	// 	if (window) {
	// 		const height = document.getElementById("wrapper").scrollHeight;
	// 		if (height !== formHeight) {
	// 			setFormHeight(height);
	// 		}
	// 	}
	// };

	// useEffect(() => {

	// 	window &&
	// 		window.addEventListener(
	// 			"message",
	// 			(message) => {
	// 				if (message.data === "loaded") {
	// 					const height = formHeight ? formHeight : document.getElementById("wrapper").scrollHeight;

	// 					console.log(height)
	// 					window.parent.postMessage(height, "https://www.jagermeister.com");

	// 				}
	// 			},
	// 			false
	// 		);
	// },[formHeight])

	return (
		<div className="formContainer" id="wrapper">
			<span className="form_error">Todos los campos son obligatorios </span>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					birthDate: "",
					zipCode: "",
					email: "",
					phone: "",
					code: "",
					boughtAt: "",
					imageUrl: "",
					acceptedTerms: "",
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					entryService
						.newEntry(values)
						.then((response) => history.push("/success"))
						.catch((err) => {
							console.log(err.response.data.error);
							setSubmitError(err.response.data.error);
						});
				}}
				validateOnChange="false"
				// onChange = {handleChange}
			>
				<Form>
					<MyTextInput
						label="Nombre"
						name="firstName"
						type="text"
						placeholder="Tu nombre"
					/>
					<MyTextInput
						label="Apellidos"
						name="lastName"
						type="text"
						placeholder="Tus apellidos"
					/>
					<MyTextInput
						label="Fecha de Nacimiento"
						name="birthDate"
						type="date"
						placeholder="Tu fecha de nacimiento"
					/>
					<MyTextInput
						label="Código Postal"
						name="zipCode"
						type="number"
						placeholder="Tu código postal"
					/>
					<MyTextInput
						label="Email"
						name="email"
						type="text"
						placeholder="Tu correo electrónico"
					/>
					<MyTextInput
						label="Teléfono"
						name="phone"
						type="text"
						placeholder="Tu teléfono"
					/>
					<MyTextInput
						label="Código Jägermeister"
						name="code"
						type="text"
						placeholder="Tu código de participación"
					/>
					<MySelect label="Comprado En:" name="boughtAt">
						<option value="" disabled style={{ color: "#193B01" }}>
							Elige el punto de venta
						</option>
						<option value="Ahorramas" style={{ color: "#193B01" }}>
							Ahorramás
						</option>
						<option value="Alcampo" style={{ color: "#193B01" }}>
							Alcampo
						</option>
						<option value="Bon Preu" style={{ color: "#193B01" }}>
							Bon Preu
						</option>
						<option value="Caprabo" style={{ color: "#193B01" }}>
							Caprabo
						</option>
						<option value="Carrefour" style={{ color: "#193B01" }}>
							Carrefour
						</option>
						<option value="Eroski" style={{ color: "#193B01" }}>
							Eroski
						</option>
						<option value="ECI" style={{ color: "#193B01" }}>
							El Corte Inglés, Supercor, Hipercor
						</option>
						<option value="Otros" style={{ color: "#193B01" }}>
							Otros
						</option>
					</MySelect>
					<Uploader
						imageUrl={imageUrl}
						setImageUrl={setImageUrl}
						uploadingImage={uploadingImage}
						setUploadingImage={setUploadingImage}
					/>
					<div className="uploaderPlaceholder"></div>

					<MyUrl name="imageUrl" type="hidden" imageurl={imageUrl} />

					<MyCheckbox name="acceptedTerms">
						Acepto los términos y condiciones
					</MyCheckbox>

					{submitError && <p className="form_error-submit">{submitError}</p>}
					<button
						className="form_submitBtn"
						type="submit"
						disabled={uploadingImage}
					>
						Enviar
					</button>
				</Form>
			</Formik>
		</div>
	);
};

export default EntryForm;
