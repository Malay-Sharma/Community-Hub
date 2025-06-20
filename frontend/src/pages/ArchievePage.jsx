import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ArchievePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(location.state?.image || null);
  const [post, setPost] = useState(location.state?.post || null);

  useEffect(() => {
    const fetchImageAndPost = async () => {
      try {
        let img = image;

        if (!img) {
          const res = await axios.get(`http://localhost:4000/api/images/imagekit/${id}`, {
            withCredentials: true,
          });
          img = res.data.image;
          setImage(img);
        }

        if (img && !post) {
          const postId = img.name.split("_")[0];
          const postRes = await axios.get(`http://localhost:4000/api/images/mongo/${postId}`, {
            withCredentials: true,
          });
          setPost(postRes.data.post);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImageAndPost();
  }, [id, image, post]);


  if (!image) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading image...
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to All Posts
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-4">{image.name}</h1>
      <img
        src={image.url}
        alt={image.name}
        className="max-w-full max-h-[80vh] rounded shadow-md"
      />
      <div className="mt-4">
        <p><strong>ID:</strong> {image.fileId}</p>
        <p><strong>Name:</strong> {image.name}</p>
        <p><strong>Path:</strong> {image.filePath}</p>
        <p><strong>Type:</strong> {image.fileType}</p>
        <p><strong>Size:</strong> {(image.size / 1024).toFixed(2)} KB</p>
        <p><strong>Dimensions:</strong> {image.width} x {image.height}</p>
        <p><strong>Uploaded:</strong> {new Date(image.createdAt).toLocaleString()}</p>
      </div>


      {post ? (
        <div className="mt-6 w-full max-w-2xl bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Post Details</h2>
          <p><strong>Caption:</strong> {post.caption}</p>
          <p><strong>Visibility:</strong> {post.visibility}</p>
          <p><strong>Author:</strong> {post.author}</p>
        </div>
      ) : (
        <div className="mt-6 text-gray-500">Loading post details...</div>
      )}
      
    </div>
  );
};

export default ArchievePage;
