import './index.css';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MarketPlace } from './pages/MarketPlace';
import { ListKeys } from './pages/ListKeys';
import { ContadorComErros } from './pages/ContadorComErros';
import { CampoDeBusca } from './pages/CampoDeBusca';
import { ColorResponsive } from './pages/ColorResponsive';
import Chat from './pages/Chat';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<ListKeys/>}/>
            <Route path="/contadorcomerros" element={<ContadorComErros/>}/>
            <Route path="/campodebusca" element={<CampoDeBusca/>}/>
            <Route path="/colorresponsive" element={<ColorResponsive/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/marketplace" element={<MarketPlace/>}/>
        </Routes>
    </BrowserRouter>
)




