const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	ciudad: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, 
	password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
	passwordUser:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	buscar:/^[a-zA-ZÀ-ÿ\s]{3,40}$/
}

const campos = {
	email:false,
	passwordUser:false,
	nombre: false,
	ciudad: false,
	password: false,
	correo: false,
	buscar: false
}

const validarFormulario = (e) =>{
switch (e.target.name){
	case "email":
		validarCampo(expresiones.email, e.target ,'email')
		break;
	case "passwordUser":
			validarCampo(expresiones.passwordUser, e.target ,'passwordUser')
			break;
	case "nombre":
		validarCampo(expresiones.nombre, e.target ,'nombre')//e.target.name es = 'nombre'
	break;
	case "ciudad":
		validarCampo(expresiones.ciudad, e.target ,'ciudad')
		break;

	case "provincia": 
		break;

	case "correo":
		validarCampo(expresiones.correo, e.target ,'correo')
		break;

	case "password":
		validarCampo(expresiones.password, e.target ,'password')
		validarPassword2()
		break;

	case "password2":
		validarPassword2()
		break;
	case "buscar":
		validarCampo(expresiones.buscar, e.target, 'buscar')
		break;

}
}

const validarCampo = (expresion, input, campo) =>{
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto')
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle')
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle')
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
		campos[campo] = true;
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle')
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle')
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
		campos[campo] = false;
	}
}



const validarPassword2 = () =>{
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;

	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)

})

formulario.addEventListener('submit', (e) => {
	e.preventDefault();	

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.ciudad && campos.password && campos.correo && terminos.checked){	
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')
		setTimeout(() => {
		document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
		}, 5000);
			
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
		icono.classList.remove('formulario__grupo-correcto')
		})
	}else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
		setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')

		}, 3000);
	}
});

function mostrarContrasena(){
	var tipo = document.getElementById("password");
	if(tipo.type == "password"){
		tipo.type = "text";
	}else{
		tipo.type = "password";
	}
}
