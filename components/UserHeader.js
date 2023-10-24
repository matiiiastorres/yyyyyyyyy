import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserContext from '../context/userContext';

const UserHeader = () => {
  //   const { name, role, avatar, handle, links } = data;
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('TucuWalletToken');
    router.push('/login');
  };

  const { userData, setUserData } = useContext(UserContext);
  const { role, avatar, handle } = userData;

  useEffect(() => {
    if (!localStorage.getItem('TucuWalletToken'))
      return (window.location.href = '/login');
    fetch(`https://tucuwallet-networking-back0-5.onrender.com/data/dashboard`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('TucuWalletToken'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') return toast.error('Error happened');
        setData(data.userData);
        setUserData(data.userData);

        console.log('logging from userHeader', data.userData);

        localStorage.setItem('userHandle', data.userData.handle);
        toast.success(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row p-5">
          <Link href="/edit/links">
            <button className="inline-flex w-full md:w-auto px-5 py-3 text-gray-900 font-bold hover:text-blue-700 hover:bg-purple-100 rounded-md mb-3 border-2 border-gray-900">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-link-edit-2653664-2202660.png"
                className="w-6 mr-3"
              />
              Editar Links
            </button>
          </Link>
          <Link href="/edit/profile">
            <button className="inline-flex w-full md:w-auto px-5 py-3 text-gray-900 font-bold hover:text-blue-700 hover:bg-red-100 rounded-md mb-3 border-2 border-gray-900 md:ml-4">
              <img
                src="https://w7.pngwing.com/pngs/458/83/png-transparent-computer-icons-user-profile-icon-design-edit-microphone-hand-silhouette.png"
                className="w-6 mr-3"
              />
              Editar Perfil
            </button>
          </Link>
        </div>
        <Link href={`http://localhost:3000/${handle}`}>
          <div className="flex flex-row">
            <div className="inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg">
              <div className="text-xs md:text-md flex flex-col flex-wrap">
                <span className="font-bold">{handle}</span>
                <span>{role} Perfil m</span>
              </div>
              <div className="user-img">
                <img className="w-10 ml-5 rounded-full" src={avatar} />
              </div>
            </div>
            {/* <img
              className="w-6 mr-5 cursor-pointer"
              src="https://apod.nasa.gov/apod/image/2307/EagleStars_NASA_960.jpg"
              alt=""
            /> */}
            <img
              className="w-12 mr-5 cursor-pointer"
              src="https://e7.pngegg.com/pngimages/660/729/png-clipart-computer-icons-login-icon-design-exit-miscellaneous-angle.png"
              alt=""
              onClick={handleLogout}
            />
          </div>
        </Link>
      </header>
    </>
  );
};

export default UserHeader;
