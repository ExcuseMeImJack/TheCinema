import { useSession } from "next-auth/react";

export async function getCurrUser(status: String) {
  if(status === "authenticated"){
    try {
      const res = await fetch('/api/users/getCurrUser');
      if(res.ok) {
        const currUser = await res.json();
        return currUser;
      }
    } catch(error) {
      return({error: `Error Fetching User Data ${error}`});
    }
  } else {
    return({error: 'User is not logged in'})
  }
}

export async function getCurrUserData(status:String, type:String) {
  if(status === "authenticated"){
    try {
      if(type === "friends") {
        const res = await fetch('/api/users/getCurrUserFriends');
        if(res.ok) {
          const currUser = await res.json();
          return currUser;
        }
      } else if(type  === "likes") {
        const res = await fetch('/api/users/getCurrUserLikes');
        if(res.ok) {
          const currUser = await res.json();
          return currUser;
        }
      } else if(type === "lists") {
        const res = await fetch('/api/users/getCurrUserLists');
        if(res.ok) {
          const currUser = await res.json();
          return currUser;
        }
      } else if(type === "reviews") {
        const res = await fetch('/api/users/getCurrUserReviews');
        if(res.ok) {
          const currUser = await res.json();
          return currUser;
        }
      } else if(type === "watchlist") {
        const res = await fetch('/api/users/getCurrUserWatchlist');
        if(res.ok) {
          const currUser = await res.json();
          return currUser;
        }
      }
    } catch(error) {
      return({error: `Error Fetching User Data ${error}`});
    }
  } else {
    return({error: 'User is not logged in'})
  }
}

export async function getUserByUsername(status:String, username:String) {
  if(status === "authenticated"){
    try {
      const res = await fetch('/api/users/getUserByUsername', {
        method: "POST",
        body: JSON.stringify({username})
      });
      if(res.ok) {
        const currUser = await res.json();
        return currUser;
      }
    } catch(error) {
      return({error: `Error Fetching User Data ${error}`});
    }
  } else {
    return({error: 'User is not logged in'})
  }
}
