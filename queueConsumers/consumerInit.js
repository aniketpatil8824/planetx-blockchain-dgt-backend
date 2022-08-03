import config from '../config'
import { consumer } from '../utilities/queueUtils'
import { consumeUpdateDgt } from './dgt'

export const consumerInit = () => {
  consumer(config.QUEUE.LIST.updateDgt, consumeUpdateDgt)
}
