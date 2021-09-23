import styled from "styled-components";



import ReactModal from "react-modal";

 export const StyledModal = styled(ReactModal)`
   position: fixed;
   top: 50%;
   left: 50%;
   width: 350px;
   height: 200px;
   right: auto;
   bottom: auto;
   border-width: 5px;
   margin: 10px auto;
   border-radius: 8px;
   padding: 10px 20px 0px;
   margin-top: -8%;
   background-color: rgba(29, 49, 65, 0.8);

   padding: 1.2rem;
   z-index: 1031;
   transform: translate(-50%, -50%);
 `;
 // StyledModal.displayName = "StyledModal";

export  const CustomStyle = styled.button`
  margin-left: 3%;
  background-color: #008080;
  border: None;
  color: white;
  padding: 9px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
  font-size: 18px;
  font-weight: "bold";
`;
 // border:

 export const SubmitStyle = styled.button`
   margin-left: 3%;
   background-color: #008080;
   border: None;
   color: white;
   padding: 9px;
   padding-left: 10px;
   padding-right: 10px;
   cursor: pointer;
   width: 100px;
   border-radius: 4px;
 `;


