function filterTable() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase()
  const rows = document.querySelectorAll('table tbody tr')

  rows.forEach(row => {
    const provider = row.cells[0].textContent.toLowerCase()
    const providerId = row.cells[1].textContent.toLowerCase()
    const model = row.cells[2].textContent.toLowerCase()
    const modelId = row.cells[3].textContent.toLowerCase()

    if (provider.includes(searchInput) || model.includes(searchInput) || providerId.includes(searchInput) || modelId.includes(searchInput)) {
      row.style.display = ''
    } else {
      row.style.display = 'none'
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('howToUse')
  const openBtn = document.getElementById('btnHowToUse')
  const closeBtn = document.getElementById('btnClose')
  let scrollY

  openBtn.addEventListener('click', () => {
    scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = "-" + scrollY + "px"
    dialog.showModal()
  })

  function closeDialog() {
    dialog.close()
    document.body.style.position = ''
    document.body.style.top = ''
    window.scrollTo(0, scrollY)
  }

  closeBtn.addEventListener('click', closeDialog)
  dialog.addEventListener('cancel', closeDialog)
  dialog.addEventListener('click', e => {
    if (e.target === dialog) closeDialog()
  })
})
