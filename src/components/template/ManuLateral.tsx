import useAuth from "../../data/hook/useAuth";
import { IconeAjustes, IconeCasa, IconeSair, IconeSino } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral (){

    const {logout} = useAuth()

    return (
        <aside className={`
            flex flex-col
            bg-gray-200
            dark:bg-gray-900
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20    
            `}>
                <Logo></Logo>
            </div>
            <ul className={`
                    flex-grow
                `}>
                <MenuItem url="/" texto="Ínicio" icone={IconeCasa}></MenuItem>
                <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjustes}></MenuItem>
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino}></MenuItem>
            </ul>
            <ul>
                <MenuItem onClick={logout} 
                    texto="Sair" 
                    icone={IconeSair}
                    className={`
                        text-red-600 dark:text-red-400 
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                        `}
                ></MenuItem>
            </ul>
        </aside>
    )
}