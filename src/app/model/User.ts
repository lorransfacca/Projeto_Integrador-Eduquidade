import { Comentario } from "./Comentario"
import { Postagem } from "./Postagem"

export class User{
    public id: number   
    public nomeCompleto: string
    public email: string
    public senha: string
    public foto: string
    public tipoUsuario: string
    public postagem: Postagem[]
    public comentario: Comentario[]
}
