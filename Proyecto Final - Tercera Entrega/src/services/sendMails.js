import { createTransport } from "nodemailer";
import twilio from "twilio";
import { logger, loggerError } from "../utils/logs.js";
import * as dotenv from "dotenv";
dotenv.config();

// // <----- Twilio Whatsapp ----->

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = twilio(accountSid, authToken);
// try {
// 	const message = await client.messages.create({
// 		body: "Hola soy un SMS desde Node.js! Att: ALFA",
// 		// from: `whatsapp:+14156884237`,
// 		from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
// 		to: "whatsapp:+573116057161",
// 	});
// 	console.log(message);
// } catch (error) {
// 	console.log(error);
// }

// <----- Node Mailer ----->

export async function sendMailAdmin(dataUser) {
	const transporter = createTransport({
		service: "gmail",
		port: 587,
		auth: {
			user: process.env.MAIL_ADMIN,
			pass: process.env.PASSWORD_MAIL_ADMIN,
		},
	});

	const { name, email, address, age, phone, image } = dataUser;

	const mailOptions = {
		from: "Proyecto Backend Coder House",
		to: process.env.MAIL_ADMIN,
		subject: "Nuevo Registro",
		html: `
		<h1>Nuevo usuario registrado con el nombre: ${name.first} ${name.last}</h1>
		<ul>
			<li>Correo electronico: ${email}</li>
			<li>Direccion: ${address}</li>
			<li>Edad: ${age}</li>
			<li>Numero telefonico: ${phone}</li>
		</ul>
		`,
		attachments: [
			{
				path: `public/imgs/${image}`,
			},
		],
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		logger.info(info);
	} catch (error) {
		loggerError.error(err);
	}
}

export async function sendMailNewOrder(dataOrder) {
	const transporter = createTransport({
		service: "gmail",
		port: 587,
		auth: {
			user: process.env.MAIL_ADMIN,
			pass: process.env.PASSWORD_MAIL_ADMIN,
		},
	});

	const { name, email, address, phone, products } = dataOrder;

	let listProducts = "";

	for (let i = 0; i < products.length; i++) {
		listProducts += `<li>${products[i]}</li>`;
	}

	const mailOptions = {
		from: "Proyecto Backend Coder House",
		to: process.env.MAIL_ADMIN,
		subject: `Nuevo pedido de ${name}, ${email}`,
		html: `
		<h2>Datos del usuario: </>
		<ul>
			<li>Nombre: ${name}</li>
			<li>Correo: ${email}</li>
			<li>Direccion: ${address}</li>
			<li>Telefono: ${phone}</li>
		</ul>
		<h2>Lista de productos del pedido: </h2>
		<ul>
			${listProducts}
		</ul>
		`,
		// attachments: [
		// 	{
		// 		path: `public/imgs/${image}`,
		// 	},
		// ],
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		logger.info(info);
	} catch (error) {
		loggerError.error(err);
	}
}
