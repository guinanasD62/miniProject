import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoanApplication {
    
  username: string;
  loanAmount: string;
  loanType: string;
  isDocumentAvailable: boolean;
  file: string;
}

const LoanApplicationsList: React.FC = () => {
    const navigate = useNavigate();
    const [loans, setLoans] = useState<LoanApplication[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Load the loan applications from localStorage
        const loadedLoans = JSON.parse(localStorage.getItem('loanApplications') || '[]') as LoanApplication[];
        setLoans(loadedLoans);
    }, []);

    const handleDelete = (index: number) => {
        const newLoans = [...loans];
        newLoans.splice(index, 1);
        localStorage.setItem('loanApplications', JSON.stringify(newLoans));
        setLoans(newLoans); // Update local state
    };

    const handleEdit = (loan: LoanApplication) => {
        // Pass the loan data to the LoanApplicationForm route using state: loan includes an 'id' property
        navigate('/loan', { state: { ...loan } });
    };

    const filteredLoans = search
        ? loans.filter(
            (loan) =>
                loan.username.toLowerCase().includes(search.toLowerCase()) ||
                loan.loanType.toLowerCase().includes(search.toLowerCase())
        )
        : loans;

    return (
      <div className="root">
       {/* <label>Search: </label> */}
        <input
        className="search-input"
        type="text"
        placeholder="Search by Username or Loan Type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="table-container">
        <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Loan Amount</th>
                        <th>Loan Type</th>
                        <th>Document Available</th>
                        <th>File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLoans.map((loan, index) => (
                        <tr key={index}>
                            <td>{loan.username}</td>
                            <td>{loan.loanAmount}</td>
                            <td>{loan.loanType}</td>
                            <td>{loan.isDocumentAvailable ? 'Yes' : 'No'}</td>
                            <td>{loan.file}</td>
                            <td>
                                <button onClick={() => handleEdit(loan)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>

    );
};


export default LoanApplicationsList;

