let handler = async (m, { conn, isOwner, text, isAdmin }) => {
  let who
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn)
      throw false
    }
    who = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    // else who = m.chat
  } else {
    if (!isOwner) {
      global.dfail('owner', m, conn)
      throw false
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  }
  try {
    if (who.endsWith('g.us')) global.db.data.chats[who].isBanned = false
    else global.db.data.users[who].banned = false
    m.reply(`${conn.user.name} aktif dichat ${conn.getName(who) == undefined ? 'ini' : conn.getName(who)}.`)
  } catch (e) {
    throw `nomor tidak ada didatabase!`
  }
}
handler.help = ['unban', 'ongc']
handler.tags = ['owner', 'group']
handler.command = /^unban(chat)|ongc?$/i

module.exports = handler