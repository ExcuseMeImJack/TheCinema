import { useSession } from "next-auth/react";

export default async function getCurrUser(status: String) {

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
