import { ToastContainer } from "react-toastify";

const BookmarkLayout = ({ children }) => {
  return (
    <div>
      <ToastContainer />
      {children}
    </div>
  );
};

export default BookmarkLayout;
