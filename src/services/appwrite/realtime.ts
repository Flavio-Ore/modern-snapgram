import { type Models } from 'appwrite'
import { appwriteConfig, client } from './config'

type Filters =
  | 'databases.*.collections.*.documents.*.create'
  | 'databases.*.collections.*.documents.*.update'
  | 'databases.*.collections.*.documents.*.delete'

export function realtimeService ({
  collectionId,
  documentId = '',
  filters = []
}: {
  collectionId: Models.Document['$id']
  documentId?: Models.Document['$id']
  filters: Filters[]
}) {
  const unsubscribe = client.subscribe(
    [
      `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`
    ],
    response => {
      console.log({ realTimeResponse: response })
      if (filters.some(filter => response.events.includes(filter))) {
      }
    }
  )
  return unsubscribe
}
