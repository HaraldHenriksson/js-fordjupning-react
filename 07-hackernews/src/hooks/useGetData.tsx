import { useEffect, useState } from "react"
import { DogAPI_RandomImageResponse } from '../types'
import axios from 'axios'

const useGetData = (initialUrl: string | null = null) => {
    const [data, setData] = useState<DogAPI_RandomImageResponse | null>(null)
    const [url, setUrl] = useState<string | null>(initialUrl)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const changeUrl = (_url: string) => {
        // validate url
        try {
            const url = new URL(_url)
            setUrl(url.toString())

        } catch (err: any) {
            setError('Thats not a valid URL!')
        }

    }

    const execute = () => {
        if (!url) {
            return
        }
        getData(url)
    }

    const getData = async (resourceUrl: string) => {
        // reset state
        setData(null)
        setError(null)
        setIsLoading(true)

        try {
            const res = await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
            // await new Promise(r => setTimeout(r, 3000))
            setData(res.data)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        if (!url) {
            return
        }

        getData(url)
    }, [url])

    return {
        changeUrl,
        data,
        error,
        isLoading,
        execute,
    }
}

export default useGetData
