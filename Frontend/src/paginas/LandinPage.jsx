import logoDarkMode from '../assets/dark.png'
import logoGithub from '../assets/github.png'
import logoLinkedind from '../assets/linkedin.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false);

    // Cambiar la clase dark en el body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>Veterinaria Tesla</h1>
                        <ul className='flex items-center'>
                            <li>
                                <img onClick={() => setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="modo oscuro" width={40} height={40} />
                            </li>
                            <li>
                                <Link to="/login" className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white'>
                                    Inicia Sesión
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Veterinaria Tesla</h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>Desarrollo de frontend</h3>
                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>
                            Hola, soy el desarrollador frontend de esta aplicación. Mi objetivo es crear una interfaz intuitiva y atractiva para gestionar los servicios de la Veterinaria Tesla, optimizando la experiencia de usuario con tecnología moderna.
                        </p>
                    </div>

                    <div className='text-5xl flex justify-center gap-16 py-3'>
                        <a href="https://github.com/erick200011" target="_blank" rel="noopener noreferrer">
                            <img src={logoGithub} alt="GitHub" width={50} height={50} className='dark:border-2 border-teal-300 rounded-full' />
                        </a>
                        <a href="https://www.linkedin.com/in/erick-palomo-81354b219/" target="_blank" rel="noopener noreferrer">
                            <img src={logoLinkedind} alt="LinkedIn" width={50} height={50} className='dark:border-2 border-teal-300 rounded-full' />
                        </a>
                    </div>
                </section>
            </main>

        </div>
    );
};
