import { ok } from '@/lib/response'
import { use } from '@/middleware'

const handler = async () => {
  const message = '🔥🔥🔥🔥🔥🔥'

  return ok({ message })
}


exports.handler = use()(handler)
