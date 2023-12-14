import React, { useState, useEffect, } from "react";
import "./GroupPage.css"
import GroupListG from "./GroupList";
import { userID } from "../components/react-signals"

const userId = userID.value;

console.log(userID);

function GroupMainMenu() {
    return (
        <div className="GroupMainMenu">
            <GroupsL />
            <CreateGroup />
        </div>
    )
}

let selectedOption = 'AllGroups';

function GroupsL() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         selectedOption = 'AllGroups';
        getGroups();
    }, []);

    async function getGroups() {

        const fetchData = async () => {
            setLoading(true);
            console.log('set loading true' + selectedOption);
            let data = "";
            let url = 'http://localhost:3001/Groups/';
            if (selectedOption === 'OwnGroups') {
                url = `http://localhost:3001/Groups/${userID.value}`;
            }

            data = await fetch(url)
                .then(
                    response => data = response.json()
                )
                .catch(err => console.error(err));
            setGroups(data);
            console.log(data);

        };
        await fetchData();
        setLoading(false);
    }

    function buttonHandler(event) {
        selectedOption = event.target.value;
        getGroups();
    }

    return (
        <div className="GroupsL">
            <div className="GroupDropdown">
                <select className="DropdownButton" onChange={buttonHandler}>
                    <option value="AllGroups">All groups</option>
                    <option value="OwnGroups">Own groups</option>
                </select>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <GroupListG groups={groups} />
                )}
            </div>
        </div>
    );
};

function CreateGroup() {
    return (
        <div className="CreateGroup">
            <div className="CreateGroupHeader">
                <h1>Create group</h1>
            </div>
            <GroupInput />
        </div>
    )
}

function GroupInput() {
    const initialDetails = {
        name: "",
        description: "",
        ownerid: userID
    };
    
    const [details, setDetails] = useState(initialDetails);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (details.name.trim() === "" || details.description.trim() === "") {
            alert("Name and description cannot be empty");
            return;
        }

        if (userID.value === "") {
            alert("Please log in to create a group");
            return;
        }
        fetch('http://localhost:3001/Groups/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details)
            
        }).then(() => {
            console.log('new group added');
            setDetails(initialDetails);
            window.location.reload();
        })
    }

    return (
        <div className="GroupInput">
            <form onSubmit={handleSubmit}>
                <h3>Group name:</h3> <input type='name' name="name" value = {details.name} onChange={handleChange} />
                <h3>Group description:</h3> <textarea name="description" rows = "20" value = {details.description} onChange={handleChange} />
                <button type="create">Create group</button>
            </form>
        </div>
    )
}

export default GroupMainMenu;