import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

//create axios instance
const api = axios.create({
  baseURL: API_URL,
});

//add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //token invalid or expired, clear it
      localStorage.removeItem('token');
      window.location.href = '/login'; //redirect to login
    }
    return Promise.reject(error);
  }
);

//authentication API calls
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/users', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Get all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Get single post by ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

//Create a new post
export const createPost = async (title, body) => {
  try {
    const response = await api.post('/posts', { title, body });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};


/// Update a post
export const updatePost = async (id, updatedPost) => {
  try {
    console.log("updatePost payload about to send:", updatedPost);

    const response = await api.put(`/posts/${id}`, updatedPost);

    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};



/*
  These functions use the axios instance with interceptors, so authentication tokens will be automatically included in the requests.
*/ 

// Delete a post
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error.response?.data || error.message);
    throw error;
  }
};




