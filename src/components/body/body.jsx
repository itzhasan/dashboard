import SearchBox from "../searchbox/searchcox";
import "./body.css"
import Table from "../table/table";
import Addbut from "../add_product/add";
const Body = () => {
   


    return (
        <div className="main-controles">
            <div className="search-controls">
                <SearchBox />
                <Addbut/>
            </div>
            
            <Table/>
            

        </div>
    );
};


export default Body;