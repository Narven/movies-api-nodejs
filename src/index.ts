import 'reflect-metadata'
import config from 'config'
import { Container } from 'inversify'
import { appDebug } from './constant'
import { bindings } from './inversify.config'
import createServer from './server'

(async () => {
  const container = new Container()
  await container.loadAsync(bindings)

  const server = createServer(container, '/api/v1')
  const serverInstance = server.build()

  const port = config.get('app.port') || 3000

  serverInstance.listen(port, () => {
    appDebug(`Listening on port ${port}`)
  })

})()
