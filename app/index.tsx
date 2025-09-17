import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { useProfile } from "@/api/profile/Profile";
import { CustomActivityIndicator1 } from "@/components/CustomActivityIndicator";

const index = () => {
  const {session, loading} = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(session?.user.id);
  
  if (loading || profileLoading ) {
    console.log(loading + " " + profileLoading);
    return <CustomActivityIndicator1 />;
  }
  
  if (!session){
    return <Redirect href={"/(auth)"}/>
  }

  if (profile?.group == "ADMIN"){
    return <Redirect href={"/(admin)"}/>
  }
  else if (profile?.group == "EXPERT"){
    return <Redirect href={"/(expert)"}/>
  }
  else if (profile?.group == "STUDENT" || "PEER"){
    return <Redirect href={"/(student)"}/>
  }

};

export default index;