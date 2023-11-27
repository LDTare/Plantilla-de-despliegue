import React, { useState } from 'react';

const PasswordInput = () => {
 const [password, setPassword] = useState('');
 const [isValid, setIsValid] = useState(false);

 const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);

    return hasCapitalLetter && hasSpecialCharacter && hasNumber;
 };

 const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setIsValid(validatePassword(value));
 };

 return (
    <div>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter a password"
      />
      {isValid && <p>The password is valid.</p>}
      {!isValid && <p>The password should contain at least one capital letter, one special character, and one number.</p>}
    </div>
 );
};

export default PasswordInput;