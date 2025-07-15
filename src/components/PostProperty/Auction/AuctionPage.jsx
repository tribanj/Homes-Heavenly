import React, { useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import AuctionPropertyForm from "./AuctionPropertyForm";

const AuctionPage = () => {
  return (
   <>
   <AuctionPropertyForm />
   </>
  );
};

export default AuctionPage;
