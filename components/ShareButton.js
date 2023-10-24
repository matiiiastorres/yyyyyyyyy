import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const ShareButton = () => {
  const router = useRouter();
  const copyLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/${router.query.handle}`
    );
    toast('Copied to clipboard');
  };
  return (
    <>
      <div>
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.es%2Ficono-gratis%2Fsimbolo-de-compartir_25702&psig=AOvVaw3L_vEXE4zC0OSr5hTAWqEq&ust=1690423113778000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjj1v2iq4ADFQAAAAAdAAAAABAE"
          className="absolute cursor-pointer top-28 left-10 bg-indigo-200 p-2 rounded-md z-10 shadow-md border-2 border-indigo-400  "
          onClick={copyLink}
        />
      </div>
    </>
  );
};

export default ShareButton;
