import { useCallback, useEffect, useState } from "react"
import { DogAPI_RandomImageResponse } from '../types'
import axios from 'axios'

const useGetData = (initialUrl: string | null = null) => {
    const [data, setData] = useState<DogAPI_RandomImageResponse | null>(null)
    const [url, setUrl] = useState<string | null>(initialUrl)

    const changeUrl = (_url: string) => {
        // validate url
        try {
            const url = new URL(_url)
            setUrl(url.toString())

        } catch (err: any) {
            console.log("that's not a valid url")
        }

    }

    const execute = () => {
        if (!url) {
            return
        }
        getData(url)
    }

    const getData = async (resourceUrl: string) => {
        const res = await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
        // await new Promise(r => setTimeout(r, 3000))
        setData(res.data)
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
        execute,
    }
}

export default useGetData
