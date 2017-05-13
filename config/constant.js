exports.port = 3131;
exports.host = "localhost";

exports.firebase = {
    serviceAccount: "./prestalud-5ff0a60a16e1.json",
    databaseURL: "https://prestalud.firebaseio.com"
};

exports.table = {
    constants: "constants",
    controllers: "controllers",
    profiles: "profiles",
    roles: "roles",
    users: "users"
};

exports.secret = "Pr3st@1ud2017IndustrialLABS";

/**
 * Datos de configuracion de la base de datos
 */
exports.database = {
    uri: `mongodb://localhost:27017`,
    name: 'prestalud'
};

/**
 * Representa los estados de un registro
 */
exports.status = {
    active: 'active',
    inactive: 'inactive'
};

exports.messages = {
    m1: 'No hay registros activos',
    m2: 'El token ha expirado',
    m3: 'Token inválido',
    m4: 'No tienes autorización',
    m5: 'Error al crear el registro',
    m6: 'No existe el registro solicitado',
    m7: 'Has ingresado correctamente',
    m8: 'Error al guardar el registro',
};
