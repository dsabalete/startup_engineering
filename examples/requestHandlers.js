function iniciar() 
{
    console.log("Manipulador de peticion 'iniciar' fue llamado.");
    return "Hola Iniciar";
}

function subir() 
{
    console.log("Manipulador de petición 'subir' ha sido llamado.");
    return "Hola Subir";
}

exports.iniciar = iniciar;
exports.subir = subir;