import React, { useState } from 'react';

const Poly = () => {

    const [text, setText] = useState("");
    const [cipher, setCipher] = useState("");
    const [decode, setDecode] = useState("");
    const [selectedEncode, setSelectedEncode] = useState(false);
    const [selectedDecode, setSelectedDecode] = useState(false);

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const Array1 = ['Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N',
        'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const Array2 = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
        'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const Array3 = ['L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'Z',
        'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M'];

    function encodeCipher() {
        let count = 0;
        let cipherText = "";

        for (const letter of text) {
            let index = alphabet.indexOf(letter.toUpperCase());

            if (index === -1) {
                cipherText += letter;
            } else {
                if (letter === letter.toLowerCase()) {
                    if (count % 3 === 0) {
                        cipherText += Array1[index].toLowerCase();
                    } else if (count % 3 === 1) {
                        cipherText += Array2[index].toLowerCase();
                    } else if (count % 3 === 2) {
                        cipherText += Array3[index].toLowerCase();
                    }
                } else if (letter === letter.toUpperCase()) {
                    if (count % 3 === 0) {
                        cipherText += Array1[index];
                    } else if (count % 3 === 1) {
                        cipherText += Array2[index];
                    } else if (count % 3 === 2) {
                        cipherText += Array3[index];
                    }
                }
            }

            count += 1;
        }

        return cipherText;
    }

    function decodeCipher(cipher) {
        let decodedText = '';
        let count = 0;

        for (const letter of cipher) {
            let index;
            let decodedLetter = letter;

            if (letter.toUpperCase() !== letter.toLowerCase()) {
                if (count % 3 === 0) {
                    index = Array1.indexOf(letter.toUpperCase());
                } else if (count % 3 === 1) {
                    index = Array2.indexOf(letter.toUpperCase());
                } else if (count % 3 === 2) {
                    index = Array3.indexOf(letter.toUpperCase());
                }

                if (index !== -1) {
                    decodedLetter = alphabet[index];
                    if (letter === letter.toLowerCase()) {
                        decodedLetter = decodedLetter.toLowerCase();
                    }
                }

                count += 1;
            }

            decodedText += decodedLetter;
        }

        return decodedText;
    }

    const handleCipher = () => {
        const encodedText = encodeCipher();
        setCipher(encodedText);
        setSelectedEncode(true);
        setSelectedDecode(false);
    }

    const handleDecode = () => {
        const decodedText = decodeCipher(cipher);
        console.log(decodedText);
        setDecode(decodedText);
        setSelectedDecode(true);
        setSelectedEncode(false);
    }

    return (
        <div className="bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-white">Polyalphabetic Cipher</h1>
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
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleCipher}
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
                    {selectedEncode ? (
                        <div className="mt-4">
                            <h2 className="text-center text-xl font-bold text-white">Encoded Text:</h2>
                            <p className="text-center text-white">{cipher}</p>
                        </div>
                    ) : selectedDecode ? (
                        <div className="mt-4">
                            <h2 className="text-center text-xl font-bold text-white">Decoded Text:</h2>
                            <p className="text-center text-white">{decode}</p>
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    );
};

export default Poly;
