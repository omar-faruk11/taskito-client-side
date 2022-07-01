import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Calendar from "./Pages/Calendar";
import Completed from "./Pages/Completed";
import ToDo from "./Pages/ToDo";
import {

  useQuery,

  useMutation,

  useQueryClient,

  QueryClient,

  QueryClientProvider,

} from 'react-query'


function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>

        <Navbar />
        <Routes>
          <Route path="/" element={<ToDo></ToDo>}></Route>
          <Route path="/completed" element={<Completed></Completed>}></Route>
          <Route path="/calendar" element={<Calendar></Calendar>}></Route>
        </Routes>
        <Footer />

      </QueryClientProvider>
    
    </>
  );
}

export default App;
