const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "";

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies or list of companies based on search. */

  static async getCompanies(searchTerm) {
    if (!searchTerm) {
      const emptyTermRes = await this.request(`companies/`);
      return emptyTermRes.companies;
    }
    const res = await this.request(`companies/`, { nameLike: searchTerm });
    return res.companies;
  }

  /** Get all jobs or list of jobs based on search. */

  static async getJobs(searchTerm) {
    if (!searchTerm) {
      const emptyTermRes = await this.request(`jobs/`);
      return emptyTermRes.jobs;
    }
    const res = await this.request(`jobs/`, { title: searchTerm });
    return res.jobs;
  }

  /** Send POST request with user login information, returns token */

  static async login(username, password) {
    const res = await this.request(`auth/token`, { username, password }, 'POST');
    return res.token;
  }

  /** Sends POST request with new user information, returns token */

  static async register(username, password, firstName, lastName, email) {
    const res = await this.request(`auth/register`, {
      username, password,
      firstName, lastName,
      email
    }, 'POST');
    return res.token;
  }

  static async patch(username, firstName, lastName, email) {
    const res = await this.request(`users/${username}`,
      {
        firstName,
        lastName,
        email
      }, `PATCH`);

      return res.user
  }

  /** Gets complete user information based on username in route */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }


}

export default JoblyApi;
