import React, { useState } from 'react';
import styles from '../styles/apply.module.css';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Apply = () => {
  const router = useRouter();
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!category) return toast.error('Agrega la cateria de Creador');
    // backend part
    fetch(`https://tucuwallet-networking-back0-5.onrender.com/api/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        handle,
        email,
        password,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          toast('Te registraste Exitosamente');
          localStorage.setItem('TucuWalletToken', data.token);
          setSubmitted(true);
          router.push('/login');
        }
        if (data.status === 'error') {
          toast.error('email  o usuario en uso ');
        }
      })
      .catch((err) => {
        toast.error('Try a diferent username');
      });
  };
  return (
    <>
      <section
        className={
          styles.background + ' min-h-screen flex justify-center items-center'
        }
      >
        <div className="main">
          <div className="content bg-white border-2 px-4 py-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-center">TucuWallet</h1>
            <p className="text-center">Crea tu perfil </p>
            <p className="text-center py-5 font-bold text-gray-500">
              Empeza a conocer la Web3.0
            </p>
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-4 text-lg mt-5"
            >
              <span className="flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                {/* <img className="w-6 mr-2" src="/svg/ig.svg" alt="" /> */}
                <input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="focus:outline-none"
                  type="text"
                  placeholder="Nombre de Usuario"
                  required
                />
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                type="email"
                placeholder="Ingresa tu Email"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                type="password"
                placeholder="Ingresa tu contraseña"
                required
              />

              <h5 className="text-sm text-center text-indigo-400">
                Tipo de cuenta:
              </h5>
              <span className="flex">
                <label className="flex flex-row mr-3">
                  <input
                    type="checkbox"
                    className=""
                    value="Creator"
                    checked={category === 'Creator'}
                    onChange={handleCategoryChange}
                  />
                  <p className="pl-2">Creador</p>
                </label>
                <label className="flex flex-row mr-3">
                  <input
                    type="checkbox"
                    className=""
                    value="Agency"
                    checked={category === 'Agency'}
                    onChange={handleCategoryChange}
                  />
                  <p className="pl-2">Empresa</p>
                </label>
                <label className="flex flex-row mr-3">
                  <input
                    type="checkbox"
                    className=""
                    value="Brand"
                    checked={category === 'Brand'}
                    onChange={handleCategoryChange}
                  />
                  <p className="pl-2">Admin</p>
                </label>
              </span>
              <input
                className="bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
                type="submit"
                value="Registrar"
              />
            </form>
          </div>
          <h4 className="text-center text-white pt-3">
            Ya tienes una cuenta?{' '}
            <Link className="font-bold text-red-600" href="/login">
              Ingresa Aqui
            </Link>
          </h4>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Apply;
