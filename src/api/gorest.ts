import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2/posts";

export const getBlog = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.log("Failed to fetch blog posts", error);
  }
};
