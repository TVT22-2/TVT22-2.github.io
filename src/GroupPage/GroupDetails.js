import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userID } from "../components/react-signals";
import { useNavigate } from "react-router-dom";

let requestArray = [];

function GroupDetailsMenu() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUserInGroup, setIsUserInGroup] = useState(undefined);
  const [groupDetails, setGroupDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [groupUsernames, setGroupUsernames] = useState([]);
  const [showManageMembersMenu, setShowManageMembersMenu] = useState(false);
  const [currentUserID, setCurrentUserID] = useState('');
  const [ownerUsername, setOwnerUsername] = useState('');

  useEffect(() => {
    setCurrentUserID(userID);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const groupDetailsData = await fetchGroupDetails(id);
        setGroupDetails(groupDetailsData);


        const userIDsFromGroup = await fetchUserIDs(id);
        const userIsInGroup = await checkIfUserInGroup(userIDsFromGroup, userID);
        setIsUserInGroup(userIsInGroup);

        await getRequests();

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsUserInGroup(false);
        setLoading(false);
      }
    }

    async function fetchGroupDetails(id) {
      try {
        const response = await fetch(`http://localhost:3001/Groupspage/${id}`);
        const data = await response.json();
        return data[0];
      } catch (error) {
        throw new Error('Failed to fetch group details');
      }
    }

    async function fetchUserIDs(id) {
      try {
        const response = await fetch(`http://localhost:3001/Groupuser/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to fetch user IDs from the group');
      }
    }

    async function checkIfUserInGroup(userIDsFromGroup, userID) {
      try {
        const userIDString = String(userID);
        const foundIndex = userIDsFromGroup.findIndex(id => String(id) === userIDString);
        return foundIndex !== -1;
      } catch (error) {
        throw new Error(`Failed to check user in group: ${error.message}`);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchUsernameData() {
      try {
        const groupUsernameData = await fetch(`http://localhost:3001/GetUsers/${id}`);
        const data = await groupUsernameData.json();
        setGroupUsernames(data.filter(username => username !== currentUserID));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUsernameData();
  }, [id, currentUserID]);

  useEffect(() => {
    async function fetchOwnerUsername() {
      try {
        const response = await fetch(`http://localhost:3001/ownerUsername/${id}`);
        const data = await response.json();
        setOwnerUsername(data.ownerUsername);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchOwnerUsername();
  }, [id]);

  async function requestGroupJoin() {
      let userid = userID.value;
      let groupid = id;

      await fetch('http://localhost:3001/joinRequest', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({userid,groupid})
    })
    .then(alert("The request has been sent"))
    .then(navigate("/Groups"))
  }

  async function getRequests() {
    let groupid = id;

    let response = await fetch('http://localhost:3001/getRequests/'+groupid,{
      headers: {'Content-type': 'application/json'}
    })
    const data = await response.json();
    console.log(data);
    requestArray.push(await data.rows);
    console.log(requestArray[0][0]);
  }

  async function removeUserFromGroupFrontend(userToRemove) {
    const confirmation = window.confirm(`Are you sure you want to remove ${userToRemove} from the group?`);
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:3001/removeUserFromGroup/${userToRemove}/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    try {
      const groupUsernameData = await fetch(`http://localhost:3001/GetUsers/${id}`);
      const data = await groupUsernameData.json();
      setGroupUsernames(data.filter(username => username !== currentUserID));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function Requestdata(){
      let rows = [];
      for(let i = 0;requestArray[0].length > i;i++) {
        rows.push(
            <div>
                <h1>{requestArray[0][i].username}</h1>
                <button onClick={() =>requestMenu(requestArray[0][i].id,requestArray[0][i].username)}>Accept request</button>
            </div>
        )
      }
      return rows;
  }

  async function requestMenu(userid,username){
    console.log(userid);
    const groupid = id;
    const confirmation = window.confirm(`Are you sure you want to accept ${username} to the group?`);

    if(confirmation){
      const value = true;
      await fetch("http://localhost:3001/joinRequest",{
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({userid,groupid,value})
      })
    } else{
      const value = false;
      await fetch("http://localhost:3001/joinRequest",{
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({userid,groupid,value})
      })
    }
    try {
      const groupUsernameData = await fetch(`http://localhost:3001/GetUsers/${id}`);
      const data = await groupUsernameData.json();
      setGroupUsernames(data.filter(username => username !== currentUserID));
    } catch (error) {
      console.error('Error:', error);
    }
    getRequests();
    Requestdata();
  }

  const toggleManageMembersMenu = () => {
    setShowManageMembersMenu(!showManageMembersMenu);
  };

  const manageMembersButtonText = showManageMembersMenu ? 'Close' : 'Manage members';

  const isOwner = groupDetails.ownerid === parseInt(userID);

  return (
    <div className="GroupDetailsMenu">
      <h1>Group Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {isUserInGroup ? (
            <div>
              <p>Name: {groupDetails.name}</p>
              <p>Description: {groupDetails.description}</p>
              <p>Owner ID: {groupDetails.ownerid}</p>
              <div className="GroupMembers">
                <h1>Member List</h1>
                {groupUsernames.length > 0 ? (
                  <ul>
                    {groupUsernames.map((username, index) => (
                      <li key={index}>
                        {username === ownerUsername ? `${ownerUsername} (owner)` : username}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No usernames available</p>
                )}
              </div>
              {isOwner && (
                <button onClick={toggleManageMembersMenu}>{manageMembersButtonText}</button>
              )}
              {showManageMembersMenu && (
                <div className="manage-members-menu">
                  <ul>
                    {groupUsernames.map((user, index) => (
                      user !== ownerUsername && (
                        <li key={index}>
                          {user}
                          <button onClick={() => removeUserFromGroupFrontend(user)}>Remove</button>
                        </li>
                      )
                    ))}
                  </ul>
                  <Requestdata/>
                </div>
              )}
            </div>
          ) : (
            <>
            <p>You are not part of this group</p>
            <button onClick = {() => requestGroupJoin()}>Request to join</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GroupDetailsMenu;
