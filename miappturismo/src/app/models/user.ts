export interface User {
    userId: string;
    userName: string;
    userEmail: string;
    password:string,
    perfil: 'turista' | 'propietario'  | 'admin'
}
