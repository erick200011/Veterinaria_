import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import DataTable from 'react-data-table-component';

// Definir las columnas para DataTable
const columns = [
    {
        name: 'N°',
        selector: (row, index) => index + 1,
        sortable: true,
    },
    {
        name: 'Nombre',
        selector: 'nombre',
        sortable: true,
    },
    {
        name: 'Propietario',
        selector: 'propietario',
        sortable: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'Celular',
        selector: 'celular',
        sortable: true,
    },
    {
        name: 'Estado',
        cell: row => (
            <span className={`bg-${row.estado ? 'blue-100 text-green-500' : 'gray-100 text-gray-500'} text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}>
                {row.estado ? 'activo' : 'inactivo'}
            </span>
        ),
    },

    {
        name: 'Acciones',
        cell: row => (
            <>
                <MdNoteAdd
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() => navigate(`/dashboard/visualizar/${row._id}`)}
                />
                <MdInfo 
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                    onClick={() => navigate(`/dashboard/actualizar/${row._id}`)}    
                />
                <MdDeleteForever
                    className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                    onClick={() => { handleDelete(row._id) }}
                />
            </>
        ),
    },
];


const Tabla = () => {
    const navigate = useNavigate()
    const [pacientes, setPacientes] = useState([])

    const listarPacientes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setPacientes(respuesta.data, ...pacientes)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a registrar la salida de un paciente, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/eliminar/${id}`
                const headers= {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                const data ={
                    salida:new Date().toString()
                }
                await axios.delete(url, {headers, data});
                listarPacientes()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarPacientes()
    }, [])


    return (
        <>
        {pacientes.length === 0 ? (
            <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
        ) : (
            <DataTable
                title="Lista de Pacientes"
                columns={columns}
                data={pacientes}
                highlightOnHover
                striped
                responsive
                pagination
               
            />
        )}
    </>

    )
}

export default Tabla