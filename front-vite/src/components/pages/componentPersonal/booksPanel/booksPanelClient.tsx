import { useSelector } from "react-redux";
import { RootState } from './../../../../utils/interface';


const BookClient = () => {
    const user = useSelector((state: RootState) => state.auth);


  return (
    <>
      {/* {user && user.role === "manager" && <BookPanelManager />} */}
    </>
  );
};

export default BookClient;
