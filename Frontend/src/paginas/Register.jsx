import { Link } from 'react-router-dom';
import { useState } from "react";
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

export const Register = () => {
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
            const respuesta = await axios.post(url, form);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setForm({
                nombre: "",
                apellido: "",
                direccion: "",
                telefono: "",
                email: "",
                password: ""
            });
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full p-6 gap-8">
            {/* Sección del formulario */}
            <div className="bg-white flex justify-center items-center w-full max-w-xl p-8 shadow-lg rounded-lg">
                <div className="w-full max-h-[80vh] overflow-y-auto">
                    {Object.keys(mensaje).length > 0 && (
                        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )}

                    <h1 className="text-2xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido/a</h1>
                    <small className="text-gray-400 block my-4 text-sm">
                        Por favor, introduzca sus datos
                    </small>

                    <form onSubmit={handleSubmit}>
                        {[
                            { label: "Nombre", id: "nombre", type: "text" },
                            { label: "Apellido", id: "apellido", type: "text" },
                            { label: "Dirección", id: "direccion", type: "text" },
                            { label: "Teléfono", id: "telefono", type: "tel" },
                            { label: "Email", id: "email", type: "email" },
                            { label: "Contraseña", id: "password", type: "password" }
                        ].map(({ label, id, type }) => (
                            <div className="mb-3" key={id}>
                                <label className="mb-2 block text-sm font-semibold" htmlFor={id}>
                                    {label}:
                                </label>
                                <input
                                    type={type}
                                    id={id}
                                    name={id}
                                    value={form[id] || ""}
                                    onChange={handleChange}
                                    placeholder={`Ingresa tu ${label.toLowerCase()}`}
                                    className="block w-full rounded-md border border-gray-300 
                                        focus:border-gray-700 focus:outline-none focus:ring-1 
                                        focus:ring-gray-700 py-2 px-3 text-gray-500"
                                    required
                                />
                            </div>
                        ))}

                        <button className="bg-gray-500 text-white py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900">
                            Registro
                        </button>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4"></div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Ya tienes una cuenta?</p>
                        <Link to="/login" className="py-2 px-5 bg-gray-500 text-white border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900">
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sección de imagen */}
            <div className="hidden lg:flex lg:w-2/5 max-w-lg">
                <img src="/images/dogregister.jpg" alt="Registro" className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"/>
            </div>
        </div>
    );
};
