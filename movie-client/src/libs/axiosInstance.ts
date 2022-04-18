import { useEffect, useState } from 'react'

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse	} from 'axios'

const baseURL = 'http://localhost:4000/'

axios.defaults.baseURL = baseURL

const useAxios = (axiosParams: AxiosRequestConfig) => {
	const [response, setResponse] = useState<AxiosResponse>()

	const [error, setError] = useState<AxiosError>()

	const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get")

	
	const fetchData = async (params: AxiosRequestConfig) => {
		console.log(JSON.stringify(params))
			try {
				const result = await axios.request(params)
				console.log(result)
				setResponse(result)
			}

			catch(err) {
				if (axios.isAxiosError(err)) {
					console.log(err)
					setError(err)
				}
			}

			finally{
				setLoading(false)
			}
	}

	useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams);
    }
	},[]);

	return { response, error, loading, fetchData }
}


export default useAxios
