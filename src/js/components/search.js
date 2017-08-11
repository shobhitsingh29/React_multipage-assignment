import React from "react";

const Search = (props) => {    
    return (
        <div >
        <form>
            <input type="text"  name="focus"  className="search-box"   placeholder="Search" value={props.searchTerm} onChange={props.handlesearchTerm} />
            <button className="close-icon" type="reset"  onClick={props.clearData}/>
            <input type="button" value="search" onClick={props.searchData}/>
        </form>
        </div>

    );
};
export default Search;