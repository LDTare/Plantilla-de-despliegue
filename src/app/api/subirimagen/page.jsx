function handleUpload(){
    if (!file){
      setMsg("imagen no seleccionada");
      return;
    }
    const fd = new FormData();
    fd.append("file",file);
  
    setMsg("Subiendo");
    setProgress(prevState => {
      return{...prevState,started: true}
    })
  
    axios.post("http://httpbin.org/post",fd,{
      onUploadProgress: (ProgressEvent) => {setProgress(prevState =>{
        return{...prevState,pc: ProgressEvent.progress*100}
      })},
      headers: {
        "Custom-Header": "value",
      }
    })
    .then(res => {
      setMsg("Imagen cargada exitosamente");
      console.log(res.data)
    })
    .catch(err => {
      setMsg("Error cargar imagen");
      console.error(err)
    });
}   