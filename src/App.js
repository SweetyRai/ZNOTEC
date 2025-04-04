import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import About from './components/About/About'
import Career from './components/Careers/Careers'
import B2B from './components/B2B/B2B'
import Freelancer from './components/Freelancer/Freelancer'
import Footer from './components/Footer/Footer';
import Services from './components/Services/services';
import Contact from './components/Contact/Contact';
import Dashboard from './components/Dashboard/Dashboard';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import RegistrationAndLogin from './components/RegistrationAndLogin/RegistrationAndLogin';



function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      {/* <div class="wavy-lines">
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60 C 150 90, 350 30, 500 60 C 650 90, 850 30, 1000 60 C 1150 90, 1300 30, 1400 60 L 1400 120 L 0 120 Z" 
                  fill="#4197f1" opacity="0.5"></path>
        </svg>
    </div> */}
    <div class="background-shapes">
        {/* <div class="background-shape background-circle"></div>
        <div class="background-shape background-circle-1"></div>
        <div class="background-shape background-circle-2"></div>
        <div class="background-shape background-circle-3"></div>
        <div class="background-shape background-circle-4"></div>
        <div class="background-shape background-circle-5"></div> */}
    </div>

   

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/services" element={<Services />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/privacy_policy' element={<PrivacyPolicy/>}/>
        <Route path='/terms_and_consition' element={<TermsAndConditions/>}/>
        <Route path='/sign_in' element={<RegistrationAndLogin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
