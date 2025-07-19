import {firebaseAuth} from '../../firebase/config'
import Usuario from '../../model/Usuario'
import { useState, createContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import route from 'next/router'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth'

interface AuthContextProps{
    usuario?: Usuario
    carregando?: boolean
    loginGoogle?: () => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})


async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario>{
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie (logado: boolean){
    if(logado){
        Cookies.set('admin-templates-auth', logado, {
            expires: 7
        })
    }else{
        Cookies.remove('admin-templates-auth')
    }
}


export function AuthProvider(props){

    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function configurarSessao(usuarioFirebase){
        if(usuarioFirebase?.email){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        }else{
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle(){
        try{
            setCarregando(true)
            const provider = new GoogleAuthProvider()
            const resp = await signInWithPopup(firebaseAuth, provider)
            await configurarSessao(resp.user)
            route.push('/')
        }finally{
            setCarregando(false)
        }
    }

    async function login(email, senha){
        try{
            setCarregando(true)
            const provider = new GoogleAuthProvider()
            const resp = await signInWithEmailAndPassword(firebaseAuth, email, senha)
            await configurarSessao(resp.user)
            route.push('/')
        }finally{
            setCarregando(false)
        }
    }

    async function cadastrar(email, senha){
        try{
            setCarregando(true)
            const provider = new GoogleAuthProvider()
            const resp = await createUserWithEmailAndPassword(firebaseAuth, email, senha)
            await configurarSessao(resp.user)
            route.push('/')
        }finally{
            setCarregando(false)
        }
    }
    

    async function logout(){
        try{
            setCarregando(true)
            await firebaseAuth.signOut()
            await configurarSessao(null)   
        }finally{
            setCarregando(false)
        }
    }

    useEffect(()=> {
        if(Cookies.get('admin-templates-auth')){
            const cancelar = firebaseAuth.onIdTokenChanged(configurarSessao)
            return () => cancelar()
        }else{
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            loginGoogle,
            login,
            cadastrar,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext