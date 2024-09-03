import React, { useState } from 'react';

const VigenereCipher = () => {
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [decodeText, setDecodeText] = useState("");
  const [isEncoding, setIsEncoding] = useState(true);

  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const generateTable = () => {
    let table_to_encrypt = {};
    for (const word of alphabet) {
      const index = alphabet.indexOf(word);
      let arr = alphabet.slice(index).concat(alphabet.slice(0, index));
      table_to_encrypt[word] = arr;
    }
    return table_to_encrypt;
  };

  const table = generateTable();

  console.log(table)

  const generateEncryptKey = (plain_text, cipher_key) => {
    let encrypt = "";
    while (encrypt.length < plain_text.length) {
      encrypt += cipher_key;
    }
    return encrypt.slice(0, plain_text.length);
  };

  const encode = () => {
    let cipher_text = "";
    const encrypt = generateEncryptKey(text, key);
    console.log(encrypt)

    for (let i = 0; i < text.length; i++) {
      if (alphabet.includes(text[i])) {
        const row = table[text[i]];
        const col = alphabet.indexOf(encrypt[i]);
        cipher_text += row[col];
      } else {
        cipher_text += text[i];
      }
    }

    return cipher_text;
  };

  const decode = (cipher_text) => {
    let decoded_text = "";
    const decrypt = generateEncryptKey(cipher_text, key);

    for (let i = 0; i < cipher_text.length; i++) {
      if (alphabet.includes(cipher_text[i])) {
        let row = table[decrypt[i]];
        let col = row.indexOf(cipher_text[i]);
        decoded_text += alphabet[col];
      } else {
        decoded_text += cipher_text[i];
      }
    }
    return decoded_text;
};

  const handleEncode = () => {
    const encryptedText = encode();
    setCipherText(encryptedText);
    setDecodeText("");
    setIsEncoding(true);
  };

  const handleDecode = () => {
    const decodedText = decode(text);
    setDecodeText(decodedText);
    setCipherText("");
    setIsEncoding(false);
};
  
  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Vigenère Cipher</h1>
        <form id="cipherForm">
          <div className="mb-4">
            <label htmlFor="textInput" className="block text-gray-300">Enter your text: </label>
            <textarea
              id="textInput"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="keyInput" className="block text-gray-300">Key</label>
            <input
              type="text"
              id="keyInput"
              value={key}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleEncode}
            >
              Encode
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={handleDecode}
            >
              Decode
            </button>
          </div>
          {isEncoding && cipherText && (
            <div className="mt-4">
              <h2 className="text-center text-xl font-bold text-white">Encoded Text:</h2>
              <p className="text-center text-white">{cipherText}</p>
            </div>
          )}
          {!isEncoding && decodeText && (
            <div className="mt-4">
              <h2 className="text-center text-xl font-bold text-white">Decoded Text:</h2>
              <p className="text-center text-white">{decodeText}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VigenereCipher;
