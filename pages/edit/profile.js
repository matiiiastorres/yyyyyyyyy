import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserContext from '../../context/userContext';
import UserHeader from '../../components/UserHeader';
import { toast } from 'react-toastify';
import Matias from '../../components/Matias/Matias';
import MatiasBanner from '../../components/Matias Banner/MatiasBanner';

const profile = () => {
  const [imagenurl, setImagenurl] = useState('');
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);
  const [social, setSocial] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    whatsapp: '',
    linkedin: '',
    github: '',
  });
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(
    'https://cdn-icons-png.flaticon.com/64/4140/4140048.png'
  );
  const [banner, setBanner] = useState('');

  const handleSocial = (e) => {
    setSocial({
      ...social,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setBio(userData.bio);
      setAvatar(userData.avatar);
      setBanner(userData.banner);
    }
  }, [userData]);

  const saveProfile = (e) => {
    e.preventDefault();
    fetch(`https://tucuwallet-networking-back0-5.onrender.com/save/profile`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('TucuWalletToken'),
        name: name,
        bio: bio,
        avatar: avatar,
        banner: banner,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') return toast.error(data.error);
        toast.success('Perfil guardado exitosamente');
      });
  };

  const saveSocials = (e) => {
    e.preventDefault();
    fetch(`https://tucuwallet-networking-back0-5.onrender.com/save/socials`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('TucuWalletToken'),
        socials: social,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') return toast.error(data.error);
        toast.success('Redes sociales guardadas Exitosamente');
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('TucuWalletToken')) return router.push('/login');
    fetch(`https://tucuwallet-networking-back0-5.onrender.com/load/socials`, {
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
        if (data.status === 'error') return toast.error(data.error);
        setSocial(data.socials);
      });
  }, []);

  return (
    <>
      <div>
        <UserHeader />
        <main>
          <section>
            <div>
              <h4 className="font-bold text-center mb-5">Editar perfil</h4>
              <div>
                <h3>edit avatar</h3>
                <Matias avatar={avatar} setAvatar={setAvatar} />
                <h3>edit Banner</h3>
                <MatiasBanner banner={banner} setBanner={setBanner} />
                <form
                  onSubmit={saveProfile}
                  className="flex flex-col justify-center items-center"
                >
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/user.svg" alt="" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Nombre Completo"
                      required
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/bio.svg" alt="" />
                    <input
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Nombre de tu empresa o frase favorita"
                      required
                    />
                  </span>
                  {/* <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"></span> */}
                  <input
                    className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white"
                    type="submit"
                    value="Guardar "
                  />
                </form>
              </div>
            </div>
            <div className="mt-14">
              <h4 className="font-bold text-center mb-5">
                Editar tus redes Sociales
              </h4>
              <div>
                <form
                  onSubmit={saveSocials}
                  className="flex flex-col justify-center items-center"
                >
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/facebook.svg" alt="" />
                    <input
                      id="facebook"
                      value={social.facebook}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Facebook ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/instagram.svg" alt="" />
                    <input
                      id="instagram"
                      value={social.instagram}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Instagram ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/twt.svg" alt="" />
                    <input
                      id="twitter"
                      value={social.twitter}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Twitter ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/lnkdn.svg" alt="" />
                    <input
                      id="linkedin"
                      value={social.linkedin}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Linkedin ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/github.svg" alt="" />
                    <input
                      id="github"
                      value={social.github}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Github ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-6 mr-2" src="/svg/yt.svg" alt="" />
                    <input
                      id="whatsapp"
                      value={social.whatsapp}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Whatsapp number"
                    />
                  </span>
                  <input
                    className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer mb-10 text-white"
                    type="submit"
                    value="Guardar"
                  />
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default profile;
