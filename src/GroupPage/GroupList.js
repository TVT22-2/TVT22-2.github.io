import React, { useState } from "react";
import { Link } from "react-router-dom";

const GroupListG = (props) => {
  const groups = props.groups;
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const handleMouseEnter = (group) => {
    setHoveredGroup(group);
  };

  const handleMouseLeave = () => {
    setHoveredGroup(null);
  };

  return (
    <div className="group-list">
      <ul>
        {groups.map((group) => (
          <li
            key={group.id}
            onMouseEnter={() => handleMouseEnter(group)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`http://localhost:3000/Groupspage/${group.id}`}>
              {group.name}
            </Link>
            {hoveredGroup && hoveredGroup.id === group.id && (
              <p className="group-description">{group.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupListG;
