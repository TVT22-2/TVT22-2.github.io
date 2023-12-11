import React from "react";

const GroupListG = (props) => {
    const groups = props.groups;
    return (
        <div className="group-list">
            <ul>
            {groups.map(group => (
                <li key={group.id}>{group.name}</li>
            ))}
            </ul>
        </div>
    );
}

export default GroupListG;