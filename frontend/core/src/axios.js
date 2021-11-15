import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/';


const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access') ?
			localStorage.getItem('access') :
			null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function  (error) {

		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			console.log(error.response.data.code);
			const refreshToken = localStorage.getItem('refresh');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);

				if (tokenParts.exp > now) {
					return axiosInstance
					.post('/token/refresh/', {
						refresh: refreshToken,
					})
					.then((response) => {
						console.log(response.data);
						localStorage.setItem('access', response.data.access);
						axiosInstance.defaults.headers['Authorization'] =
							'JWT ' + response.data.access;
						originalRequest.headers['Authorization'] =
							'JWT ' + response.data.access;
						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						console.log(err);
					});
				} else {
					localStorage.clear();
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/sing-in/';
				}
			} else {
				localStorage.clear();
				console.log('Refresh token not available.');
				window.location.href = '/sing-in/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;