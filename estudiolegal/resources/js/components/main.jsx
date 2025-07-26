import React from "react";
import ReactDOM from 'react-dom/client';

function Main () {
    return (
        <div className="bg-gray-500 p-5">
            <div className="bg-white p-10 rounded">Hola </div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    )
}

export default Main;

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <Main />
    )
}