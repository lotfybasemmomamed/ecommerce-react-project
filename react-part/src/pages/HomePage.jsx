import FormRegister from './Auth/FormRegister'
import { Routes, Route } from "react-router-dom";

export default function HomePage() {

  return (
    <>
    <Routes>
      <Route path="/register" element={<FormRegister/>}/>
    </Routes>
    </>
  )
}

