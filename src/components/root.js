import React from "react";
import App from "../App";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import NavigationBar from "./navigation";
import { BrowserRouter as Router, Routes , Route  } from "react-router-dom";

export default function Root(){
    return (
        <Router>
            <div className = "appContainer">
                <NavigationBar/>
                <div>
                    <Routes>
                        <Route path = "/" element = {<App/>}>
                                
                        </Route>
                        <Route path = "/about" element = {<About/>}>
                            
                        </Route>
                        <Route path = "/contacts" element = {<Contacts/>}/>
                    </Routes>
                        
                        
                    
                </div>
            </div>
           
        </Router>
    )
}