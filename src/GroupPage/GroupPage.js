import React, {useState} from "react";
import "./GroupPage.css"

function GroupMainMenu() {
    return (
        <div className="GroupMainMenu">
            <Groups />
            <CreateGroup />
        </div>
    )
}

function Groups() {
    return (
        <div className="Groups">
            <div className="GroupDropdown">
                <select>
                    <option value="AllGroups">All groups</option>
                    <option value="OwnGroups">Own groups</option>

                </select>
            </div>
                <ul className="GroupList">
                    <li><GroupName /></li>
                    <li><GroupName /></li>
                    <li><GroupName /></li>
                    <li><GroupName /></li>
                    <li><GroupName /></li>
                    <li><GroupName /></li>
                    <li><GroupName /></li>
                    <li><GroupName /></li>
                    <li><GroupName /></li>
                    <li><GroupName /></li>
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
                <GroupInput/>
        </div>
    )
}

function GroupInput() {
    const [details, setDetails] = useState({
        name: "",
        description: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetails((prev) => {
            return {...prev, [name]: value}
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(details);
    }

    return (
        <div className="GroupInput">
            <form onSubmit={handleSubmit}>
                <h3>Group name:</h3> <input type='name' name="name" onChange={handleChange}/>
                <h3>Group description:</h3> <textarea name="description" onChange={handleChange}></textarea>
                <button type="create">Create group</button>
            </form>
        </div>
    )
}

function GroupName() {
    return (
        <div className="GroupName">
            <h2>Group</h2>
        </div>
    );
}

export default GroupMainMenu;