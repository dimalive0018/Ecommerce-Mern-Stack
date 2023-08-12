import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [secretQuestion, setSecretQuestion] = useState('');
    const [secretAnswer, setSecretAnswer] = useState('');
    const [age, setAge] = useState(true);
    const navigate = useNavigate();
    const ageValidator = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 18) {
            return setAge(false);
        }
        return setAge(true);
    };
    const submit = async (e) => {
        e.preventDefault();
        if (age === false) {
            return toast.error("Invalid age, you must be at least 18 years old");
        }
        try {
            const { data } = await api.post(`${import.meta.env.VITE_APP_API_SIGNUP}`, {
                name,
                surname,
                email,
                password,
                phone,
                address,
                secretQuestion,
                secretAnswer
            });
            if (data.status === 409) {
                return toast.error(data.message);
            } else if (data.status === 201) {
                toast.success(data.message);
                setTimeout(() => {
                    navigate('/sign');
                }, 2000);
            } else if (data.status === 422) {
                return toast.error(data.message);
            }
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };
    return (
        <form onSubmit={submit} className="w-auto md:w-96 h-auto lg:mt-[15%] bg-[#FFFAFA] rounded shadow-md p-8 flex flex-col justify-center items-center">
            <input
                type="text"
                title="Name must be at least 2 characters long"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                name="firstName"
                placeholder="First Name"
                className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
            />
            <input
                type="text"
                title="Surname must be at least 2 characters long"
                required
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
                name="lastName"
                placeholder="Last Name"
                className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
            />
            <input
                type="email"
                title="Example@example.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value.toLowerCase())}
                name="email"
                placeholder="E-mail"
                className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
            />
            <input
                type="password"
                title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number and must not contain white spaces"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                placeholder="Password"
                className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
            />
            <input
                type="number"
                title="10 - 15"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                name="phone"
                placeholder="Phone Number"
                className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
            />
            <input
                type="text"
                title="Address, apartment number, region, city, postal code"
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                name="address"
                placeholder="Home Address"
                className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
            />
            <h3 className='text-gray-400 font-medium text-sm md:text-base xl:text-lg mb-1'>Your Birthday</h3>
            <input
                type="date"
                title="Birthday"
                required
                onChange={ageValidator}
                name="birthday"
                placeholder="Birthday"
                className="block box-border mb-1 py-1 w-full h-8 border-b text-gray-400 border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
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
                type="submit"
                name="signup_submit"
                value="Sign up"
                className="mt-[1rem] w-[7.5rem] h-[2rem] rounded text-sm md:text-base xl:text-lg border-solid border-2 hover:text-[#8BC6EC] active:scale-95 font-medium uppercase transition duration-[100ms] ease-in-out cursor-pointer hover:opacity-[80%] hover:shadow-md active:opacity-[100%] active:shadow-sm"
            />
        </form>
    );
};