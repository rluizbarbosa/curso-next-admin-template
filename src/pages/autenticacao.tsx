import { useState } from "react"
import Authinput from "../components/auth/Authinput"
import { IconeAtencao } from "../components/icons"
import useAuth from "../data/hook/useAuth"

export default function Autenticacao(){

    const { login, cadastrar, loginGoogle} = useAuth()

    const [modo, setModo] = useState<'login' | 'cadastro'>("login")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [erro, setErro] = useState(null)


    function exibirErro(msg, tempoEmSegundos = 5){
        setErro(msg)
        setTimeout(()=> setErro(null), tempoEmSegundos * 1000)
    }

    async function submeter(){
        try{
            if(modo === 'login'){
                await login(email, senha)
            }else{
                if(senha !== confirmarSenha){
                    exibirErro("Confirme sua senha corretamente")
                }else{
                    await cadastrar(email, senha)
                }
            } 
        }catch(e){
            exibirErro(e?.message ?? 'Erro desconhecido')
        }
        
    }

    return (
        <div className={`flex items-center justify-center h-screen`}>
            <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
                <img
                className={`h-screen w-full object-cover`} 
                src="https://pixlr.com/images/generator/photo-generator.webp" alt="Imagem da tela de Autenticação" />
            </div>
            <div className={`m-10 w-full md:w-1/2 lg:w-1/3`}>
                <h1 className={`
                    text-3xl font-bold mb-5
                `}>{modo === 'login' ? 'Entre com sua Conta' : 'Cadastre-se na Plataforma'}</h1>
                {erro ? (
                    <div className={`
                        bg-red-400 text-white flex items-center gap-3
                        px-5 py-3 my-2
                        border border-red-700 rounded-lg
                    `}>
                        {IconeAtencao()}
                        <span>{erro}</span>
                    </div>
                ) : false}
                
                <Authinput
                    label="E-mail"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio
                ></Authinput>
                <Authinput
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio
                ></Authinput>
                <Authinput
                    label="Confirmar Senha"
                    tipo="password"
                    valor={confirmarSenha}
                    valorMudou={setConfirmarSenha}
                    obrigatorio
                    naoRenderzarQuando={modo === 'login'}
                ></Authinput>
                
                <button onClick={submeter} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6    
                `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className={`my-6 border-gray-300 w-full`} />
                
                <button onClick={loginGoogle} className={`
                    w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                `}>
                    Entrar com o Google
                </button>

                {modo === 'login' ? (
                    <p className={`
                        mt-8 flex flex-col gap-1 items-center justify-center flex-wrap
                    `}>
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')}
                            className={`
                                text-blue-500 hover:text-blue-700
                                font-semibold cursor-pointer
                            `}
                        >
                            Crie uma conta Gratuitamente
                        </a>
                    </p>
                ) : (
                    <p className={`
                        mt-8 flex flex-col gap-1 items-center justify-center flex-wrap
                    `}>
                        Já faz parte da nossa comunidade?
                        <a onClick={() => setModo('login')}
                            className={`
                                text-blue-500 hover:text-blue-700
                                font-semibold cursor-pointer
                            `}
                        >
                            Entre com a suas credenciais
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}