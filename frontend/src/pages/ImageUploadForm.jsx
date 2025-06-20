import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ImageDetailForm from '@/components/imageDetailForm';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isFrozen, setIsFrozen] = useState(true);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [showUploadUI, setShowUploadUI] = useState(true);

  const isMobile = window.innerWidth < 768;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));

      if (!isMobile) {
        // On web, form stays frozen until button click
        setShowUploadUI(true);
      }
    }
  };

  const handleUploadNewClick = () => {
    if (isMobile) {
      // On mobile, hide upload UI and show details form
      setShowUploadUI(false);

      // Optional 2 sec delay before showing form
      setTimeout(() => {
        setShowDetailsForm(true);
        setIsFrozen(false);
      }, 2000); // adjust or remove delay if needed
    } else {
      // On web, unfreeze form
      setIsFrozen(false);
    }
  };

  const UploadBox = () => (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full h-full bg-gray-200">
      <label className="cursor-pointer ">
        <input type="file" className="hidden w-full" onChange={handleImageUpload} />
        <div className="flex flex-col items-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V4m0 0l-4 4m4-4l4 4m4 12h4m0 0v-4m0 4l-4-4m4 4l4-4M3 20h4"
            />
          </svg>
          <span className="text-gray-500 mt-2">Click to upload image</span>
        </div>
      </label>
    </div>
  );

const UploadedImageView = () => (
  <div className="flex flex-col items-center w-full space-y-2 p-4">
    <img src={imageURL} alt="Uploaded" className="max-w-full rounded shadow" />

    <div className="w-full flex flex-col space-y-2">
      <input
        type="file"
        className="hidden"
        id="upload-new-file"
        onChange={handleImageUpload}
      />
      <Button className="w-full" onClick={handleUploadNewClick}>
        Proceed to Details
      </Button>
      
      <label htmlFor="upload-new-file">
        <Button className="w-full" type="button">
          Upload New Image
        </Button>
      </label>

    </div>
  </div>
);


  return (
    <div className="w-full h-full p-4 md:flex justify-center ">
      <div className="flex w-full h-full md:w-7/8 items-center justify-center border-2 rounded-2xl p-2 ">
        <div className="flex flex-col md:flex-row md:space-x-4 w-full h-full ">
          {/* LEFT (mobile: takes full width, web: half) */}
          <div className="w-full h-full md:w-1/2 space-y-4">
            {isMobile ? (
              showUploadUI
                ? (image ? <UploadedImageView /> : <UploadBox />)
                : (showDetailsForm && <ImageDetailForm frozen={isFrozen} image={image} imageURL={imageURL} />)
            ) : (
              image ? <UploadedImageView /> : <UploadBox />
            )}
          </div>

          {/* RIGHT (only on web) */}
          {!isMobile && (
            <div className="w-full h-full md:w-1/2">
              <ImageDetailForm frozen={isFrozen} image={image} imageURL={imageURL} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ImageUploadForm;
