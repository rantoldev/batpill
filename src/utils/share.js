// Utility to generate a social image (1200x630) and attempt to share it.
export async function generateShareImage({ username = 'Player', score = 0, medals = 0 } = {}) {
  const width = 1200
  const height = 630
  const canvas = Object.assign(document.createElement('canvas'), { width, height })
  const ctx = canvas.getContext('2d')

  // background
  ctx.fillStyle = '#050505'
  ctx.fillRect(0, 0, width, height)

  // subtle star background using small dots
  ctx.fillStyle = 'rgba(255,255,255,0.03)'
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const r = Math.random() * 1.8
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  }

  // draw pillfly gif/logo (first frame). Use local asset via new URL
  try {
    const img = new Image()
    img.src = new URL('../gif/pillfly.gif', import.meta.url).href
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej })
    const logoSize = Math.min(220, Math.floor(width * 0.18))
    ctx.drawImage(img, width - logoSize - 48, 48, logoSize, logoSize)
  } catch (e) {
    // ignore if logo load fails
  }

  // Title
  ctx.fillStyle = '#fff'
  ctx.font = '700 44px "Segoe UI", Roboto, Arial'
  ctx.textAlign = 'left'
  ctx.fillText(`I'm ${username}`, 64, 140)

  // Score
  ctx.fillStyle = '#fff'
  ctx.font = '900 72px "Segoe UI", Roboto, Arial'
  ctx.fillText(`${score} scores`, 64, 240)

  // Hashtag line
  ctx.font = '700 36px "Segoe UI", Roboto, Arial'
  ctx.fillStyle = '#bfe8a6'
  ctx.fillText('#PillFly', 64, 300)

  // Medals
  ctx.fillStyle = '#ffd54f'
  ctx.font = '700 40px "Segoe UI", Roboto, Arial'
  ctx.fillText(`Medals: ${medals}`, 64, 380)

  // small footer
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.font = '400 20px "Segoe UI", Roboto, Arial'
  ctx.fillText('Play now — pillfly.pump.fun', 64, height - 48)

  return await new Promise((res) => canvas.toBlob(res, 'image/png'))
}

export async function shareImageAndText({ text = '', blob = null } = {}) {
  // Always open X intent with the text and open generated image in a new tab.
  // This avoids triggering the OS-level share dialog on desktops.
  const intentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`
  window.open(intentUrl, '_blank')
  if (blob) {
    const url = URL.createObjectURL(blob)
    // open image in new tab so user can save/drag it to the tweet composer
    window.open(url, '_blank')
  }
  return { shared: false }
}
