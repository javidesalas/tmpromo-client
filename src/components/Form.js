import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

//import "./styles.css";

const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, "Demasiado Corto")
		.max(50, "Demasiado Largo")
		.required("Campo Obligatorio"),
	lastName: Yup.string()
		.min(2, "Demasiado Corto")
		.max(50, "Demasiado Largo")
		.required("Campo Obligatorio"),
	birthDate: Yup.date()
		.required()
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
		.required("Campo Obligatorio"),
	email: Yup.string()
		.trim()
		.lowercase()
		.email("Email No Válido")
		.required("Campo Obligatorio"),
	phone: Yup.string().trim().min(9, "Demasiado Corto"),
	code: Yup.string()
		.length(7, "Longitud de código incorrecta")
		.matches(/^JM[A-Z0-9]{5}/, "Código inválido"),
	boughtAt: Yup.string(),
	acceptedTerms: Yup.boolean()
		.required("Campo Obligatorio")
		.oneOf([true], "Debes aceptar los términos y condiciones"),
});

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	);
};

const MyCheckbox = ({ children, ...props }) => {
	const [field, meta] = useField({ ...props, type: "checkbox" });
	return (
		<div>
			<label className="checkbox-input">
				<input type="checkbox" {...field} {...props} />
				{children}
			</label>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	);
};

const MySelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	);
};

const EntryForm = () => {
	return (
		<div className="formContainer">
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					birthDate: new Date(),
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
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
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
						placeholder="Tus fecha de nacimiento"
					/>
					<MyTextInput
						label="Código Postal"
						name="zipCode"
						type="number"
						placeholder="Tu código postal"
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
						<option value="">Elige el punto de venta</option>
						<option value="Alcampo">Alcampo</option>
						<option value="Carrefour">Carrefour</option>
					</MySelect>

					<MyCheckbox name="acceptedTerms">
						Acepto los términos y condiciones
					</MyCheckbox>

					<button type="submit">Enviar</button>
				</Form>
			</Formik>
		</div>
	);
};

export default EntryForm;
