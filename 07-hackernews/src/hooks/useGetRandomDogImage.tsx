import useGetData from './useGetData'
import { DogAPI_RandomImageResponse } from '../types'

const useGetRandomDogImage = () => {
    return useGetData<DogAPI_RandomImageResponse>("https://dog.ceo/api/breeds/image/random")
}

export default useGetRandomDogImage