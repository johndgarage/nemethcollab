import { useEffect, useState } from "react";
import styled from "styled-components";
import HttpWrapper, { FETCH_STATE } from "../helpers/http";
import { LoadingSpinner } from "./Spinner";
import { User } from "./User";

export function UserList() {
  const [fetchState, setFetchState] = useState(FETCH_STATE.IDLE); //idle, loading
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    console.log("Do something on Game mount");

    (async () => {
      try {
        const url = "https://jsonplaceholder.typicode.com/users";

        const httpClient = new HttpWrapper();
        const data = await httpClient.get(url, setFetchState);

        setUsers(data);

        return () => {
          //kill a running fetch if the component unmounts
          httpClient.abort();
        };
      } catch (err) {
        console.log("Error: ", err);
        setFetchState(FETCH_STATE.ERROR);
      }
    })();
  }, []);

  return (
    <Wrapper>
      <h2>List Users</h2>

      {[FETCH_STATE.LOADING, FETCH_STATE.IDLE].includes(fetchState) && (
        <LoadingSpinner />
      )}
      {fetchState === FETCH_STATE.ERROR && <h3>An error happened</h3>}

      {fetchState === FETCH_STATE.SUCCESS && (
        <>
          <NameList>
            <Row key={crypto.randomUUID()}>
              <div>id</div>
              <div>Name</div>
              <div>Email</div>
            </Row>
            {users.map(({ id, name, email }) => (
              <Row key={crypto.randomUUID()}>
                <div>
                  <button onClick={() => setUserId(Number(id))}>{id}</button>
                </div>
                <div>{name}</div>
                <div>{email}</div>
              </Row>
            ))}
          </NameList>
          {!isNaN(userId) && <User userId={userId} />}
        </>
      )}
    </Wrapper>
  );
}

const NameList = styled.ul`
  & > *:first-child {
    border: 1px solid black;
    background-color: black;
    color: white;
  }
  border: 1px solid black;
  margin: 0;
  padding: 0;
`;

const Row = styled.li`
  display: grid;
  grid-template-columns: 60px 1fr 1fr;
  padding: 10px;
  border-top: 1px dotted #ccc;
`;

const Wrapper = styled.div`
  padding: 20px 40px 40px 40px;
`;
