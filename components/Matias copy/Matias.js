// // import { useState } from 'react';
// // import { uploadFile } from '../../firabaseConfig';
// // // import '../Matias/matias.css';

// // function Matias({ imagenurl, setimagenurl }) {
// //   const [file, setFile] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       //throw new Error('Fallo al subir');
// //       const result = await uploadFile(file);
// //       setimagenurl(result);
// //     } catch (error) {
// //       console.error(error);
// //       alert('Fallo interno. Intente mas tarde ');
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="w-100 rounded-full border-2 border-white shadow-md">
// //         <img
// //           className="torrescss"
// //           src={imagenurl}
// //           alt=""
// //           data-bs-target="#carouselExampleA"
// //           data-bs-slide-to="0"
// //         />

// //         <div>
// //           <form className="formulario" onSubmit={handleSubmit}>
// //             <input
// //               className="bg-yellow-500 w-62 px-2 py-2 rounded-md border-2 border-pink-800 shadow-md cursor-pointer text-white"
// //               type="file"
// //               name=""
// //               id=""
// //               onChange={(e) => setFile(e.target.files[0])}
// //             />
// //             <button className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white">
// //               Upload
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default Matias;

import { useState } from 'react';
import { uploadFile } from '../../firabaseConfig';
import Spinner2 from '../Spiner2';

function Matias({ avatar, setAvatar }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUrl = await uploadFile(file);
      setAvatar(imageUrl);
    } catch (error) {
      console.error(error);
      alert('Fallo interno. Intente más tarde.');
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img
          className=" w-32 rounded-full left-1/2 "
          src={avatar}
          alt=""
          data-bs-target="#carouselExampleA"
          data-bs-slide-to="0"
        />

        <div>
          <form
            className=" flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              className="  w-96 px-8  m-auto py-2 rounded-md border-2  "
              type="file"
              name=""
              id=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white">
              Subir
            </button>
          </form>
          {isLoading && (
            <div>
              <Spinner2 />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Matias;
