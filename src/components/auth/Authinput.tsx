interface AuthinputProps{
    label: string
    tipo?: 'text' | 'email' | 'password' | 'number'
    valor: any
    obrigatorio?: boolean
    naoRenderzarQuando?: boolean
    valorMudou: (novoValor: any) => void
}

export default function Authinput (props: AuthinputProps){

    return props.naoRenderzarQuando ? null : (
        <div className={`flex flex-col  mt-4`}>
            <label>{props.label}</label>
            <input 
                type={props.tipo ?? 'text'} 
                value={props.valor} 
                onChange={e => props.valorMudou?.(e.target.value)}
                required={props.obrigatorio}
                className={`
                    px-4 py-3 rounded-lg bg-gray-100 mt-2
                    border
                    focus:border-blue-500 focus:outline-none focus:bg-white
                `}
            />
        </div>
    )
}