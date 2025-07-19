import Head from "next/head"
import Image from "next/image"
import loading from '../../public/images/loading.gif'
import useAuth from "../data/hook/useAuth"
import route from "next/router"

export default function forcarAutenticacao(jsx){

    const {usuario, carregando} = useAuth()
    
    function rederizarConteudo(){
        return (
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes("admin-templates-auth")){
                                window.location.href = "/autenticacao"
                            }
                        `
                    }}></script>
                </Head>
                {jsx}
            </>
        )
    }

    function rederizarCarregando(){
        return (
            <div className={`
                flex items-center justify-center h-screen
            `}>
                <Image src={loading} alt="Carregando"></Image>
            </div>
        )
    }
    
    if(!carregando && usuario?.email){
        return rederizarConteudo()
    }else if(carregando){
        return rederizarCarregando()
    }else{
        route.push("/autenticacao")
        return null
    }
}