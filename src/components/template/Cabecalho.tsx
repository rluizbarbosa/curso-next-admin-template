import useAppData from "../../data/hook/useAppData"
import AvatarUsuario from "./Avatarusuario"
import BotaoAlternarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"

interface CabecalhoProps{
    titulo: string
    subtitulo: string
}

export default function Cabecalho (props: CabecalhoProps){
    const {tema, alternarTema} = useAppData()
    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}></Titulo>
            <div className={`
                flex flex-grow justify-end items-center gap-2
            `}>
                <BotaoAlternarTema tema={tema} alternarTema={alternarTema}></BotaoAlternarTema>
                <AvatarUsuario className={`ml-3`}></AvatarUsuario>
            </div>
        </div>
    )
}