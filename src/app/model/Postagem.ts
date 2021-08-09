import { Comentario } from "./Comentario"
import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem{
    public id: number
    public titulo: string
    public descricao: string
    public data_postagem: Date
    public link_video: string
    public usuario: User
    public tema: Tema
    public comentario: Comentario[]
}
