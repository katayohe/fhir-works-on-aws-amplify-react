/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { storeAccessTokenState } from "../../common/utils/AccessTokenUtil";
import PageTemplate from "../Template";
import {useEffect} from "react";

const Dashboard: React.FC<{ isLoggedIn: boolean;}> = ({ isLoggedIn }) => {
  useEffect(() => {
    console.log(isLoggedIn)
    if (!isLoggedIn){
      console.log('did not login');
      const {
        REACT_APP_AUTH_URL,
        REACT_APP_CLIENT_ID,
      } = process.env;
      const authUrl = new URL(
        `${REACT_APP_AUTH_URL}/login` || ""
      );
      authUrl.searchParams.append("response_type", "token");
      const stateValue = uuidv4();
      storeAccessTokenState(stateValue);
      authUrl.searchParams.append("state", stateValue);
      authUrl.searchParams.append(
        "client_id",
        REACT_APP_CLIENT_ID || ""
      );
      authUrl.searchParams.append(
        "scope",
        "profile openid"
      );
      authUrl.searchParams.append(
        "redirect_uri",
        encodeURI(`${window.location.href}callback`)
      );
      console.log(authUrl.href)
      window.location.href = authUrl.href;
    }
    
  })

  return (
    <>
      { isLoggedIn ? (
          // "You Are Logged In"
          <PageTemplate title="Dashboard">
            <h2>Example</h2>
          </PageTemplate>
        ) : (
        <div></div>
        )
      }
    </>
  );
};

export default Dashboard;