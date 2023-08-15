import "./App.css";
import {Route,Routes, useNavigate} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./Components/common/Navbar"
import OpenRoute from "./Components/auth/OpenRoute";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./Components/Dashboard/MyProfile";
import Error from "./pages/Error"
import ContactPage from "./pages/Contactpage";
import EnrolledCourses from "./Components/Dashboard/EnrolledCourses";
import Cart from "./Components/Dashboard/cart";
import Settings from "./pages/Settings";
import AddCourse from "./Components/Dashboard/addCourse";
import MyCourses from "./Components/Dashboard/MyCourses";
import EditCourse from "./Components/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import Instructor from "./Components/Dashboard/instructorDashboard/Instructor";
import VideoDetails from "./Components/ViewCourse/VideoDetails";
import PrivateRoute from "./Components/auth/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI";
function App() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.profile);
  useEffect(()=>{
    if(localStorage.getItem("token")){
      const token=JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token,navigate));
    }
  },[])
  return (
    <div className="w-screen min-h-screen  flex flex-col">
      <Navbar/>  
      <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="signup" element={<OpenRoute><Signup/></OpenRoute>}>
          
        </Route>
        <Route path="login" element={<OpenRoute><Login/></OpenRoute>}>

        </Route>
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword></ForgotPassword></OpenRoute>}/>
        <Route path="catalog/:catalogName" element={<Catalog></Catalog>}></Route>
        <Route path="courses/:courseId" element={<CourseDetails></CourseDetails>}></Route>
        <Route path="update-password/:id" exact={true} element={<OpenRoute><UpdatePassword></UpdatePassword></OpenRoute>}/>
        <Route path="verify-email" element={<OpenRoute><VerifyEmail></VerifyEmail></OpenRoute>}></Route>
        <Route path="about" element={<About></About>}></Route>
        <Route element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
        {
            user?.accountType==="Instructor" && (
                <>
        <Route path="dashboard/instructor" element={<Instructor></Instructor>}></Route>
        <Route path="dashboard/add-course" element={<AddCourse></AddCourse>}></Route>
        <Route path="dashboard/my-courses" element={<MyCourses></MyCourses>}></Route>
        <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}></Route>

              
              </>
            )
        }
        {
          user?.accountType==="Student" && (
          <>
        <Route path="dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>}></Route>
        <Route path="dashboard/cart" element={<Cart></Cart>}/>
          </>
          )
        }
        <Route path="dashboard/my-profile" element={<MyProfile></MyProfile>}></Route>
        <Route path="dashboard/settings" element={<Settings></Settings>}></Route>
        </Route>



        <Route path="contact" element={<ContactPage></ContactPage>}></Route>  
        <Route element={<PrivateRoute><ViewCourse></ViewCourse></PrivateRoute>}>
          {user?.accountType==="Student" && (
            <>

            <Route path="view-course/:courseId/section/:sectionId/sub-Section/:subSectionId"
            element={<VideoDetails/>}
             >
            </Route>
            </>
          )}
        </Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
