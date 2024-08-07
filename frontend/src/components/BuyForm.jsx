// import React, { useState } from 'react';
// import axios from 'axios';
// import './BuyForm.css';

// const BuyForm = () => {
//   const [price, setPrice] = useState(0);
//   const [currency, setCurrency] = useState('INR');
//   const [solanaAmount, setSolanaAmount] = useState('');
//   const [totalSolana, setTotalSolana] = useState(0);

//   const handleSolanaAmountChange = (e) => {
//     const newAmount = e.target.value;
//     setSolanaAmount(newAmount);
//     fetchPrice(newAmount, currency);
//   };

//   const handleCurrencyChange = (e) => {
//     const newCurrency = e.target.value;
//     setCurrency(newCurrency);
//     fetchPrice(solanaAmount, newCurrency);
//   };

//   const fetchPrice = async (amount, currency) => {
//     try {
//       const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${currency.toLowerCase()}`);
//       setPrice(result.data.solana[currency.toLowerCase()] * amount);
//     } catch (error) {
//       console.error("Error fetching price", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/payments/buy', {
//         amount: price,
//         currency,
//       });

//       const { id, key_id } = response.data;

//       const options = {
//         key: key_id,
//         amount: price * 100,
//         currency,
//         name: 'SolaneX',
//         description: 'Test Transaction',
//         order_id: id,
//         handler: function (response) {
//           alert('Payment successful!');
//           setTotalSolana(totalSolana + parseFloat(solanaAmount));
//           setSolanaAmount('');
//           setPrice(0);
//         },
//         prefill: {
//           name: 'Test User',
//           email: 'test.user@example.com',
//           contact: '9999999999',
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       if (currency === 'USD') {
//         options.method = 'card';
//       } else {
//         options.method = 'upi';
//       }

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       alert('Payment failed!');
//     }
//   };

//   const getCurrencySymbol = (currency) => {
//     switch (currency) {
//       case 'USD':
//         return '$';
//       case 'INR':
//         return '₹';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="buy-form-container">
//       <div className="total-solana">
//         Total Solana: {totalSolana}
//       </div>
//       <form onSubmit={handleSubmit} className="buy-form">
//         <div className="form-group">
//           <label>Amount of Solana:</label>
//           <input
//             type="number"
//             value={solanaAmount}
//             onChange={handleSolanaAmountChange}
//             required
//             className="form-control form1-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>Currency:</label>
//           <select value={currency} onChange={handleCurrencyChange} className="form-control">
//             <option value="INR">INR</option>
//             <option value="USD">USD</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Price: {getCurrencySymbol(currency)}{price.toFixed(2)}</label>
//         </div>
//         <button type="submit" className="btn-submit">Buy</button>
//       </form>
//     </div>
//   );
// };

// export default BuyForm;



import React, { useState } from 'react';
import axios from 'axios';
import './BuyForm.css';

const BuyForm = ({ totalSolana, setTotalSolana }) => {
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const [solanaAmount, setSolanaAmount] = useState('');

  const handleSolanaAmountChange = (e) => {
    const newAmount = e.target.value;
    setSolanaAmount(newAmount);
    fetchPrice(newAmount, currency);
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    fetchPrice(solanaAmount, newCurrency);
  };

  const fetchPrice = async (amount, currency) => {
    try {
      const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${currency.toLowerCase()}`);
      setPrice(result.data.solana[currency.toLowerCase()] * amount);
    } catch (error) {
      console.error("Error fetching price", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/payments/buy', {
        amount: price,
        currency,
      });

      const { id, key_id } = response.data;

      const options = {
        key: key_id,
        amount: price * 100,
        currency,
        name: 'SolaneX',
        description: 'Test Transaction',
        order_id: id,
        handler: function (response) {
          alert('Payment successful!');
          setTotalSolana(totalSolana + parseFloat(solanaAmount));
          setSolanaAmount('');
          setPrice(0);
        },
        prefill: {
          name: 'Test User',
          email: 'test.user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      if (currency === 'USD') {
        options.method = 'card';
      } else {
        options.method = 'upi';
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Payment failed!');
    }
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'INR':
        return '₹';
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="buy-form">
      <div className="form-group">
        <label>Amount of Solana:</label>
        <input
          type="number"
          value={solanaAmount}
          onChange={handleSolanaAmountChange}
          required
          className="form-control form1-control"
        />
      </div>
      <div className="form-group">
        <label>Currency:</label>
        <select value={currency} onChange={handleCurrencyChange} className="form-control">
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div className="form-group">
        <label>Price: {getCurrencySymbol(currency)}{price.toFixed(2)}</label>
      </div>
      <button type="submit" className="btn-submit">Buy</button>
    </form>
  );
};

export default BuyForm;
