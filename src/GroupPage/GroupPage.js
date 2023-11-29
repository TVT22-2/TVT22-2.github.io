import React, { useState, useEffect } from "react";
import "./GroupPage.css"
import GroupListG from "./GroupList";
import { userID } from "../components/react-signals" 

function GroupMainMenu() {
    return (
        <div className="GroupMainMenu">
            <GroupsL userID={userID}/>
            <CreateGroup />
        </div>
    )
}

function GroupsL() {
    const [groups, setGroups] = useState(null);
    console.log('userid:'+userID);

    useEffect(() => {
        fetch('http://localhost:3001/Groups/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setGroups(data);
            });
    }, []);

    return (
        <div className="GroupsL">
            <div className="GroupDropdown">
                <select>
                    <option value="AllGroups">All groups</option>
                    <option value="OwnGroups">Own groups</option>

                </select>
            </div>
            <ul className="GroupList">
                {groups && <GroupListG groups={groups}></GroupListG>}
            </ul>



        </div>
    )
}

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

        fetch('http://localhost:3001/Groups/'+userID, {
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

function GroupNameG() {
    return (
        <div className="GroupNameG">
            <h2>Group</h2>
        </div>
    );
}

export default GroupMainMenu;