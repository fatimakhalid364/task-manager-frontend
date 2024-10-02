import { createAsyncThunk } from "@reduxjs/toolkit";
import { decryptSingleValues } from 'src/utils/encryptionUtil';
import { HandleAuthError } from '../../utils/AuthErrorHandler.js';
import { APIS } from "../axiosConfig";


const getAllTasksThunk = createAsyncThunk("getAllTasks", async (params, thunkAPI) => {
    console.log("inside getAllTasks thunk",);
    const { page, limit, search, status, priority } = params
    console.log("params areeeeeeeeeeeeeeeeee......", { page, limit, search, status, priority }  );
    const privateKey = localStorage.getItem("privateKey");

    try {
        const response = await APIS.get(`/task`, {
            params: {
                page, limit, search, status, priority
            },
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is in thunk,====================>", response);
        response.data.data.forEach(task => {
            task.taskTitle = decryptSingleValues(task.taskTitle, privateKey);
            task.taskDescription = decryptSingleValues(task.taskDescription, privateKey);

            if (Array.isArray(task.taskDescription)) {
                task.taskDescription = task.taskDescription.join('');
            }
        });

        console.log("tasks", response)

        return {
            data: response.data.data,
            metaData: response.data.metaData,
        };
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return HandleAuthError(error, thunkAPI);
    }
});
const getPriorityTasksThunk = createAsyncThunk("getPriorityTasks", async (params, thunkAPI) => {
    console.log("inside getAllTasks thunk",);
    const { page, limit, search, priority } = params
    const privateKey = localStorage.getItem("privateKey");

    try {
        const response = await APIS.get(`/task`, {
            params: {
                page, limit, search, priority
            },
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is in thunk,====================>", response);
        response.data.data.forEach(task => {
            task.taskTitle = decryptSingleValues(task.taskTitle, privateKey);
            task.taskDescription = decryptSingleValues(task.taskDescription, privateKey);

            if (Array.isArray(task.taskDescription)) {
                task.taskDescription = task.taskDescription.join('');
            }
        });

        console.log("tasks", response)

        return {
            data: response.data.data,
            metaData: response.data.metaData,
        };
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return HandleAuthError(error, thunkAPI);
    }
});

const deleteTaskThunk = createAsyncThunk("changePinned", async ({ _id, tasksIds }, thunkAPI) => {
    console.log("inside delete tasks thunk");
    const queryString = tasksIds.map(id => `tasksIds=${id}`).join('&');
    try {
        const response = await APIS.delete(`/task/${_id}?${queryString}`, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("response is in thunk,====================>", response);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return HandleAuthError(error, thunkAPI);
    }
});

const fetchCalendarTasksThunk = createAsyncThunk(
    'tasks/fetchTasks',
    async ({ view, startDate, endDate }, thunkAPI) => {
        console.log("inside fetchCalendarTasksThunk", view, startDate, endDate);

        try {
            // Fetch tasks from the API with the view and date as query parameters
            const response = await APIS.get('/task/calendar', {
                params: { view, startDate, endDate },
                headers: {
                    "Content-Type": "application/json",
                    access_token: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            console.log("response is in thunk:", response);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return HandleAuthError(error, thunkAPI);
        }
    }
);

const markTaskStatusThunk = createAsyncThunk(
    'tasks/markTaskStatus',
    async ({ _id, taskStatus }, thunkAPI) => {
        console.log("inside markTaskThunk", _id, taskStatus);

        try {
            const response = await APIS.put(`/task/status/${_id}?status=${taskStatus}`, {}, {
                params: { taskStatus },
                headers: {
                    "Content-Type": "application/json",
                    access_token: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            console.log("response is in thunk:", response);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return HandleAuthError(error, thunkAPI);
        }
    }
);

const fetchPriorityCountsThunk = createAsyncThunk("fetchPriorityCounts", async (thunkAPI) => {
    console.log("inside fetchPriorityCountsThunk",);

    try {
        const response = await APIS.get(`/task/counts`, {
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("fetchPriorityCounts response is in thunk ..........................>", response);

        return {
            data: response.data.data,
        };
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return HandleAuthError(error, thunkAPI);
    }
});

const updateTaskThunk = createAsyncThunk("createTask", async (_id, thunkAPI) => {
    console.log("inside updateTask thunk", body);
    const privateKey = localStorage.getItem("privateKey");

    try {
        const response = await APIS.put(`/task/update`, {
            params: { _id },
            headers: {
                "Content-Type": "application/json",
                access_token: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        response.data.data.taskTitle = decryptSingleValues(response?.data?.data?.taskTitle, privateKey);
        response.data.data.taskDescription = decryptSingleValues(response?.data?.data?.taskDescription, privateKey);

        if (Array.isArray(response.data.data.taskDescription)) {
            response.data.data.taskDescription = response.data.data.taskDescription.join('');
        }

        console.log("response is,", response);

        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return thunkAPI.rejectWithValue({
            statusCode: error.response.status,
            message: error.response.data.error,
        });
    }
});




export { deleteTaskThunk, fetchCalendarTasksThunk,  fetchPriorityCountsThunk, getAllTasksThunk, getPriorityTasksThunk, markTaskStatusThunk, updateTaskThunk };

