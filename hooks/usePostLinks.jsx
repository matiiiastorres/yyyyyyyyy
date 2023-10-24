import { uploadFile } from '../firabaseConfig';
import { useState } from 'react';
import { toast } from 'react-toastify';

const usePostLinks = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postLinks = async (linksData) => {
    setIsLoading(true);

    const finalLinksArray = [];
    for (const link of linksData) {
      const { icon } = link;

      if (icon instanceof File) {
        try {
          const uploadedIconUrl = await uploadFile(icon);

          const updatedIconData = { ...link, icon: uploadedIconUrl };
          finalLinksArray.push(updatedIconData);
        } catch (error) {
          console.error('Error uploading icon:', error);

          finalLinksArray.push(link);
        }
      } else {
        finalLinksArray.push(link);
      }
    }
    fetch(`https://tucuwallet-networking-back0-5.onrender.com/save/links`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('TucuWalletToken'),
        links: finalLinksArray,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') {
          toast.error(data.error);
        } else {
          toast.success('Links guardados Exitosamente');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setIsLoading(false);
      });
  };

  return { isLoading, postLinks };
};

export default usePostLinks;
