import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./routes";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // 쿼리 실패 시 1번 재시도
        },
    },
});

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={<route.component/>}/>
                        ))}
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}

export default App;
