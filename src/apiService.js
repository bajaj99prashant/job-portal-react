const baseUrl = "https://jobs-api.squareboat.info/api/v1";

export const registerApi = (data) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const loginApi = (data) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getResetPasswordToken = (data) => {
  return fetch(`${baseUrl}/auth/resetpassword?email=${data}`);
};

export const changePasswordApi = (data) => {
  return fetch(`${baseUrl}/auth/resetpassword`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const createJobApi = (data, headers) => {
  return fetch(`${baseUrl}/jobs/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
};

export const applyToJobApi = (data, headers) => {
  return fetch(`${baseUrl}/candidates/jobs`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
};

export const getAvailableJobsApi = (headers) => {
  return fetch(`${baseUrl}/candidates/jobs`, { headers: headers });
};

export const alreadyAppliedJobsApi = (headers) => {
  return fetch(`${baseUrl}/candidates/jobs/applied`, { headers: headers });
};

export const getPostedJobsApi = (headers) => {
  return fetch(`${baseUrl}/recruiters/jobs`, { headers: headers });
};

export const getJobCandidatesApi = (id, headers) => {
  return fetch(`${baseUrl}/recruiters/jobs/${id}/candidates`, {
    headers: headers,
  });
};
