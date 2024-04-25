import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate
import Navigation from '../Navigation';

const LoanApplicationForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [loanType, setLoanType] = useState('');
    const [isDocumentAvailable, setIsDocumentAvailable] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState({
        loanAmount: '',
        file: '' 
    });

    // Load the username from localStorage
    useEffect(() => {
        const storedName = localStorage.getItem('currentName'); // Ensure this key matches what you've set during login
        if (storedName) {
            setUsername(storedName); // Correct function to set username
        }
    }, []);

    // Handle form input changes
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
    
        switch (name) {
            case 'loanAmount':
                setLoanAmount(value);
                break;
            case 'loanType':
                setLoanType(value);
                break;
            default:
                break;
        }
    };
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDocumentAvailable(event.target.checked);
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file.type === "application/pdf") {
            setFile(file);
            setErrors(prev => ({ ...prev, file: '' }));
        } else {
            setErrors(prev => ({ ...prev, file: 'Only PDF files are allowed' }));
        }
    };
    
    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newErrors = { loanAmount: '', file: '' };
        let valid = true;
    
        if (!loanAmount.match(/^[0-9]+$/)) {
            newErrors.loanAmount = 'Loan amount must be numeric.';
            valid = false;
        }
    
        if (!file) {
            newErrors.file = 'Please upload a document.';
            valid = false;
        }
    
        setErrors(newErrors);
    
        if (!valid) return;
    
        // Create a new loan application object
        const newLoanApplication = {
    username,
    loanAmount,
    loanType,
    isDocumentAvailable,
    file: file ? file.name : undefined // Storing the file name for simplicity
};
    
        // Retrieve existing applications or initialize an empty array if none are found
        const existingApplications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
    
        // Add the new application to the list
        const updatedApplications = [...existingApplications, newLoanApplication];
    
        // Save the updated list of applications back to localStorage
        localStorage.setItem('loanApplications', JSON.stringify(updatedApplications));
    
        alert('Loan application submitted successfully!');
        navigate('/'); // Navigate to the submissions page or home page
    };
    
    return (
        <div>
            <header className='navbar'>
                <h1>My Loan</h1>
                <Navigation />
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} readOnly />
                </div>
                <div>
                    <label>Loan Amount:</label>
                    <input type="text" name="loanAmount" value={loanAmount} onChange={handleTextChange } />
                    {errors.loanAmount && <div style={{ color: 'red' }}>{errors.loanAmount}</div>}
                </div>
                <div>
                    <label>Type of Loan:</label>
                    <select name="loanType" value={loanType} onChange={handleTextChange }>
                        <option value="">Select Loan Type</option>
                        <option value="personal">Personal Loan</option>
                        <option value="home">Home Loan</option>
                        <option value="business">Business Loan</option>
                    </select>
                </div>
                <div>
                    <label>Is Document Available:</label>
                    <input type="checkbox" checked={isDocumentAvailable} onChange={handleCheckboxChange} />
                </div>
                <div>
                    <label>File (PDF only):</label>
                    <input type="file" onChange={handleFileChange} accept="application/pdf" />
                    {errors.file && <div style={{ color: 'red' }}>{errors.file}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoanApplicationForm;
