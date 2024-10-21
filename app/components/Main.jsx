'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'
import { useSearchParams, useRouter } from 'next/navigation'

const Main = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [loading,setLoading]=useState(true);

  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);
  const router = useRouter();

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }  setLoading(false);
  }  , [pasteId]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36), // Use existing pasteId if present
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
      
    }
  

    // Clear form and navigate back to the home page
    setTitle('');
    setValue('');
    router.push('/'); // Navigate back to the home page
  
  }
if(loading){
  return  (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="flex items-center mb-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
      <h2 className="text-xl font-semibold text-gray-700">Loading, please wait...</h2>
      <p className="text-gray-500 mt-2">Have a Good Day </p>
    </div>
  );
}

  return (
    <div className="p-4 flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 space-y-4 md:space-y-0 md:space-x-4">
       <div>
       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400 mb-6 text-center shadow-sm">
  Your Codes Saver App
</h2>
</div>
      <div className="w-full md:w-1/2 max-w-md bg-blue-200 rounded-lg shadow-lg p-6">
        <input
          type="text"
          className="rounded-2xl p-3 border w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex space-x-2">
          <button 
            onClick={createPaste}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {pasteId ? "Update" : "Create"}
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 max-w-md">
        <textarea
          placeholder="Type your content here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          className="w-full rounded-2xl p-3 bg-blue-200 border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    </div>
  );
}

export default Main;
