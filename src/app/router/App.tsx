import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout/layout";
import { routes } from "../../shared/config/routes";
import { NotFoundPage } from "../../pages/notFoundPage/notFoundPage";
import { PersonalDataPage } from "../../pages/personalDataPage/personalDataPage";
import { PlaceOfWorkPage } from "../../pages/placeOfWorkPage/placeOfWorkPage";

function App() {
    return (
        <Routes>
            <Route
                path={routes.loanParameters}
                element={
                    <Layout>
                        <NotFoundPage />
                    </Layout>
                }
            ></Route>
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
                path={routes.result}
                element={
                    <Layout>
                        <NotFoundPage />
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
