function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}  

const downloadFile = async(fileName, fileType, base64) =>{
  const href = `data:${fileType};base64,${base64}`
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export {
  getBase64,
  downloadFile
}