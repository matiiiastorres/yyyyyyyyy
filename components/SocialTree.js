import Link from 'next/link';
import React from 'react';

const SocialTree = ({ social }) => {
  const { facebook, twitter, instagram, whatsapp, linkedin, github } = social;
  return (
    <>
      <div className="social flex flex-row justify-center my-4">
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
          target="_blank"
          href={`https://facebook.com/${facebook}`}
        >
          <img
            className="w-10"
            src="https://img.freepik.com/iconos-gratis/facebook-logo-esquinas-redondeadas_318-9850.jpg"
          />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
          target="_blank"
          href={`https://instagram.com/${instagram}`}
        >
          <img
            className="w-10"
            src="https://i.pinimg.com/originals/1e/d9/a0/1ed9a0fd507968861891b1098f480f4a.png"
          />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
        >
          <img
            className="w-10"
            src="https://w7.pngwing.com/pngs/507/666/png-transparent-computer-icons-whatsapp-whatsapp-text-logo-silhouette.png"
          />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
          target="_blank"
          href={`https://linkedin.com/${linkedin}`}
        >
          <img
            className="w-10"
            src="https://cdn-icons-png.flaticon.com/512/38/38669.png"
          />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
          target="_blank"
          href={`https://github.com/${github}`}
        >
          <img
            className="w-10"
            src="https://cdn-icons-png.flaticon.com/512/38/38401.png"
          />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
          target="_blank"
          href={`https://twitter.com/${twitter}`}
        >
          <img
            className="w-10"
            src="https://cdn-icons-png.flaticon.com/512/60/60580.png"
          />
        </Link>
      </div>
    </>
  );
};

export default SocialTree;
