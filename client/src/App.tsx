import React from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import Home from "./components/routes/Home";
import {useDispatch, useSelector} from "react-redux";
import {gql, useMutation, useQuery} from "@apollo/client";
import {UsersDateType} from "./store/usersData/UsersDataReducer";
import {AppState} from "./store/AppState";
import User from "./models/User";
import useRefreshReduxMe, {Me} from "./hooks/useRefreshReduxMe";
import {LogoutMutation} from "./components/auth/Logout";

const GetAllUsers = gql`
    query getAllUsers {
        getAllUsers {
            id
            userName
            email
            status
            createdOn
            lastModifiedOn
        }
    }
`;

function App() {

    const dispatch = useDispatch();

    const user = useSelector((state: AppState) => state.user);
    const {deleteMe} = useRefreshReduxMe();
    const [execLogout] = useMutation(LogoutMutation, {
        refetchQueries: [
            {
                query: Me,
            },
        ],
    });

    const {data: usersDate} = useQuery(GetAllUsers, {
        pollInterval: 1000,
        nextFetchPolicy: "network-only",
        onCompleted: (data) => {
            dispatch({
                type: UsersDateType.USERS_DATE_TYPE,
                payload: usersDate.getAllUsers,
            });
            if (user) {

                const f = data.getAllUsers.filter((u: User) => u.id === user.id)

                if (f[0] == null) {

                    (async () => await execLogout({
                        variables: {
                            email: user?.email,
                        },
                    }))();
                    deleteMe();
                } else if (f[0].status === "block") {
                    deleteMe();
                }

            }

        }

    });

    const renderHome = (props: any) => <Home {...props} />;

    return (
        <Switch>
            <Route exact={true} path="/" render={renderHome}/>
        </Switch>
    );
}

export default App;
