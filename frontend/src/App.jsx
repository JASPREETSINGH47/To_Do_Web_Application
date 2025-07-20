// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [inputs, setInputs] = useState([""]);
//   const [fetchedItems, setFetchedItems] = useState([]);

//   const addInput = () => {
//     setInputs([...inputs, ""]);
//   };

//   const handleChange = (value, index) => {
//     const updatedInputs = [...inputs];
//     updatedInputs[index] = value;
//     setInputs(updatedInputs);
//   };

//   const submitItems = async () => {
//     try {
//       const response = await axios.post('http://localhost:2000/users/list', {
//         item: inputs,
//       });
//       console.log("Submitted:", response.data);
//       alert("Items submitted successfully!");
//       setInputs([""]); // Clear inputs
//       fetchItems();    // Refresh fetched list
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Failed to submit items.");
//     }
//   };

//   const fetchItems = async () => {
//     try {
//       const response = await axios.post('http://localhost:2000/users/getlist');
//       if (response.data.success) {
//         console.log("Fetched:", response.data.list);
//         setFetchedItems(response.data.list);
//       }
//     } catch (error) {
//       console.error("Fetching error:", error);
//     }
//   };

//   const deleteItem = async (id) => {
//     try {
//       await axios.post('http://localhost:2000/users/deleteitem', { id }); // Adjust URL if using DELETE method
//       alert("Item deleted successfully!");
//       fetchItems(); // Refresh the list after deletion
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Failed to delete item.");
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   return (
//     <div className='container'>
//       <div className='m-auto bg-primary-subtle border p-2 border-primary border-5 rounded-3 text-center'>
//         <h1 className='text-primary'>TO DO LIST</h1>
//       </div>

//       <div className='d-flex flex-column mt-5 col-6 m-auto'>
//         {inputs.map((value, index) => (
//           <input
//             key={index}
//             value={value}
//             onChange={(e) => handleChange(e.target.value, index)}
//             className='m-1 border border-2 fs-2 border-primary-subtle rounded-3'
//             type="text"
//           />
//         ))}
//       </div>

//       <button onClick={submitItems} className='btn btn-outline-primary m-auto d-flex mt-3'>
//         Add Item
//       </button>

//       <button onClick={addInput} className='btn btn-outline-success rounded-5 m-auto mt-2'>
//         +
//       </button>

//       <div className='mt-5 col-6 m-auto'>
//         <h3 className='text-center text-success'>Fetched Items</h3>
//         <ul className='list-group'>
//           {fetchedItems.map((item) => (
//             <li key={item.id} className='list-group-item fs-5 d-flex justify-content-between align-items-center'>
//               {item.item}
//               <button
//                 className='btn btn-sm btn-outline-danger border border-danger'
//                 onClick={() => deleteItem(item.id)}
//               >
//                 ⛌
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputs, setInputs] = useState([""]);
  const [fetchedItems, setFetchedItems] = useState([]);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleChange = (value, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const submitItems = async () => {
    try {
      const response = await axios.post('http://localhost:2000/users/list', {
        item: inputs,
      });
      console.log("Submitted:", response.data);
      setInputs([""]); // Clear inputs
      fetchItems();    // Refresh fetched list
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.post('http://localhost:2000/users/getlist');
      if (response.data.success) {
        console.log("Fetched:", response.data.list);
        setFetchedItems(response.data.list);
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.post('http://localhost:2000/users/deleteitem', { id });
      console.log("Item deleted:", id);
      fetchItems(); // Refresh the list after deletion
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='container'>
      <div className='m-auto bg-primary-subtle border p-2 border-primary border-5 rounded-3 text-center'>
        <h1 className='text-primary'>TO DO LIST</h1>
      </div>

      <div className='d-flex flex-column mt-5 col-6 m-auto'>
        {inputs.map((value, index) => (
          <input
            key={index}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            className='m-1 border border-2 fs-2 border-primary-subtle rounded-3'
            type="text"
          />
        ))}
      </div>

      <button onClick={submitItems} className='btn btn-outline-primary m-auto d-flex mt-3'>
        Add Item
      </button>

      <button onClick={addInput} className='btn btn-outline-success rounded-5 m-auto mt-2'>
        +
      </button>

      <div className='mt-5 col-6 m-auto'>
        <h3 className='text-center text-success'>Fetched Items</h3>
        <ul className='list-group'>
          {fetchedItems.map((item) => (
            <li key={item.id} className='list-group-item fs-5 d-flex justify-content-between align-items-center'>
              {item.item}
              <button
                className='btn btn-sm btn-outline-danger border border-danger'
                onClick={() => deleteItem(item.id)}
              >
                ⛌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
