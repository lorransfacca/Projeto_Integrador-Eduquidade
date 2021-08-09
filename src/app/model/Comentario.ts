import { Postagem } from "./Postagem"
import { User } from "./User"

export class Comentario {
    public id: number
    public usuario: User
    public comentario: string
    public postagem: Postagem
    public data: Date
}
