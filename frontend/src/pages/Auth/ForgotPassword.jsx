import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SeoHelmet } from '../../components/SeoHelmet';
import api from '../../api';

export default function SigninForm() {
    const [email, setEmail] = useState('');
    const [secretQuestion, setSecretQuestion] = useState('');
    const [secretAnswer, setSecretAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`${import.meta.env.VITE_APP_API_RESET_PASSWORD}`, {
                email,
                secretQuestion,
                secretAnswer,
                newPassword
            });
            if (data.status === 422) {
                return toast.error(data.message);
            } else if (data.status === 200) {
                toast.success(data.message);
                setTimeout(() => {
                    navigate('/sign');
                }, 2000);
            }
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };
    return (
        <>
            <SeoHelmet title={`N1 - E-commerce - Forgot password`} description={`N1 - E-commerce for smartphone, tablet and laptop - Forgot password`} />
            <div className='h-screen w-full flex flex-col lg:flex-row justify-center items-center'>
                <form className="w-auto md:w-96 h-auto bg-[#FFFAFA] rounded shadow-md p-10 flex flex-col justify-center items-center">
                    <input
                        type="email"
                        title="Example@example.com"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        name="email"
                        placeholder="E-mail"
                        className="block box-border mb-3 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                    />
                    <select
                        id="secretQuestion"
                        name="secretQuestion"
                        value={secretQuestion}
                        onChange={(event) => setSecretQuestion(event.target.value)}
                        required
                        className="block box-border mb-1 py-1 w-full h-8 border-b text-gray-400 border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                    >
                        <option className='text-center text-gray-400 font-medium text-sm md:text-base xl:text-lg mb-1' value="">Secret Question</option>
                        <option className='text-center' value="petName">What is your pet's name?</option>
                        <option className='text-center' value="motherName">What is your mother's name?</option>
                        <option className='text-center' value="fatherName">What is your father's name?</option>
                        <option className='text-center' value="favoriteSport">What is your favorite sport?</option>
                        <option className='text-center' value="favoriteFood">What is your favorite food?</option>
                        <option className='text-center' value="firstSchool">What is the name of your first school?</option>
                        <option className='text-center' value="favoriteMovie">What is your favorite movie?</option>
                        <option className='text-center' value="favoriteBook">What is your favorite book?</option>
                        <option className='text-center' value="firstPet">What is the name of your first pet?</option>
                        <option className='text-center' value="parentsCity">In what city were your parents born?</option>
                        <option className='text-center' value="favoriteColor">What is your favorite color?</option>
                    </select>
                    <input
                        type="text"
                        name="secretAnswer"
                        placeholder="Secret Answer"
                        value={secretAnswer}
                        onChange={(event) => setSecretAnswer(event.target.value)}
                        required
                        className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                    />
                    <input
                        type="password"
                        title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number and must not contain white spaces"
                        required
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        name="newPassword"
                        placeholder="New Password"
                        className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                    />
                    <input
                        type="button"
                        name="reset_button"
                        value="Reset"
                        onClick={(e) => resetPassword(e)}
                        className="mt-[1.5rem] w-[7.5rem] h-[2rem] rounded text-sm md:text-base xl:text-lg border-solid border-2 hover:text-[#8BC6EC] active:scale-95 font-medium uppercase transition duration-[100ms] ease-in-out cursor-pointer hover:opacity-[80%] hover:shadow-md active:opacity-[100%] active:shadow-sm"
                    />
                </form>
            </div>
        </>
    );
};