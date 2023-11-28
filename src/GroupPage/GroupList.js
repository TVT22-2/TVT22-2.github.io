const GroupListG = (props) => {
    const groups = props.groups;
    return (
        <div className="group-list">
            {groups.map(group => (
                <li>{group.name}</li>
            ))}
        </div>
    );
}

export default GroupListG;