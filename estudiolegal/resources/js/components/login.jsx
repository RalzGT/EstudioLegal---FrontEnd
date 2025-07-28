import React from 'react';

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md flex flex-col items-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Consultorio Legal</h2>
                <img src="./images/iconolegal.png" alt="Icono Legal" className="w-40 h-40 mb-6" />
                <form className="space-y-5 w-full text-center">
                    <span className='block'>Inicie sesión con su cuenta Google:</span>
                    <button
                        className="flex items-center justify-center gap-2 border-2 px-6 py-2 rounded-2xl shadow-xl border-amber-600 bg-amber-600 text-white font-bold w-full hover:cursor-pointer">
                        <img src="./images/googlefavicon.ico" alt="Google" className="w-5 h-5" />
                        Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
