import React from 'react';
import OneBottleTm from "./one_bottleTM.png";

const Success = () => {
    return (
			<div className="success-container">
				<img className="success-img" src={OneBottleTm} alt="Ice Cold Machine" />
				<div className="success-text">
					<p>
						EL REGISTRO SE HA COMPLETADO CON ÉXITO Y NUESTRO EQUIPO ESTÁ
						COMPROBANDO LA VALIDEZ DE TU TICKET. EN CASO DE QUE TU CÓDIGO
						RESULTE GANADOR, CONTACTAREMOS CONTIGO A TRAVÉS DE LOS DATOS DE
						CONTACTO QUE NOS HAS FACILITADO.{" "}
					</p>
					<p>
						MIENTRAS TANTO, VIEL GLÜCK, O LO QUE ES LO MISMO: ¡BUENA SUERTE!
					</p>
				</div>
			</div>
		);
};

export default Success;