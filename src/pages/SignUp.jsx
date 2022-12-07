import {useState} from 'react';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import OAuth from '../Components/OAuth';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const {name, email, password} = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth();

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = {...formData}
            // delete password from database
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)
            
            navigate('/')
        } catch (error) {
            toast.error('Something went wrong with registration')
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome back!</p>
                </header>

                <form onSubmit={onSubmit}>
                <input 
                        id="name"
                        type="text" placeholder="Name" className="nameInput" value={name} onChange={onChange} />

                    <input 
                        id="email"
                        type="email" placeholder="email" className="emailInput" value={email} onChange={onChange} />

                    <div className="passwordInputDiv">
                        <input 
                            placeholder="Password" 
                            value={password} 
                            type={showPassword ? 'text' : 'password'} 
                            id="password" 
                            className="passwordInput"
                            onChange={onChange} />

                            <img 
                                src={visibilityIcon} 
                                className="showPassword" 
                                alt="show password" 
                                onClick={() => setShowPassword((prevState) => !prevState)}/>
                    </div>

                    <Link to="/forgot-password" className="forgotPasswordLink">Forgot Password?</Link>

                    <div className="signUpBar">
                        <p className="signUpText">Sign Up</p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
                        </button>
                    </div>
                </form>

                <OAuth />

                <Link to="/sign-in" className="registerLink">Sign In</Link>
            </div>
        </>
    )
}


export default SignUp;