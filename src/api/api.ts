import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://my-json-server.typicode.com/genekomarov/task-manager_mui',
    headers: {}
})

/**
 *
 * */

export const authAPI = {
    authMe: (email: string) =>
        instance.get<any>(``)
            .then(response => response.data)
}

// export const usersAPI = {
//     getUsers: (currentPage = 1, pageSize = 5) =>
//         instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
//             .then(response => response.data),
//
//     follow: (userId: number) =>
//         instance.post<SimpleResponseType>(`follow/${userId}`)
//             .then(response => response.data),
//
//     unfollow: (userId: number) =>
//         instance.delete<SimpleResponseType>(`follow/${userId}`)
//             .then(response => response.data),
//
//     getUserProfile: (userId: number) => {
//         console.warn('Obsolete method. Please use profileAPI.getProfile');
//         return profileAPI.getProfile(userId);
//     }
// };
