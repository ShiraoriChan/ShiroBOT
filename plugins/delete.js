let handler = function (m) {
  if (!m.quoted) throw false
  let { chat, fromMe, id, isBaileys } = m.quoted
  if (!fromMe) throw false
  if (/Shiro Broadcast/i.test(m.quoted.text)) throw 'Tidak bisa menghapus pesan broadcast!'
  if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
  this.deleteMessage(chat, {
    fromMe,
    id,
    remoteJid: chat
  })
}
handler.help = ['del', 'delete', 'unsend']
handler.tags = ['info']

handler.command = /^del(ete)|unsend?$/i

module.exports = handler
