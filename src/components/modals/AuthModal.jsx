// // AuthModal.jsx
// import React from "react";
// import { Modal } from "react-bootstrap";
// import AuthForm from "../AuthForm";

// const AuthModal = ({ show, handleClose, mode }) => {
//   const isSignUp = mode === "signup";

//   return (
//     <Modal show={show} onHide={handleClose} centered backdrop="static" size="md">
//       <Modal.Header closeButton>
//         <Modal.Title>{isSignUp ? "Sign Up" : "Login"}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <AuthForm isSignUp={isSignUp} onClose={handleClose} />
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AuthModal;
