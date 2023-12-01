import React, { useState, useEffect, } from "react";
import "./GroupPage.css"
import GroupListG from "./GroupList";
import { userID, } from "../components/react-signals"

function GroupMainMenu() {
    return (
        <div className="GroupMainMenu">
            <GroupsL />
            <CreateGroup />
        </div>
    )
}

function GroupsL() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('AllGroups');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:3001/Groups/';
                if (selectedOption === 'OwnGroups') {
                    url = `http://localhost:3001/Groups/${userID}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedOption]);

    return (
        <div className="GroupsL">
            <div className="GroupDropdown">
                <select onChange={handleSelectChange} value={selectedOption}>
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
    const [details, setDetails] = useState({
        name: "",
        description: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/Groups/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(details)
        }).then(() => {
            console.log('new group added');
        })
    }

    return (
        <div className="GroupInput">
            <form onSubmit={handleSubmit}>
                <h3>Group name:</h3> <input type='name' name="name" onChange={handleChange} />
                <h3>Group description:</h3> <textarea name="description" onChange={handleChange}></textarea>
                <button type="create">Create group</button>
            </form>
        </div>
    )
}

export default GroupMainMenu;