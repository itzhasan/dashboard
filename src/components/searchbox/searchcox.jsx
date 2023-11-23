import "./searchbox.css"
import { FiSearch } from "react-icons/fi";
import { useAppStore } from "../../store";
import { useState } from 'react';

const SearchBox = () => {
    const [value, setValue] = useState();
    const { setSearchKey } = useAppStore();

    return (
        <div className="search-box">
            <input 
            placeholder="Find Prodect" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
               if (e.key === "Enter") {
                    setSearchKey(value);
               }
        }} />
            <button>
                <FiSearch />
            </button>
        </div>
    
    );
};


export default SearchBox;