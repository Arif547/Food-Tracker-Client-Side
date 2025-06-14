import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import OtherSignin from '../components/OtherSignin';



const Register = () => {
    const { createUser, setUser, updateUser } = use(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        // console.log(name, email, password, photo);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUpperCase || !hasLowerCase || !isValidLength) {
            let errorMsg = "Password must:";
            if (!hasUpperCase) errorMsg += " include an uppercase letter;";
            if (!hasLowerCase) errorMsg += " include a lowercase letter;";
            if (!isValidLength) errorMsg += " be at least 6 characters;";
            setPasswordError(errorMsg);
            return;
        }

        createUser(email, password).then(result => {
            const user = result.user;
            console.log(user)

            // setUser(user);
            updateUser({ displayName: name, photoURL: photo }).then(() => {
                setUser({ ...user, displayName: name, photoURL: photo });
                toast.success("successful Register! ");
                navigate("/");
            })
                .catch((error) => {
                    setUser(user);
                });

        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error("Email Already Register!")
                // toast.error("Error Something is Wrong!")
            });


    }
    return (
        <div className='max-w-[1200px] mx-auto px-5 py-28 flex flex-col justify-center items-center'>
            <title>Register</title>
            <h2 className='text-4xl font-bold text-center mb-8'>Register Your Account</h2>

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset space-y-3">
                            <label className="label">Name</label>
                            <input name='name' type="text" className="input" placeholder="Name" required />

                            <label className="label">Email</label>
                            <input name='email' type="email" className="input" placeholder="Email" required />

                            <label className="label">Photo Url</label>
                            <input name='photo' type="url" className="input" placeholder="Photo Url" required />

                            <label className="label">Password</label>
                            <input name='password' type="password" className="input" placeholder="Password" required />

                            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

                            <button type='submit' className="btn btn-neutral mt-4">Register</button>
                            <p>Already Have An Account? <Link className='text-secondary mt-4' to='/login'>Login</Link>  </p>
                        </fieldset>
                    </form>

                    <div className="divider">Or</div>

                    <OtherSignin></OtherSignin>
                </div>
            </div>
        </div>
    );
};

export default Register;