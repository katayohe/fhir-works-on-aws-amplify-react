/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from "react";
import { Landing } from "./components/landing/Landing";
import FhirBackend from "./common/backend/FhirBackend";
import { Callback } from "./components/callback/Callback";
import { MetadataContext } from "./stores/MetadataContext";
import axios from "axios";
import ResourceMetadata from "./stores/ResourceMetadata";
import FWoABackend from "./common/backend/FWoABackend";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from './components/pages/Dashboard';
import Patient from './components/pages/Patient';
import Lab from './components/pages/Lab';
// import { Create } from "./components/create/Create";
// import { Delete } from "./components/delete/Delete";
// import { Update } from "./components/update/Update";
// import { Read } from "./components/read/Read";
// import { Search } from "./components/search/Search";

export interface ContentProps {
  fhirBackend: FhirBackend
  accessToken: string
  setAccessToken: Function
}

const Content: React.FC<ContentProps> = ({
  fhirBackend,
  accessToken,
  setAccessToken
}) => {
  return (
    <Routes>
      <Route path="/lab" element={<Lab />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/callback" element={<Callback setAccessToken={setAccessToken} />} />
      <Route path="/" element={<Dashboard isLoggedIn={accessToken !== ""} />} />
    </Routes>
        
    // <Switch>
    //   <Route
    //     path="/create"
    //     render={() => <Create fhirBackend={fhirBackend} />}
    //   />
    //   <Route
    //     path="/read"
    //     render={(props) => <Read fhirBackend={fhirBackend} />}
    //   />
    //   <Route
    //     path="/search"
    //     render={(props) => <Search fhirBackend={fhirBackend} />}
    //   />
    //   <Route
    //     path="/update"
    //     render={(props) => (
    //       <Update fhirBackend={fhirBackend} routeComponentProps={props} />
    //     )}
    //   />
    //   <Route
    //     path="/delete"
    //     render={(props) => <Delete fhirBackend={fhirBackend} />}
    //   />
    //   <Route
    //     path="/callback"
    //     render={() => <Callback setAccessToken={setAccessToken} />}
    //   />
    //   <Route
    //     path="/"
    //     render={() => <Landing isLoggedIn={accessToken !== ""} />}
    //   />
    // </Switch>
  );
};

const ChildApp: React.FC = () => {
  const [navigationOpen, setNavigationOpen] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState("");
  const fhirBackend = new FWoABackend(accessToken);
  const [metadata, setMetadata] = React.useState<ResourceMetadata[]>([]);
  const fhirServerUrl = process.env.REACT_APP_FHIR_SERVER_URL;

  const mapCapstatementToResources = (
    capStatement: any
  ): ResourceMetadata[] => {
    return capStatement.rest[0].resource.map((resource: any) => {
      return {
        type: resource.type,
        interaction: resource.interaction.map(
          (interaction: { code: string }) => {
            return interaction.code;
          }
        ),
        searchParam: resource.searchParam,
        searchInclude: resource.searchInclude,
        searchRevInclude: resource.searchRevInclude,
      };
    });
  };

  useEffect(
    () => {
      const fetchCapStatement = async () => {
        const result = await axios.get(`${fhirServerUrl}/metadata`);
        setMetadata(mapCapstatementToResources(result.data));
      };

      fetchCapStatement();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if ( accessToken === "" && !["/", "/callback"].includes(location.pathname)) {
      navigate("/");
    }
  }, [location, accessToken]);

  
  return (
    <MetadataContext.Provider value={{ metadata }}>
      <Content fhirBackend={fhirBackend} accessToken={accessToken} setAccessToken={setAccessToken} />
    </MetadataContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/*  useHistory can only be used inside of Router, which is why we're creating ChildApp*/}
      <ChildApp />
    </BrowserRouter>
  );
};

export default App;
