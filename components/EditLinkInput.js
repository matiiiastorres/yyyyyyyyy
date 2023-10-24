import React, { useEffect, useState } from 'react';
import CameraIcon from '../public/images/cameraIcon.webp';
import Image from 'next/image';

const EditLinkInput = ({ link, onChange, index, onClickRemove }) => {
  const [imagePreview, setImagePreview] = useState(CameraIcon);

  useEffect(() => {
    if (link.icon instanceof File) {
      const imageUrl = URL.createObjectURL(link.icon);
      setImagePreview(imageUrl);
    } else if (link.icon && link.icon.includes('firebase')) {
      setImagePreview(link.icon);
    } else {
      setImagePreview(CameraIcon);
    }
  }, [link.icon]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(index, 'icon', file);
    }
  };

  return (
    <div className="flex items-center gap-5 my-12">
      <figure className="h-14 w-14 relative rounded-full overflow-hidden">
        <Image
          src={imagePreview}
          alt="icon"
          fill={true}
          sizes="(max-width: 56px)"
          style={{ objectFit: 'cover' }}
        />
      </figure>
      <div className="flex flex-col  gap-5">
        <label className="flex items-center gap-x-4">
          <span className="font-bold">Link</span>
          <input
            name="url"
            className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
            value={link?.url}
            onChange={(e) => onChange(index, 'url', e.target.value)}
          />
        </label>

        <label className="flex items-center gap-x-4">
          <span className="font-bold">Título</span>
          <input
            name="title"
            className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none "
            value={link?.title}
            onChange={(e) => onChange(index, 'title', e.target.value)}
          />
        </label>

        <label className="flex items-center gap-x-4">
          <span className="font-bold">Icono</span>
          <input
            accept="image/*"
            name="icon"
            className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none "
            type="file"
            onChange={handleImageChange}
            capture
          />
        </label>
      </div>

      <button
        className="bg-cyan-500 text-white px-4 py-2 rounded-md shadow-sm ml-3"
        onClick={() => onClickRemove(index)}
      >
        Borrar link
      </button>
    </div>
  );
};

export default EditLinkInput;
