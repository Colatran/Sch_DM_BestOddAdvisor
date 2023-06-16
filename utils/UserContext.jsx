import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [registed, setRegisted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [_docId, _setDocId] = useState("");
  const [_uid, _setUid] = useState("");
  const [_userName, _setUserName] = useState("");
  const [_email, _setEmail] = useState("");
  const [_birthDate, _setBirthDate] = useState(new Date());
  const [_image, _setImage] = useState(null);


  return (
    <UserContext.Provider
      value={{
        registed,   setRegisted,
        isAdmin,    setIsAdmin,
        _docId,     _setDocId,
        _uid,       _setUid,
        _userName,  _setUserName,
        _email,     _setEmail,
        _birthDate, _setBirthDate,
        _image,     _setImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};