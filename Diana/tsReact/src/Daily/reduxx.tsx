import { useDispatch, useSelector } from 'react-redux';
import { deposit, withdraw } from './balanceSlice';
import { RootState } from './store'; // Import the type for the entire Redux state
import Navigation from '../Navigation';

const Bank = () => {
    const dispatch = useDispatch();
    const balance = useSelector((state: RootState) => state.balance.value); // Now TypeScript knows the structure

    const handleDeposit = () => {
        dispatch(deposit(10));
    };

    const handleWithdraw = () => {
        dispatch(withdraw(10));
    };

    return (
        
        <div>
            <Navigation />
            <h3>Current Balance: ${balance}</h3> {/* Displaying the balance */}
            <button onClick={handleDeposit}>Deposit $10</button>
            <button onClick={handleWithdraw}>Withdraw $10</button>
        </div>
    );
}

export default Bank;
