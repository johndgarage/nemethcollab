import { useEffect, useState } from "react";
import styled from "styled-components";
import HttpWrapper, { FETCH_STATE } from "../helpers/http";
import { LoadingSpinner } from "./Spinner";

export function User({ userId }) {
  const [fetchState, setFetchState] = useState();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log("Do something on Table mount");

    (async () => {
      try {
        if (!userId) return;

        const httpClient = new HttpWrapper();
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

        const data = await httpClient.get(url, setFetchState);
        setUserData(data);

        return () => {
          //kill a running fetch if the component unmounts
          httpClient.abort();
        };
      } catch (err) {
        console.log("Error: ", err);
        setFetchState(FETCH_STATE.ERROR);
      }
    })();
  }, [userId]);

  return (
    <div>
      {fetchState === FETCH_STATE.LOADING && <LoadingSpinner />}
      {fetchState === FETCH_STATE.ERROR && <h3>An error happened</h3>}

      {fetchState === FETCH_STATE.SUCCESS && (
        <>
          <h3>User (id: {userId})</h3>
          <UserDataWrapper>
            <UnorderedList key={crypto.randomUUID()}>
              {Object.entries(userData)
                .filter(([field]) => field !== "id")
                .map(([field, value]) => (
                  <ListRow>
                    <div>{field}</div>
                    <div>
                      {typeof value === "string" && value}
                      {typeof value === "object" && (
                        <UnorderedList>
                          {Object.values(value)
                            .filter((item) => typeof item !== "object")
                            .map((item) => (
                              <li key={crypto.randomUUID()}>{item}</li>
                            ))}
                        </UnorderedList>
                      )}
                    </div>
                  </ListRow>
                ))}
            </UnorderedList>
          </UserDataWrapper>
        </>
      )}
    </div>
  );
}

const UserDataWrapper = styled.div`
  --border_color: #333;
  --key_background_color: #ccc;
  --inner_border_color: #999;
  border: 1px solid var(--border_color);
`;

const UnorderedList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListRow = styled.li`
  display: grid;
  grid-template-columns: 100px 1fr;
  border-bottom: 1px solid var(--inner_border_color);
  &:last-child {
    border-bottom: none;
  }
  div {
    padding: 10px 10px;
  }
  div:first-child {
    background-color: var(--key_background_color);
    border-right: 1px solid var(--inner_border_color);
    font-weight: 800;
    text-align: right;
    text-transform: capitalize;
  }
`;
