import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MessageBoardPage from "./pages/MessageBoardPage/MessageBoardPage";
import NewBoardPage from "./pages/NewPostPage/NewBoardPage";

function App() {
    const { pathname } = useLocation();
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MessageBoardPage />} />
                <Route path="/new-post" element={<NewBoardPage />} />
            </Routes>
            {pathname === "/" ? <Footer /> : null}
        </>
    );
}

export default App;
