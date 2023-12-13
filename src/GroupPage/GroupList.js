import React from "react";
import { Link } from "react-router-dom";

const GroupListG = (props) => {
    const groups = props.groups;
    console.log(props.groups);
    return (
        <div className="group-list">
            <ul>
            {groups.map(group => (
                <Link to = {`http://localhost:3000/Groupspage/${group.id}`}><li key={group.id}>{group.name}</li></Link>
            ))}
            </ul>
        </div>
    );
}

export default GroupListG;