import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
import api from '../../api';

export default function Profile() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [secretQuestion, setSecretQuestion] = useState('');
    const [secretAnswer, setSecretAnswer] = useState('');
    const [age, setAge] = useState(true);
    const [auth, setAuth] = useAuth();
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
        };
        try {
            const { data } = await api.put(`${import.meta.env.VITE_APP_API_UPDATE_PROFILE}`, {
                name,
                surname,
                email,
                password,
                phone,
                address,
                secretQuestion,
                secretAnswer
            });
            if (data.status === 422) {
                return toast.error(data.message);
            }
            if (data.status === 200) {
                setAuth({ ...auth, user: data.updateUser });
                let authStorage = localStorage.getItem('auth');
                authStorage = JSON.parse(authStorage);
                authStorage.user = data.updateUser;
                localStorage.setItem('auth', JSON.stringify(authStorage));
                return toast.success(data.message);
            };
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };
    useEffect(() => {
        const { name, surname, email, phone, address } = auth.user;
        setName(name);
        setSurname(surname);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, []);
    return (
        <div className='flex flex-col justify-center items-center my-5'>
            <form onSubmit={submit} className="w-auto md:w-96 h-auto bg-[#FFFAFA] rounded shadow-md p-3 flex flex-col justify-center items-center">
                <h3 className='text-2xl m-2 font-bold'>Update profile</h3>
                <input
                    type="text"
                    title="Name must be at least 2 characters long"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    name="firstName"
                    placeholder="First Name"
                    className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                />
                <input
                    type="text"
                    title="Surname must be at least 2 characters long"
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    name="lastName"
                    placeholder="Last Name"
                    className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                />
                <input
                    type="email"
                    title="Example@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    placeholder="E-mail"
                    className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                />
                <input
                    type="password"
                    title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number and must not contain white spaces"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                    placeholder="Password"
                    className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                />
                <input
                    type="number"
                    title="10 - 15"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    name="phone"
                    placeholder="Phone Number"
                    className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                />
                <input
                    type="text"
                    title="Address, apartment number, region, city, postal code"
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
                    className="block box-border mb-1 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
                />
                <input
                    type="submit"
                    name="update_submit"
                    value="Update"
                    className="mt-[1rem] w-[7.5rem] h-[2rem] rounded text-sm md:text-base xl:text-lg border-solid border-2 hover:text-[#8BC6EC] active:scale-95 font-medium uppercase transition duration-[100ms] ease-in-out cursor-pointer hover:opacity-[80%] hover:shadow-md active:opacity-[100%] active:shadow-sm"
                />
            </form>
        </div>
    )
}