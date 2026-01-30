import React, { useState, useEffect, useRef } from 'react';

const CreateAlertModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        country: '',
        visaType: 'Tourist',
        status: 'Active'
    });
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/countries`);
            const data = await response.json();
            if (data.success) {
                setCountries(data.countries);
                setFilteredCountries(data.countries);
            }
        } catch (err) {
            console.error("Failed to fetch countries:", err);
        }
    };

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'country') {
            const filtered = countries.filter(country =>
                country.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCountries(filtered);
            setShowDropdown(true);
            setError('');
        }
    };

    const handleSelectCountry = (country) => {
        setFormData({ ...formData, country });
        setShowDropdown(false);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.country.trim()) {
            setError('Country is required');
            return;
        }

        const isValidCountry = countries.some(
            c => c.toLowerCase() === formData.country.trim().toLowerCase()
        );

        if (!isValidCountry) {
            setError('Please select a valid country from the list.');
            return;
        }

        const exactCountry = countries.find(
            c => c.toLowerCase() === formData.country.trim().toLowerCase()
        ) || formData.country;

        onCreate({ ...formData, country: exactCountry });
        setFormData({ country: '', visaType: 'Tourist', status: 'Active' });
        setError('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">Create New Alert</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100 flex items-start gap-2">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="relative" ref={dropdownRef}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            onFocus={() => {
                                setFilteredCountries(countries.filter(c => c.toLowerCase().includes(formData.country.toLowerCase())));
                                setShowDropdown(true);
                            }}
                            autoComplete="off"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                            placeholder="Search or Select Country"
                        />
                        {showDropdown && (
                            <ul className="absolute z-10 w-full mt-1 max-h-48 overflow-auto bg-white border border-slate-200 rounded-lg shadow-lg">
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelectCountry(country)}
                                            className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                                        >
                                            {country}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-3 py-2 text-sm text-slate-400 italic">No countries found</li>
                                )}
                            </ul>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Visa Type</label>
                        <select
                            name="visaType"
                            value={formData.visaType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
                        >
                            <option value="Tourist">Tourist</option>
                            <option value="Business">Business</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
                        >
                            <option value="Active">Active</option>
                            <option value="Booked">Booked</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm active:scale-[0.98]"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAlertModal;
