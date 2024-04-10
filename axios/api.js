import { axiosAuthInstance, axiosNoAuthInstance } from "./axios";

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axiosNoAuthInstance.post("/register/", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to log in a user
export const loginUser = async (loginData) => {
  try {
    const response = await axiosNoAuthInstance.post("/login/", loginData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    const response = await axiosAuthInstance.post("/logout/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get the current question
// export const getCurrentQuestion = async () => {
//   try {
//     const response = await axiosAuthInstance.get("/current_question/");
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };


export const getCurrentQuestion = () => {
    return axiosAuthInstance.get("/current_question/")
      .then(response => response.data)
      .catch(error => {
        throw error.response.data;
      });
  };

// Function to submit data
export const submitData = async (data) => {
  try {
    const response = await axiosAuthInstance.post("/submit/", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get the result page
export const getResultPage = async () => {
  try {
    const response = await axiosAuthInstance.get("/result_page/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get the leaderboard
export const getLeaderboard = async () => {
  try {
    const response = await axiosAuthInstance.get("/leaderboard/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to use the streak lifeline
export const useStreakLifeline = async () => {
  try {
    const response = await axiosAuthInstance.get("/streak_lifeline/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to skip a question
export const skipQuestion = async () => {
  try {
    const response = await axiosAuthInstance.get("/skip_question/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to request the audience poll lifeline
export const requestAudiencePollLifeline = async () => {
  try {
    const response = await axiosAuthInstance.get("/audiance_poll/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to use the GPT lifeline
export const useGptLifeline = async () => {
  try {
    const response = await axiosAuthInstance.get("/gpt/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get all lifelines
export const getAllLifelines = async () => {
  try {
    const response = await axiosAuthInstance.get("/all_lifelines/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
