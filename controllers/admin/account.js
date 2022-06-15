import User from '../../database/user.js'
import { createWallet } from '../../utilities/walletUtils'
import config from '../../config'

export const createAccount = async (req, res) => {
  try {
    const username = req.body.username
    const newWallet = await createWallet()

    const newUser = new User({
      username,
      role: config.DB_CONSTANTS.USER.ROLE.SUPER_ADMIN,
      status: config.DB_CONSTANTS.USER.STATUS.ACTIVE,
      wallet: {
        address: newWallet.address,
        publicKey: newWallet.publicKey,
        encryptedWalletJson: newWallet.encryptedWalletJson,
        networkType: config.DB_CONSTANTS.NETWORK_TYPES.EDGE
      }
    })

    await newUser.save()
  } catch (err) {

  }
}
