import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:3000/api/v1",
	headers: { "Content-Type": "application/json" },
});

export const fetchTestResults = async (userId: string) => {
	const response = await API.get("/test/results/" + userId);
	return response.data.data.tests;
};
