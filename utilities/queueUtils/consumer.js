import amqp from 'amqplib'
import config from '../../config'
import logger from '../logger.js'

export default async function consumeQueue (QUEUE_NAME, method) {
  const conn = await amqp.connect(config.QUEUE.CONNECTION_URL)
  const channel = await conn.createChannel()
  await channel.assertQueue(QUEUE_NAME)
  channel.prefetch(1)
  const msg = await channel.consume(QUEUE_NAME, { noAck: false })
  let out = msg.content.toString()
  out = JSON.parse(out)
  try {
    await method(out) // todo ack(msg)& reject(msg) based on response
    channel.ack(msg)
  } catch (err) {
    channel.ack(msg)
    logger.error('Error while consuming from queue: ', err)
  }
}
