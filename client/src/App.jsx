// import HomeData from "./componets/HomeData";
// import Register from "./pages/Registration/Registration"
// import Login from "./pages/Login/Login";
// import Start from "./pages/StartPage/Start"
// import Dashboard from "./pages/Dashboard/Dashboard";
// import MoreInfo from "./pages/MoreInfo/MoreInfo"
// import Protected from "./componets/Protected";
// // import { useState } from "react";
// import { Routes, Route ,Navigate} from 'react-router-dom';
// function App() {
//   // const {isLogin,setIslogin} =useState(false);
//   // const isLogin = true;
//   return (
//     <>
//       <Routes>
//         <Route exact path="/" element={Start}/>
//         <Protected exact path="/register" element={Register}/>
//         <Protected exact path="/login" element={Login}/>
//         <Protected exact path="/moreInfo" element={MoreInfo}/>
//         <Route path="/dashboard" element={Dashboard}/>
//       </Routes>
//       {/* <HomeData/> */}
//     </>
//   )
// }

// export default App
import { Routes, Route } from "react-router-dom";
import Start from "./pages/StartPage/Start";
import Register from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import MoreInfo from "./pages/MoreInfo/MoreInfo";
import Protected from "./componets/Protected";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/moreInfo" element={<MoreInfo/>} />
        <Route path="/dashboard" element={<Protected element={<Dashboard />} />} />
      </Routes>
    </>
  );
}

export default App;

