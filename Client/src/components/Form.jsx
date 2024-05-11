import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../posts/postsSlice";
import { toast } from "react-toastify";

function Form({ currentId, setCurrentId, isOpen, onClose }) {
  const [post, setPost] = useState({ title: "", content: "", imgUrl: "" });
  const postData = useSelector((state) =>
    currentId ? state.posts.data.find((post) => post._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  const clear = () => {
    setCurrentId(0);
    setPost({
      title: "",
      content: "",
      imgUrl: "",
    });
  };

  useEffect(() => {
    if (!postData?.title) clear();
    if (postData) setPost(postData);
  }, [postData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...post, name: user?.result.name }));
      clear();
      onClose();
      toast.success("posted successfully");
    } else {
      dispatch(
        updatePost({
          id: currentId,
          post: { ...post, name: user?.result.name },
        })
      );
      clear();
      onClose();
      toast.success("Edited successfully");
    }
  };

  if (!user) {
    return;
  }
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center w-full h-full p-4">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="relative max-w-md w-full bg-slate-100 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-center py-4">
            {currentId ? "Edit post" : "Create Post"}
          </h1>
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                value={post.content}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                placeholder="Enter post content"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Image URL
              </label>
              <input
                id="imgUrl"
                name="imgUrl"
                type="text"
                onChange={(e) => setPost({ ...post, imgUrl: e.target.value })}
                value={post.imgUrl}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the img URL"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {currentId ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
