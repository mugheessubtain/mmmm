import { BASE_URL } from '@/constant/constant';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoanApplicationForm = () => {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [guarantors, setGuarantors] = useState([
        { name: '', email: '', location: '', cnic: '', },
        { name: '', email: '', location: '', cnic: '', }
    ]);
    const [message, setMessage] = useState('');
    const route=useRouter();

    const handleGuarantorChange = (index: number, field: keyof typeof guarantors[0], value: string) => {
        const newGuarantors = [...guarantors];
        newGuarantors[index][field] = value;
        setGuarantors(newGuarantors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (guarantors.some(g => !g.name || !g.email)) {
            setMessage('At least one valid guarantor is required.');
            return;
        }

        const data = {
            email,
            address,
            phoneNumber,
            guarantors
        };

        try {
            const response = await fetch(`${BASE_URL}api/loan/submitLoan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Loan request updated successfully!');
                route.push(`/dashboard/${email}`)
            } else {
                setMessage(result.message || 'Failed to update loan request.');
            }
        } catch (error) {
            setMessage('Failed to submit loan request. Please try again later.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Loan Application Update</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <h3 className="text-xl font-semibold mt-6">Guarantors</h3>
                {guarantors.map((guarantor, index) => (
                    <div key={index} className="space-y-4 mt-4 p-4 border border-gray-200 rounded-md">
                        <h4 className="text-lg font-medium">Guarantor {index + 1}</h4>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name:</label>
                            <input
                                type="text"
                                value={guarantor.name}
                                onChange={(e) => handleGuarantorChange(index, 'name', e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                value={guarantor.email}
                                onChange={(e) => handleGuarantorChange(index, 'email', e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location:</label>
                            <input
                                type="text"
                                value={guarantor.location}
                                onChange={(e) => handleGuarantorChange(index, 'location', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">CNIC:</label>
                            <input
                                type="text"
                                value={guarantor.cnic}
                                onChange={(e) => handleGuarantorChange(index, 'cnic', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </div>
                ))}

                <div>
                    <button
                        type="submit"

                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >

                        Update Loan Request
                    </button>
                </div>
            </form>

            {message && <p className="mt-4 text-red-600">{message}</p>}
        </div>
    );
};

export default LoanApplicationForm;
