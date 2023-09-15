import { query, orderBy } from 'firebase/firestore'
import useStreamCollection from './useStreamCollection'
import { memesCol } from '../services/firebase'
import { Meme } from '../types/Meme.types'

const useMemes = () => {
  return useStreamCollection<Meme>(memesCol, orderBy("created"))
}

export default useMemes