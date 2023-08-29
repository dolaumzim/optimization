import { Link } from "react-router-dom";

export const LinksRoutes = () => {

    return(
        <header className='@apply flex justify-center items-center gap-[25px] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] text-lg text-[rgb(19,141,141)] px-2 py-4'>
        <Link to='/'>ListKeys</Link>
        <Link to='/contadorcomerros'>Contador com Erros</Link>
        <Link to='/campodebusca'>Campo de Busca</Link>
        <Link to='/colorresponsive'>Color Responsive</Link>
        <Link to='/chat'>Chat</Link>
        <Link to='/marketplace'>Marketplace</Link>
      </header>
    )
}