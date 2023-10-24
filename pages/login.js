import React, { useState } from 'react';
import styles from '../styles/apply.module.css';
import { toast } from 'react-toastify';
// import ig from '../public/images/aaaa-removebg-preview.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MatiasLoginWeb3 from '../components/MatiasLoginWeb3';

const Apply = ({ address }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`https://tucuwallet-networking-back0-5.onrender.com/api/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          toast('Ingresaste Correctamente ');
          localStorage.setItem('TucuWalletToken', data.token);
          router.push('/dashboard');
        }
        if (data.status === 'not found') {
          toast.error('User not found');
        }
        if (data.status === 'error') {
          toast.error('Contraseña o E-mail incorrecto');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // setEmail('');
  // setPassword('');
  // matias commet para subir los archivos

  return (
    <>
      <section
        className={
          styles.background + ' min-h-screen flex justify-center items-center'
        }
      >
        <div className="main">
          <div className="content bg-white border-2 px-4 py-8 rounded-2xl shadow-lg ">
            <h1 className="text-2xl font-bold text-center ">TucuWallet</h1>
            <p className="text-center py-5 font-bold text-gray-500">
              Ingresa a tu perfil
            </p>

            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 text-lg mt-5"
            >
              <span className="flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                {/* <img className="w-6  mr-2" src="../public/svg/ig.svg" alt="" /> */}
                <input
                  className="  rounded-md focus:outline-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu Email"
                  required
                />
              </span>

              <input
                className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none "
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu Contraseña"
                required
              />

              <input
                className="bg-indigo-600 text-white py-2 rounded-lg cursor-pointer"
                type="submit"
                value="Login"
              />
            </form>
          </div>
          <h3>{address}</h3>
          <h4 className="text-center text-white">
            Nuevo Aqui?{' '}
            <Link href="/apply" className=" font-bold text-red-400 pt-3">
              Registrate
            </Link>
          </h4>
        </div>
        <MatiasLoginWeb3 />
      </section>
    </>
  );
};

export default Apply;
