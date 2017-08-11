import React from "react";
import Search from "../components/search";
import ItemsList from "./itemsList";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handlesearchTerm = this.handlesearchTerm.bind(this);
        this.searchData = this.searchData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            searchTerm: "",
            renderedData: []
        };
    }

    handlesearchTerm(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    searchData() {
        if (this.state.searchTerm) {
            window.location.href = "/search/" + this.state.searchTerm;
        } else {
            console.log("search box empty");
        }
    }

    clearData() {
        this.setState({
            searchTerm: ""
        });
    }

    handleSearch(renderedData, url, param) {
        if (url.indexOf(param) > 0) {
            let splitURL = url.split("/");
            let searchString = splitURL[splitURL.length - 1].toUpperCase();
            let searchedObject = [];
            let dataLength = 0;
            let lengthOfItems = renderedData.items.length;

            for (let i = 0; i < lengthOfItems; i++) {
                let description = renderedData.items[i]["description"].toUpperCase();
                let name = renderedData.items[i]["name"].toUpperCase();
                let id = renderedData.items[i]["id"].toUpperCase();
                if (description.indexOf(searchString) >= 0 || name.indexOf(searchString) >= 0 || id.indexOf(searchString) >= 0) {
                    searchedObject.push(renderedData.items[i]);
                }
            }
            this.setState({
                renderedData: searchedObject,
                dataLen: dataLength
            });
        }
        else {
            this.setState({
                renderedData: renderedData.items
            });
        }

    }

    componentDidMount() {
        var main = this;
        fetch("http://localhost:3000/tilesData").then(function (response) {
            return response.json();
        }).then(function (data) {
            var currentURL = window.location.href;
            main.handleSearch(data, currentURL, "search");
        })
            .catch(function (err) {
                console.log("Error Occured:", err);
            });
    }

    render() {
        return (
            <div className="bg-detail">
                <Search searchTerm={this.state.searchTerm} handlesearchTerm={this.handlesearchTerm}
                        searchData={this.searchData} clearData={this.clearData}/>
                {this.state.renderedData.length ?
                    <ItemsList searchTerm={this.state.searchTerm} items={this.state.renderedData}/> :
                    <div className="no-result">No Result Found , Search Again</div>}
            </div>
        );
    }
}
export default Home;