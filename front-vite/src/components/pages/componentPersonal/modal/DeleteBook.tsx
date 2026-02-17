import { useState } from "react";
import ReactModal from "react-modal";
import "../../componenMain/style/modal.css";
import { X } from "lucide-react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number | undefined;
}

// const API_URL = import.meta.env.VITE_API_URL ?? "";

const DeleteBook = ({ isOpen, onClose,
  //  bookId 
  }: IModalProps) => {
    const [message, setMessage] = useState('')


  const handleDelete = () => {

    console.log("книга удалена")
    setMessage("книга удалена")
    // fetch(`${API_URL}/api/admin/books/${bookId}`, {
    //     credentials: 'include',
    //     method: "DELETE"
    // })
    // .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else if (response.status === 400 || !response.ok) {
    //       return response.json().then((data) => {
    //         throw new Error(data.message || `Ошибка ${response.status}`);
    //       });
    //     }
    //   })
    // .then((result) => {
    //     setMessage('Книга успешно удалена')
    //     console.log(result)
    // })
  };

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <button className="button-close" onClick={onClose}>
          <X />
        </button>
        <div className="modal-delete ">
          <h3>Вы уверены что хотите удалить эту книгу?</h3>
          <div className="flex-delete">
            <button type="button" className="button-one" onClick={onClose}>
              Нет, вернуться назад
            </button>
            <button
              type="button"
              className="button-one"
              style={{ background: "#FF4347" }}
              onClick={handleDelete}
            >
              Да удалить книгу
            </button>
          </div>
        </div>
        <p>{message}</p>
      </ReactModal>
    </>
  );
};

export default DeleteBook;
