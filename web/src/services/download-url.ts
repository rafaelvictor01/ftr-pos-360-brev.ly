export const downloadUrl = (url: string): void => {
  const link = document.createElement("a")

  const urlObj = new URL(url)
  const filename = urlObj.pathname.split("/").pop()

  link.href = url
  link.download = filename ?? "download.csv"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
