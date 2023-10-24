// import EditLinkInput from '../components/EditLinkInput';
// import UserHeader from '../../components/UserHeader';
// import React, { useState, useEffect, useContext } from 'react';
// import { toast } from 'react-toastify';
// import { uploadFile } from '../../firabaseConfig';

// const links = () => {
//   const [links, setLinks] = useState([{ url: '', title: '', icon: '' }]);
//   const [title] = useState('');

//   const handleLinkChange = (index, field, value) => {
//     const updatedLinks = [...links];
//     const linkToUpdate = { ...updatedLinks[index], [field]: value };
//     updatedLinks[index] = linkToUpdate;
//     setLinks(updatedLinks);
//   };

//   const handleAddLink = () => {
//     setLinks([...links, { url: '', title: '', icon: '' }]);
//   };

//   const handleRemoveLink = (index) => {
//     const updatedLinks = [...links];
//     updatedLinks.splice(index, 1);
//     setLinks(updatedLinks);
//   };

//   const saveLinks = async (e) => {
//     e.preventDefault();
//     const linksArray = Object.values(links);

//     // const titlesArray = Object.values(title);
//     // const linksData = linksArray.map((link, index) => ({
//     //   link,
//     //   title: titlesArray[index],
//     // }));

//     const linksWithIcon = [];

//     for (const link of linksArray) {
//       const { icon } = link;

//       if (icon) {
//         try {
//           const uploadedIconUrl = await uploadFile(icon);

//           const updatedIconData = { ...link, icon: uploadedIconUrl };
//           linksWithIcon.push(updatedIconData);
//         } catch (error) {
//           console.error('Error uploading icon:', error);

//           linksWithIcon.push(link);
//         }
//       } else {
//         linksWithIcon.push(link);
//       }
//     }

//     // fetch(`https://tucuwallet-networking-back0-5.onrender.com/save/links`, {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-type": "application/json",
//     //   },
//     //   body: JSON.stringify({
//     //     tokenMail: localStorage.getItem("TucuWalletToken"),
//     //     links: linksData,
//     //   }),
//     // })
//     //   .then((res) => res.json())
//     //   .then((data) => {
//     //     if (data.status === "error") return toast.error(data.error);
//     //     toast.success("Links guardados Exitosamente");
//     //   })
//     //   .catch((err) => {
//     //     toast.error(err.message);
//     //   });
//   };

//   useEffect(() => {
//     if (!localStorage.getItem('TucuWalletToken')) return router.push('/login');
//     fetch(`https://tucuwallet-networking-back0-5.onrender.com/load/links`, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({
//         tokenMail: localStorage.getItem('TucuWalletToken'),
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === 'error') return toast.error(data.error);
//         setLinks(data.links);
//       });
//   }, []);

//   return (
//     <>
//       <div>
//         <UserHeader />
//         <main>
//           <section>
//             <h1 className="text-center font-bold text-xl text-gray-600">
//               Agrega o cambia tus link's
//             </h1>
//             <div>
//               <form onSubmit={saveLinks}>
//                 {links.map((link, index) => (
//                   <EditLinkInput
//                     key={index}
//                     link={link}
//                     index={index}
//                     onChange={handleLinkChange}
//                     onClickRemove={handleRemoveLink}
//                   />
//                 ))}

//                 <div className="buttons flex flex-row gap-5 my-1">
//                   <button
//                     className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm w-full"
//                     type="button"
//                     onClick={handleAddLink}
//                   >
//                     Agrega tus link's favoritos
//                   </button>
//                   <button
//                     className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm w-full"
//                     type="submit"
//                   >
//                     Guardar
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// };

// export default links;

import EditLinkInput from '../../components/EditLinkInput';
import UserHeader from '../../components/UserHeader';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import usePostLinks from '../../hooks/usePostLinks';
import Spinner from '../../components/Spiner';

const links = () => {
  const [links, setLinks] = useState([{ url: '', title: '', icon: '' }]);

  const [tieneCambios, setTieneCambios] = useState(false);

  const handleLinkChange = (index, field, value) => {
    setTieneCambios(true);
    const updatedLinks = [...links];
    const linkToUpdate = { ...updatedLinks[index], [field]: value };
    updatedLinks[index] = linkToUpdate;
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { url: '', title: '', icon: '' }]);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
    setTieneCambios(true);
  };

  const { isLoading, postLinks } = usePostLinks();

  const saveLinks = async (e) => {
    e.preventDefault();
    setTieneCambios(false);
    await postLinks(links);
  };

  useEffect(() => {
    if (!localStorage.getItem('TucuWalletToken')) return router.push('/login');
    fetch(`https://tucuwallet-networking-back0-5.onrender.com/load/links`, {
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
        setLinks(data.links);
      });
  }, []);

  return (
    <div>
      <UserHeader />
      <main className="max-w-5xl mx-auto">
        <section>
          <h1 className="text-center font-bold text-xl text-gray-600">
            Agrega o cambia tus link's
          </h1>
          <form
            onSubmit={saveLinks}
            className="relative flex justify-center flex-col items-center"
          >
            {links?.map((link, index) => (
              <EditLinkInput
                key={index}
                link={link}
                index={index}
                onChange={handleLinkChange}
                onClickRemove={handleRemoveLink}
              />
            ))}

            <div className="buttons flex flex-row gap-5 my-1 w-full">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm w-full"
                type="button"
                onClick={handleAddLink}
              >
                Agrega tus link's favoritos
              </button>
              <button
                className="bg-green-500 disabled:bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm w-full"
                type="submit"
                disabled={!tieneCambios}
              >
                Guardar
              </button>
            </div>
            {isLoading && (
              <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
                <Spinner />
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default links;
