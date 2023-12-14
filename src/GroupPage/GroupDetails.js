import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userID } from "../components/react-signals";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./GroupPage.css"
let requestArray = [];
let newsArray = [];

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
  const [newsLoader, setNews] = useState(false);

  useEffect(() => {
    setCurrentUserID(userID);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const groupDetailsData = await fetchGroupDetails(id);
        setGroupDetails(groupDetailsData);

        NewsSetter();
        const userIDsFromGroup = await fetchUserIDs(id);
        const userIsInGroup = await checkIfUserInGroup(userIDsFromGroup, userID);
        setIsUserInGroup(userIsInGroup);


        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsUserInGroup(false);
        setLoading(false);
      }
    }

    async function fetchGroupDetails(id) {
      try {
        const response = await fetch(`/Groupspage/${id}`);
        const data = await response.json();
        return data[0];
      } catch (error) {
        throw new Error('Failed to fetch group details');
      }
    }

    async function fetchUserIDs(id) {
      try {
        const response = await fetch(`/Groupuser/${id}`);
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
        const groupUsernameData = await fetch(`/GetUsers/${id}`);
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
        const response = await fetch(`/ownerUsername/${id}`);
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

    if(userid === ""){
      alert("You need to be logged in to send a join request");
      return;
    }

    await fetch('/joinRequest', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userid, groupid })
    })
      .then(alert("The request has been sent"))
      .then(navigate("/Groups"))
  }

  async function getRequests() {
    let groupid = id;

    let response = await fetch('/getRequests/' + groupid, {
      headers: { 'Content-type': 'application/json' }
    })
    const data = await response.json();
    requestArray.push(await data.rows);
  }

  async function removeUserFromGroupFrontend(userToRemove) {
    const confirmation = window.confirm(`Are you sure you want to remove ${userToRemove} from the group?`);
    if (confirmation) {
      try {
        const response = await fetch(`/removeUserFromGroup/${userToRemove}/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    }
    try {
      const groupUsernameData = await fetch(`/GetUsers/${id}`);
      const data = await groupUsernameData.json();
      setGroupUsernames(data.filter(username => username !== currentUserID));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function Requestdata() {
    let rows = [];
    for (let i = 0; requestArray[0].length > i; i++) {
      rows.push(
        <div>
          <h1>{requestArray[0][i].username}</h1>
          <div className = "acceptButtonContainer">
          <button className = "acceptButton" onClick={() => requestMenu(requestArray[0][i].id, requestArray[0][i].username)+toggleManageMembersMenu()}>Accept request</button>
          </div>
        </div>
      )
    }
    return rows;
  }

  async function requestMenu(userid, username) {
    const groupid = id;
    const confirmation = window.confirm(`Are you sure you want to accept ${username} to the group?`);

    if (confirmation) {
      const value = true;
      await fetch("/joinRequest", {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userid, groupid, value })
      })
    } else {
      const value = false;
      await fetch("/joinRequest", {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userid, groupid, value })
      })
    }
    try {
      const groupUsernameData = await fetch(`/GetUsers/${id}`);
      const data = await groupUsernameData.json();
      setGroupUsernames(data.filter(username => username !== currentUserID));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const toggleManageMembersMenu = async () => {
    requestArray = [];
    await getRequests();
    setShowManageMembersMenu(!showManageMembersMenu);
  };

  const manageMembersButtonText = showManageMembersMenu ? 'Close' : 'Manage members';

  const isOwner = groupDetails.ownerid === parseInt(userID);

  return (
    <>
      <div className="GroupFlexContainer">
        <div className="GroupDetailsMenu">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="MainContainer">
              {isUserInGroup ? (
                <>
                  <div className="MainContainer2">
                    <div className="DetailElement">
                      <h1>{groupDetails.name}</h1>
                      <h2>Description</h2>
                      <p>{groupDetails.description}</p>
                    </div>
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

                      {isOwner && (
                        <div className = "manageButtonContainer">
                        <button className = "manageMembersButton" onClick={toggleManageMembersMenu}>{manageMembersButtonText}</button>
                        </div>
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
                          {}
                          <Requestdata />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="NewsFeedContainer">
                    <NewsFeed />
                  </div>
                </>
              ) : (
                <>
                  <div className="requestContainer">
                    <h1>{groupDetails.name}</h1>
                    <h4 className="groupDesc">{groupDetails.description}</h4>
                    <p>You are not part of this group</p>
                    <button className="requestButton" onClick={() => requestGroupJoin()}>Request to join</button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
  function NewsFeed() {

    const dateInfo = new Date();
    const initialDetails = {
      title: "",
      posttext: "",
      date: dateInfo.toISOString(),
      group_id: id
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



      if (details.title.trim() === "" || details.posttext.trim() === "") {
        alert("Title and content cannot be empty");
        return;
      }
      await fetch('/post/insertPostGroup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details)

      }).then(() => {
        setDetails(initialDetails);
      })
      setTimeout(() => { NewsSetter() }, 1);
    }
    if (loading) {
      return <></>
    } else {
      return <>
        <div className ="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Post title</h1>
            <input type='title' className="titleInput" name="title" placeholder="Post title" value={details.title} onChange={handleChange} />
            <h1>Post content</h1>
            <textarea name="posttext" className="textInput" rows="10" placeholder="Post text" value={details.posttext} onChange={handleChange} />
            <button type="create">Create post</button>
          </form>
        </div>
        {newsLoader ? <><h className="NewsMainHeader">News and posts</h><NewsContainers /></> : <><h className="NewsMainHeader">News and posts</h><NewsContainers /></>}
      </>
    }
  }
  function NewsContainers() {
    let rows = [];
    newsArray.forEach(element => {
      rows.push(
        <div className="NewsElement">
          <div className="NewsContent">
          {element.link !== "httpsundefined" ? 
            <Link to = {element.link} ><h className="NewsHeader">{element.title}</h></Link>
            : <h className="NewsHeader">{element.title}</h>}
            <p className="NewsDate">{element.date}</p>
            <p className="NewsContent">{element.content}</p>
          </div>
        </div>
      );
    });
    return rows;
  }
  async function NewsSetter() {
    newsArray = [];
    const jsondata = await NewsFetcher();
    for (let i = 0; i < jsondata.length; i++) {
      let temparray = []
      let date = new Date(jsondata[i].date).toLocaleDateString();
      const link = (jsondata[i].posttext.split("https"));
      temparray = {
        title: jsondata[i].title,
        content: link[0],
        link: "https"+link[1],
        date: date
      }
      newsArray.push(temparray);
    }
    setNews(!newsLoader);
  }
  async function NewsFetcher() {
    let fetchresponse = fetch(`/post/groupBydate/${id}`)
      .then(response => fetchresponse = response.json())
    return fetchresponse;
  }
}

export default GroupDetailsMenu;