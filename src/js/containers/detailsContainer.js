import React from "react";
import Detail from "../components/details";
import EditDetail from "../components/editDetail";

class DetailsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: {},
            edit: false,
            tempData: {}
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.closeButton = this.closeButton.bind(this);
        this.clearData = this.clearData.bind(this);
        this.postData = this.postData.bind(this);
    }

    handleEdit() {
        this.setState({
            edit: true
        });

    }

    handleDataChange(args, event) {
        let value = event.target.value;
        let name = args[0]["name"];
        let newObj = {};
        newObj[name] = value;
        let newItemData = Object.assign({}, this.state.tempData, newObj);
        this.setState({
            tempData: newItemData
        });
    }

    clearData() {
        this.setState({
            tempData: this.state.itemData
        });
    }

    closeButton() {
        this.setState({
            edit: false
        });
    }

    postData() {
        let payload = Object.assign({}, this.state.tempData);
        let id = this.state.tempData.id;
        fetch(`http://localhost:3000/tilesData/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        });

    }

    saveData() {
        this.setState({
            itemData: this.state.tempData
        });
        this.postData();
    }

    componentDidMount() {
        var self = this;
        fetch("http://localhost:3000/tilesData").then(function (response) {
            return response.json();
        }).then(function (data) {
            var currentURL = window.location.href;
            let splitURL = currentURL.split("/");
            let searchString = splitURL[splitURL.length - 1];
            let lengthOfItems = data.items.length;
            for (let i = 0; i < lengthOfItems; i++) {
                let id = data.items[i]["id"];
                if (searchString === id) {
                    self.setState({
                        itemData: data.items[i],
                        tempData: data.items[i]
                    });
                    break;
                }
            }
        });
    }

    render() {
        return (
            <div >
                <Detail handleEdit={this.handleEdit} itemData={this.state.itemData}/>
                {this.state.edit &&
                <EditDetail itemData={this.state.tempData} closeButton={this.closeButton}
                            handleDataChange={this.handleDataChange}
                            saveData={this.saveData}/>
                }

            </div>
        );
    }
}

export default DetailsContainer;