import { useDispatch, useSelector } from "react-redux";
import { commentPost, deletePost, likePost } from "../posts/postsSlice";
import { useEffect, useState } from "react";
import profileImg from "../assets/user-avatar.png";
import { FaUserCircle } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";
import { GoHeart } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

function Post({
  _id,
  name,
  title,
  imgUrl,
  content,
  likes,
  comments,
  setCurrentId,
  toggleModal,
  error,
  isLoading,
}) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  const userId = user?.result?._id;
const hasLikedPost = likes.length !== 0 && likes.find((like) => like === userId);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleDelete = () => {
    const postId = _id;
    dispatch(deletePost(postId));
    toggleOptions();
    toast.error("Deleted successfully");
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setCurrentId(_id);
    toggleOptions();
    toggleModal();
  };

  const handleLike = () => {
    if (user) {
      dispatch(likePost(_id));
    } else {
      toggleModal();
    }
  };

  const handleComment = () => {
    if (user) {
      dispatch(commentPost({ id: _id, comment }));
      setComment("");
      toast.info(`you commemted on ${name} post`);
    } else {
      toggleModal();
    }
  };

  return (
    <div className="max-w-lg bg-white w-96 shadow-md overflow-hidden rounded-lg relative flex-grow-0 h-full">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaUserCircle className="text-3xl" />
            <p className="text-gray-900 text-md leading-none">{name}</p>
          </div>
          {user?.result.name === name && (
            <div className="relative">
              <button
                className="flex items-center justify-center w-8 h-8"
                onClick={toggleOptions}
              >
                <FaEllipsisV />
              </button>
              {showOptions && (
                <div className="absolute top-8 right-0 flex flex-col space-y-2 bg-white border border-gray-200 rounded shadow-md">
                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">{title}</p>
          <img
            className="w-full object-cover h-48"
            src={imgUrl}
            alt="Post Image"
          />
          <p className="text-gray-700 mt-2">
            {showMore ? content : content.slice(0, 100)}
            {content.length > 100 && !showMore && (
              <button
                onClick={toggleShowMore}
                className="text-blue-500 hover:text-blue-600 focus:outline-none"
              >
                ... Read More
              </button>
            )}
            {showMore && (
              <button
                onClick={toggleShowMore}
                className="text-blue-500 hover:text-blue-600 focus:outline-none"
              >
                ... Read Less
              </button>
            )}
          </p>
        </div>
      </div>
      <div className="px-4 py-2 border-t border-gray-200 flex items-center gap-2">
        <div className="flex  cursor-pointer" onClick={handleLike}>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            {hasLikedPost ? (
              <GoHeartFill className="text-xl" fill="red" />
            ) : (
              <GoHeart className="text-xl" />
            )}

            {likes ? likes.length : "0"}
          </p>
        </div>

        <div
          className="flex items-center mt-1 cursor-pointer"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          {comments && (
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <GoComment className="text-xl" />

              {comments.length}
            </p>
          )}
        </div>
      </div>
      {showComments && (
        <div className="border absolute bottom-0 bg-white w-full rounded-xl overflow-hidden">
          <RxCross2
            className="absolute top-2 right-5 cursor-pointer text-xl"
            onClick={() => {
              setShowComments(!showComments);
            }}
          />
          <div className="h-48 overflow-x-auto scrollbar scrollbar-thumb scrollbar-track p-2">
            {comments.length !== 0 ? (
              comments.map((eachComment) => {
                return (
                  <div
                    key={crypto.randomUUID()}
                    className="flex gap-1 wrap items-center "
                  >
                    <img src={profileImg} alt="profile" className="h-10" />

                    <p className="text-sm">
                      <span className="font-bold">
                        {" "}
                        {eachComment.commentedUser.name}
                      </span>{" "}
                      {eachComment.comment}
                    </p>
                  </div>
                );
              })
            ) : (
              <>
                <p className=" text-xl flex items-center justify-center h-full font-semibold">
                  No Comments
                </p>
              </>
            )}
          </div>
          <div className={`flex ${!user && "border mt-1"} justify-center`}>
            {!user ? (
              <>
                <p className="p-2 ">
                  <span
                    className="text-blue-500 font-bold"
                    onClick={toggleModal}
                  >
                    login
                  </span>{" "}
                  to comment
                </p>
              </>
            ) : (
              <>
                {" "}
                <form onSubmit={handleComment} className="flex w-full border">
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="write a comment"
                    required
                  />
                  <button
                    className="text-blue-500 font-bold text-sm px-3 rounded shadow"
                    onClick={handleComment}
                  >
                    post
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
