import { ToastContainer } from "react-toastify";

const FilteredLayout = ({ children }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default FilteredLayout;
