export const FETCH_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default class HttpWrapper extends Error {
  constructor(message, resp) {
    super(message);
    this.resp = resp;
    this.controller = new AbortController();
    this.signal = null;
  }

  async get(url, setFetchState) {
    setFetchState(FETCH_STATE.LOADING);

    this.signal = this.controller.signal;
    const resp = await fetch(url, { signal: this.signal });
    const data = await resp.json();

    setTimeout(() => {
      setFetchState(FETCH_STATE.SUCCESS);
    }, 1000);
    return data;
  }

  abort() {
    //aborted the http request
    this.signal.abort();
  }
}
