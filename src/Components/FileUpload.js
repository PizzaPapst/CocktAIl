function FileUpload({ onUpload }) {
  // Funktion, die aufgerufen wird, wenn eine Datei hochgeladen wird
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onUpload(selectedFile); // Übergibt die Datei an die übergeordnete Komponente
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*"  // Akzeptiert nur Bilder
        onChange={handleFileChange} 
      />
    </div>
  );
}

export default FileUpload;
