import React, { useEffect, useContext, useState } from 'react';
import LinkBox from '../components/LinkBox';
import UserHeader from '../components/UserHeader';
import { toast } from 'react-toastify';
import UserContext from '../context/userContext';

const dashboard = () => {
  const [data, setData] = useState({});
  const { setUserData } = useContext(UserContext);

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
        localStorage.setItem('userHandle', data.userData.handle);
        // toast.success(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="">
        <UserHeader />
        <main>
          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            <LinkBox
              lbTitle="Links"
              lbNumber={data.links}
              img
              src="https://e7.pngegg.com/pngimages/805/76/png-clipart-bar-chart-computer-icons-ups-and-downs-miscellaneous-text.png"
              className="w-6"
              lbTheme="red"
            />
            <LinkBox
              lbTitle="Growth"
              lbNumber="60%"
              img
              src="https://e7.pngegg.com/pngimages/805/76/png-clipart-bar-chart-computer-icons-ups-and-downs-miscellaneous-text.png"
              className="w-6"
              lbTheme="blue"
            />
            <LinkBox
              lbTitle="Click'S"
              lbNumber="12"
              img
              src="https://e7.pngegg.com/pngimages/805/76/png-clipart-bar-chart-computer-icons-ups-and-downs-miscellaneous-text.png"
              className="w-6"
              lbTheme="red"
            />
            <LinkBox
              lbTitle="Minut's"
              lbNumber="30%"
              img
              src="https://e7.pngegg.com/pngimages/805/76/png-clipart-bar-chart-computer-icons-ups-and-downs-miscellaneous-text.png"
              className="w-6"
              lbTheme="blue"
            />
          </section>
          <section></section>
        </main>
      </div>
    </>
  );
};

export default dashboard;
