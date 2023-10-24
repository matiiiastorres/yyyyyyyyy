import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TucuWallet from '../components/TucuWallet';
import Link from 'next/link';
import SocialTree from '../components/SocialTree';
// import ShareButton from '../components/ShareButton';
import QRCode from 'react-qr-code';
import Spinner from '../components/Spiner';
import Home from '../components/HomeM/Home';
// import Navbar from '../components/Navbar';
// import MatiasLoginWeb3 from '../components/MatiasLoginWeb3';

const Handle = (userData) => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [userFound, setUserFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [social, setSocial] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    whatsapp: '',
    linkedin: '',
    github: '',
  });

  useEffect(() => {
    if (router.query?.handle) {
      fetch(
        `https://tucuwallet-networking-back0-5.onrender.com/get/${router.query.handle}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setUserFound(true);
            setData(data.userData);
            setSocial(data.socials);
          }
          setIsLoading(false); // Finaliza la carga
          if (data.status === 'error') return toast.error(data.error);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query]);

  if (isLoading) {
    // console.log('mati crack tiene que estar funcando el spiner');
    // Si está cargando, muestra el spinner
    return <Spinner />;
  }

  // useEffect(() => {
  //   if (router.query?.handle) {
  //     fetch(
  //       `http://localhost:8080/get/socials/${router.query.handle}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.status === 'error') return toast.error(data.error);
  //         if (data.status === 'success') {
  //           setSocial(data.socials);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [router.query]);

  if (!userFound) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="not-found px-3 ">
          <h1 className="font-bold text-lg">Usuario no Encontrado</h1>
          {/* <p>If you're looking for a page, double check the spelling.</p> */}
          Crea tu Perfil en
          <Link
            className="bg-blue-900 px-2 ml-2 text-white hover:bg-blue-600 transition-all duration-500"
            href="/apply"
          >
            {' '}
            TucuWallet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff]">
      {/* <Navbar /> */}
      <Home />
      <TucuWallet data={data} />
      <SocialTree social={social} />
      <br />
      <br />
      <br />
      <h2 className="text-center text-lg font-bold pt-28">TucuWallet</h2>
      <br />
      <br />
      <br />
      <br />

      <QRCode
        value={`http://localhost:3000/${router.query.handle}`}
        className=" flex flex-col justify-center max-w-7xl m-auto md:my-5 w-full md:w-2/5"
      />
      <br />
      <br />
      <br />
      {/* <MatiasLoginWeb3 /> */}
      <br />
      <br />

      <br />
      <br />
      <br />
    </div>
  );
};

export default Handle;
