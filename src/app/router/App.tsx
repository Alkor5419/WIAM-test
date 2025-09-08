import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout/layout";
import { routes } from "../../shared/config/routes";
import { NotFoundPage } from "../../pages/notFoundPage/notFoundPage";
import { PersonalDataPage } from "../../pages/personalDataPage/personalDataPage";
import { PlaceOfWorkPage } from "../../pages/placeOfWorkPage/placeOfWorkPage";
import { LoanParametersPage } from "../../pages/loanParametersPage/loanParametersPage";

function App() {
    return (
        <Routes>
            <Route
                path={routes.personalData}
                element={
                    <Layout>
                        <PersonalDataPage />
                    </Layout>
                }
            ></Route>
            <Route
                path={routes.placeOfWork}
                element={
                    <Layout>
                        <PlaceOfWorkPage />
                    </Layout>
                }
            ></Route>
            <Route
                path={routes.loanParameters}
                element={
                    <Layout>
                        <LoanParametersPage />
                    </Layout>
                }
            ></Route>
            <Route
                path={routes.notFound}
                element={
                    <Layout>
                        <NotFoundPage />
                    </Layout>
                }
            ></Route>
        </Routes>
    );
}

export default App;
